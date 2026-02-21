"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Download, X, Smartphone, ArrowUp } from 'lucide-react';

interface NameItem {
  name: string;
  pinyin: string;
  meaning: string;
  source: string;
  style: '诗经' | '楚辞' | '唐诗' | '宋词' | '现代' | '自然';
  tone: number[];
}

export default function Home() {
  const [names, setNames] = useState<NameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStyle, setActiveStyle] = useState('全部');
  const [surname, setSurname] = useState('');
  const [selectedName, setSelectedName] = useState<NameItem | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [nameLength, setNameLength] = useState<'全部' | '单字' | '双字'>('全部');
  const [displayCount, setDisplayCount] = useState(50);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const styles = ['全部', '诗经', '楚辞', '唐诗', '宋词', '现代', '自然'];
  const lengthOptions = ['全部', '单字', '双字'];

  // 监听滚动显示/隐藏回到顶部按钮
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 加载名字数据
  useEffect(() => {
    fetch('/chinese-naming-app/names.json')
      .then(res => res.json())
      .then(data => {
        setNames(data);
        setLoading(false);
        console.log(`✅ 加载了 ${data.length} 个名字`);
      })
      .catch(err => {
        console.error('加载名字失败:', err);
        setLoading(false);
      });
  }, []);

  // 简转繁函数
  const toTraditional = (s: string): string => {
    const map: Record<string, string> = {
      '张': '張', '刘': '劉', '陈': '陳', '杨': '楊',
      '黄': '黃', '赵': '趙', '吴': '吳', '孙': '孫',
      '马': '馬', '罗': '羅', '梁': '梁', '宋': '宋',
      '郑': '鄭', '谢': '謝', '韩': '韓', '唐': '唐',
      '冯': '馮', '董': '董', '萧': '蕭', '程': '程',
      '曹': '曹', '袁': '袁', '邓': '鄧', '许': '許',
      '傅': '傅', '沈': '沈', '曾': '曾', '彭': '彭',
      '吕': '吕', '苏': '蘇', '卢': '盧', '蒋': '蔣',
      '蔡': '蔡', '贾': '賈', '丁': '丁', '魏': '魏',
      '薛': '薛', '叶': '葉', '阎': '閻', '余': '餘',
      '潘': '潘', '杜': '杜', '戴': '戴', '夏': '夏',
      '钟': '鐘', '汪': '汪', '田': '田', '任': '任',
      '姜': '姜', '范': '范', '方': '方', '石': '石',
      '姚': '姚', '谭': '譚', '廖': '廖', '邹': '鄒',
      '熊': '熊', '金': '金', '陆': '陸', '郝': '郝',
      '孔': '孔', '白': '白', '崔': '崔', '康': '康',
      '毛': '毛', '邱': '邱', '秦': '秦', '江': '江',
      '史': '史', '顾': '顧', '侯': '侯', '邵': '邵',
      '孟': '孟', '龙': '龍', '万': '萬', '段': '段',
      '雷': '雷', '钱': '錢', '汤': '湯', '尹': '尹',
      '易': '易', '黎': '黎', '向': '向', '乔': '喬'
    };
    return map[s] || s;
  };

  const getSurnameTone = (s: string): number => {
    if (!s) return 1;
    const lastChar = s[s.length - 1];
    const pingToneChars = ['张', '王', '周', '林', '高', '陈', '李', '刘', '孙'];
    return pingToneChars.includes(lastChar) ? 1 : 2;
  };

  const calculateHarmony = (surnameTone: number, nameTone1: number, nameTone2: number): number => {
    if (!surname) return 0;
    let score = 60;
    if (surnameTone !== nameTone1) score += 25;
    if (nameTone1 !== nameTone2) score += 35;
    return Math.min(100, score);
  };

  // 筛选和排序名字
  const filteredNames = React.useMemo(() => {
    if (names.length === 0) return [];
    
    const currentSurnameTone = getSurnameTone(surname);
    
    const processed = names.map(item => {
      const tone1 = item.tone?.[0] || 1;
      const tone2 = item.tone?.[1] || 2;
      return {
        ...item,
        harmonyScore: calculateHarmony(currentSurnameTone, tone1, tone2)
      };
    });
    
    processed.sort((a, b) => b.harmonyScore - a.harmonyScore);
    
    let result = processed;
    
    // 风格筛选
    if (activeStyle !== '全部') {
      result = result.filter(n => n.style === activeStyle);
    }
    
    // 名字长度筛选
    if (nameLength === '单字') {
      result = result.filter(n => n.name.length === 1);
    } else if (nameLength === '双字') {
      result = result.filter(n => n.name.length === 2);
    }
    
    return result;
  }, [names, activeStyle, surname, nameLength]);

  // 使用 filteredNames 直接显示

  // 无限滚动
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setDisplayCount(prev => Math.min(prev + 30, filteredNames.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredNames.length]);

  // 筛选条件改变时重置显示数量
  useEffect(() => {
    setDisplayCount(50);
  }, [activeStyle, nameLength, surname]);

  const handleNameClick = (name: NameItem) => {
    setSelectedName(name);
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
    setTimeout(() => setSelectedName(null), 300);
  };

  const handleDownload = async () => {
    if (!posterRef.current || !selectedName) return;
    
    setIsGenerating(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(posterRef.current, { quality: 0.95 });
      
      const link = document.createElement('a');
      link.download = `墨香取名-${selectedName.name}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('生成失败:', err);
      alert('生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F9F4E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', color: '#C5A367', marginBottom: '10px' }}>墨香取名</div>
          <div style={{ fontSize: '14px', color: '#666' }}>正在加载名字数据...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9F4E8', position: 'relative' }}>
      {/* 背景纹理 */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/p6.png)',
        opacity: 0.5,
        pointerEvents: 'none'
      }} />
      
      <header style={{ textAlign: 'center', padding: '40px 20px 30px' }}>
        <div style={{ width: '60px', height: '2px', backgroundColor: '#C5A367', margin: '0 auto 25px', opacity: 0.6 }} />
        <div style={{ fontSize: '10px', color: '#999', letterSpacing: '3px', marginBottom: '15px', textTransform: 'uppercase' }}>Chinese Naming</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', marginBottom: '12px' }}>
          <span style={{ fontSize: '42px', fontWeight: 'bold', color: '#2C2C2C', letterSpacing: 0, fontFamily: '"Noto Serif SC", serif' }}>墨</span>
          <span style={{ fontSize: '38px', fontWeight: '500', color: '#B22222', letterSpacing: 0, marginTop: '2px', fontFamily: '"Noto Serif SC", serif' }}>香</span>
          <span style={{ fontSize: '28px', color: '#C5A367', margin: '0 8px' }}>·</span>
          <span style={{ fontSize: '42px', fontWeight: 'bold', color: '#2C2C2C', letterSpacing: 0, fontFamily: '"Noto Serif SC", serif' }}>取</span>
          <span style={{ fontSize: '38px', fontWeight: '500', color: '#B22222', letterSpacing: 0, marginTop: '2px', fontFamily: '"Noto Serif SC", serif' }}>名</span>
        </div>
        <p style={{ fontSize: '14px', color: '#666', letterSpacing: '2px', marginTop: '10px' }}>文墨传家，雅名共赏</p>
      </header>

      {/* 姓氏输入 */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="输入您的姓氏"
          maxLength={2}
          style={{
            padding: '12px 20px',
            fontSize: '18px',
            border: '2px solid #C5A367',
            borderRadius: '25px',
            width: '200px',
            textAlign: 'center',
            backgroundColor: 'white',
            outline: 'none',
            fontFamily: '"Noto Serif SC", serif'
          }}
        />
      </div>

      {/* 风格筛选 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {styles.map(s => (
          <button 
            key={s}
            onClick={() => setActiveStyle(s)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeStyle === s ? '#B22222' : 'transparent',
              color: activeStyle === s ? 'white' : '#666'
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 字数筛选 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {lengthOptions.map(l => (
          <button 
            key={l}
            onClick={() => setNameLength(l as '全部' | '单字' | '双字')}
            style={{
              padding: '6px 14px',
              borderRadius: '15px',
              border: '1px solid #C5A367',
              cursor: 'pointer',
              backgroundColor: nameLength === l ? '#C5A367' : 'transparent',
              color: nameLength === l ? 'white' : '#C5A367',
              fontSize: '13px'
            }}
          >
            {l}名
          </button>
        ))}
      </div>

      {/* 名字网格 */}
      <div ref={gridRef} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '15px',
        padding: '0 20px 100px'
      }}>
        {filteredNames.slice(0, displayCount).map((item) => (
          <button
            key={item.name + item.pinyin}
            onClick={() => handleNameClick(item)}
            style={{
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#2C2C2C' }}>
              {item.name}
            </div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
              {item.pinyin}
            </div>
            <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.4, height: '30px', overflow: 'hidden' }}>
              {item.meaning.slice(0, 30)}...
            </div>
          </button>
        ))}
      </div>

      {/* 加载更多提示 */}
      {filteredNames.length > displayCount && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontSize: '14px' }}>
          已显示 {displayCount} 个名字，共 {filteredNames.length} 个<br />
          <span style={{ fontSize: '12px' }}>继续滚动加载更多...</span>
        </div>
      )}
      {filteredNames.length <= displayCount && filteredNames.length > 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontSize: '14px' }}>
          已显示全部 {filteredNames.length} 个名字
        </div>
      )}

      {/* 抽屉 */}
      {showDrawer && selectedName && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 100
            }}
            onClick={closeDrawer}
          />
          <div 
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#F9F4E8',
              padding: '30px 20px',
              borderRadius: '20px 20px 0 0',
              zIndex: 101,
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <button
              onClick={closeDrawer}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ 
                fontSize: '48px', 
                fontWeight: 'bold', 
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px'
              }}>
                {surname && (
                  <span style={{ border: '2px solid #B22222', padding: '10px 15px', borderRadius: '4px', color: '#B22222' }}>
                    {surname}
                  </span>
                )}
                {selectedName.name.split('').map((char, i) => (
                  <span key={i} style={{ border: '2px solid #C5A367', padding: '10px 15px', borderRadius: '4px' }}>
                    {char}
                  </span>
                ))}
              </div>
              
              <p style={{ color: '#B22222', fontSize: '16px', marginBottom: '20px' }}>
                {selectedName.pinyin}
              </p>
              
              <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '10px' }}>
                {selectedName.meaning}
              </p>
              
              <p style={{ fontSize: '12px', color: '#999' }}>
                出自 {selectedName.source}
              </p>

              <button
                onClick={() => setShowPreview(true)}
                style={{
                  marginTop: '25px',
                  padding: '12px 32px',
                  backgroundColor: '#B22222',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '25px auto 0'
                }}
              >
                <Smartphone size={20} />
                预览名片
              </button>
            </div>
          </div>
        </>
      )}

      {/* 预览模态框 */}
      {showPreview && selectedName && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <button
            onClick={() => setShowPreview(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            <X size={32} />
          </button>

          <div style={{ color: 'white', fontSize: '18px', marginBottom: '20px' }}>名片预览</div>

          {/* 预览名片 */}
          <div ref={posterRef} style={{
            width: '300px',
            height: '533px',
            backgroundColor: '#F9F4E8',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '"Noto Serif SC", serif'
          }}>
            {/* 顶部装饰线 */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(197,163,103,0.4), transparent)'
            }} />

            {/* 左上角标题 */}
            <div style={{
              position: 'absolute',
              top: '25px',
              left: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}>
              <span style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: '10px',
                color: '#B22222',
                fontWeight: 'bold',
                letterSpacing: '0.3em'
              }}>墨香</span>
              <span style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: '9px',
                color: '#2C2C2C',
                letterSpacing: '0.2em'
              }}>取名</span>
            </div>

            {/* 顶部标题 */}
            <div style={{
              position: 'absolute',
              top: '25px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '8px',
              color: '#C5A367',
              letterSpacing: '0.3em'
            }}>为子寻雅名</div>

            {/* 左侧竖排 */}
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '70px',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: '8px',
              color: 'rgba(197,163,103,0.6)',
              letterSpacing: '0.5em'
            }}>
              雅名共赏 · 文墨传家
            </div>

            {/* 名字区域 - 上半部分居中 */}
            <div style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              width: '100%'
            }}>
              {/* 姓氏+名字 */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}>
                {surname && (
                  <div style={{
                    fontSize: '42px',
                    color: '#B22222',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 3px rgba(178,34,34,0.2)'
                  }}>
                    {surname}
                  </div>
                )}
                <div style={{
                  fontSize: '42px',
                  color: '#2C2C2C',
                  letterSpacing: '0.2em',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.08)'
                }}>
                  {selectedName.name}
                </div>
              </div>

              {/* 拼音 */}
              <div style={{
                fontSize: '12px',
                color: 'rgba(197,163,103,0.7)',
                letterSpacing: '0.5em',
                fontStyle: 'italic'
              }}>
                {selectedName.pinyin}
              </div>
            </div>

            {/* 寓意区域 - 下半部分 */}
            <div style={{
              position: 'absolute',
              top: '72%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              width: '100%',
              padding: '0 25px'
            }}>
              {/* 分隔线 */}
              <div style={{
                width: '40px',
                height: '1px',
                backgroundColor: 'rgba(197,163,103,0.4)',
                margin: '0 auto 15px'
              }} />

              {/* 寓意 */}
              <div style={{
                fontSize: '11px',
                color: 'rgba(44,44,44,0.8)',
                lineHeight: 1.6,
                marginBottom: '10px'
              }}>
                {selectedName.meaning}
              </div>

              {/* 出处 */}
              <div style={{
                fontSize: '10px',
                color: 'rgba(197,163,103,0.6)'
              }}>
                —— {selectedName.source}
              </div>
            </div>

            {/* 底部 */}
            <div style={{
              position: 'absolute',
              bottom: '25px',
              left: 0,
              right: 0,
              textAlign: 'center'
            }}>
              <div style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(197,163,103,0.4), transparent)',
                margin: '0 auto 8px'
              }} />
              <div style={{
                fontSize: '8px',
                color: 'rgba(197,163,103,0.5)',
                letterSpacing: '0.3em'
              }}>墨香取名 · 为子寻雅名</div>
            </div>

            {/* 姓氏印章 */}
            {surname && (
              <div style={{
                position: 'absolute',
                bottom: '25px',
                right: '25px',
                width: '35px',
                height: '35px',
                border: '2px solid #B22222',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-3deg)',
                backgroundColor: 'rgba(178,34,34,0.05)'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#B22222',
                  fontWeight: 'bold'
                }}>{toTraditional(surname)}</span>
              </div>
            )}

            {/* 底部装饰线 */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(197,163,103,0.4), transparent)'
            }} />
          </div>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            style={{
              marginTop: '30px',
              padding: '14px 48px',
              backgroundColor: '#C5A367',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '18px',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              opacity: isGenerating ? 0.7 : 1
            }}
          >
            {isGenerating ? '生成中...' : '下载名片'}
          </button>
        </div>
      )}

      {/* 回到顶部按钮 */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#C5A367',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 99,
            transition: 'opacity 0.3s'
          }}
          title="回到顶部"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
