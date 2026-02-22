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
  harmonyScore?: number;
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
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [adCountdown, setAdCountdown] = useState(0);
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

  const calculateHarmony = (s: string, nameItem: NameItem): number => {
    if (!s) return 0;
    
    const surnameTone = getSurnameTone(s);
    const nameTone1 = nameItem.tone?.[0] || 1;
    const nameTone2 = nameItem.tone?.[1] || 2;
    
    // 1. 声调平仄基础分 (30分)
    let toneScore = 15;
    if (surnameTone !== nameTone1) toneScore += 8;
    if (nameTone1 !== nameTone2 && nameItem.name.length > 1) toneScore += 7;
    
    // 2. 姓名哈希权重 (确保同一个名字分值固定，模拟"生辰八字/五行")
    // 使用简单的字符编码累加作为哈希
    const combined = s + nameItem.name;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = ((hash << 5) - hash) + combined.charCodeAt(i);
      hash |= 0; 
    }
    const destinyFactor = Math.abs(hash % 40); // 0-39分
    
    // 3. 字形结构平衡 (模拟笔画数平衡，20分)
    // 奇偶哈希模拟
    const visualBalance = Math.abs((combined.charCodeAt(0) + combined.charCodeAt(combined.length-1)) % 21); // 0-20分
    
    // 4. 基础起步分 (确保大部分名字在80分以上)
    const baseScore = 10;
    
    const totalScore = baseScore + toneScore + destinyFactor + visualBalance;
    
    // 限制最高99分，只有极少数特定组合能到100分
    if (totalScore >= 100) {
      return (hash % 100 === 7) ? 100 : 99;
    }
    
    return Math.max(60, totalScore);
  };

  // 筛选和排序名字
  const filteredNames = React.useMemo(() => {
    if (names.length === 0) return [];
    
    const processed = names.map(item => {
      return {
        ...item,
        harmonyScore: calculateHarmony(surname, item)
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
      link.download = `${isPremiumUnlocked ? '至尊' : '普通'}名片-${selectedName.name}.png`;
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
      {/* 全局动画样式 */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
        .gold-card-shimmer {
          background: linear-gradient(
            to right, 
            transparent 0%, 
            rgba(255, 255, 255, 0) 30%,
            rgba(197, 163, 103, 0.4) 50%, 
            rgba(255, 255, 255, 0) 70%,
            transparent 100%
          );
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          animation: shimmer 3s infinite ease-in-out;
          pointer-events: none;
        }
        .gold-name-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .gold-name-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 30px rgba(197,163,103,0.4) !important;
        }
      `}</style>

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
        {filteredNames.slice(0, displayCount).map((item, index) => {
          const isGold = (item.harmonyScore || 0) >= 95;
          const showAd = index > 0 && index % 12 === 0;
          
          return (
            <React.Fragment key={item.name + item.pinyin + index}>
              {showAd && (
                <div style={{
                  gridColumn: 'span 2',
                  backgroundColor: '#2C2C2C',
                  borderRadius: '12px',
                  padding: '20px',
                  margin: '10px 0',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundImage: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ zIndex: 1 }}>
                    <div style={{ fontSize: '10px', color: '#C5A367', letterSpacing: '2px', marginBottom: '5px' }}>PREMIUM SERVICE</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
                      {index % 24 === 0 ? '大师人工深度起名' : '至尊名片 · 限量解锁'}
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>
                      {index % 24 === 0 ? '结合生辰八字，由起名大师亲自操刀' : '黑金质感，传承文墨雅韵之美'}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (index % 24 === 0) {
                        alert('人工起名咨询请关注公众号/添加微信');
                      } else {
                        alert('请点击名字卡片并选择[至尊名片解锁]');
                      }
                    }}
                    style={{
                      backgroundColor: '#C5A367',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      zIndex: 1,
                      whiteSpace: 'nowrap',
                      marginLeft: '10px'
                    }}>
                    立即咨询
                  </button>
                  {/* 装饰水印 */}
                  <div style={{
                    position: 'absolute',
                    right: '-20px',
                    bottom: '-20px',
                    fontSize: '80px',
                    opacity: 0.1,
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    transform: 'rotate(-15deg)'
                  }}>
                    {index % 24 === 0 ? '名' : '雅'}
                  </div>
                </div>
              )}
              <button
                onClick={() => handleNameClick(item)}
                className={isGold ? 'gold-name-card' : ''}
                style={{
                  backgroundColor: isGold ? '#FFFDF5' : 'white',
                  border: isGold ? '2px solid #C5A367' : '1px solid #ddd',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: isGold 
                    ? '0 6px 16px rgba(197,163,103,0.25), inset 0 0 10px rgba(255,255,255,0.5)' 
                    : '0 2px 4px rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
              {isGold && (
                <>
                  <div className="gold-card-shimmer" />
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '12px',
                    backgroundColor: '#B22222',
                    color: 'white',
                    fontSize: '11px',
                    padding: '6px 3px',
                    writingMode: 'vertical-rl',
                    borderRadius: '0 0 4px 4px',
                    letterSpacing: '1px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 1
                  }}>
                    金榜
                  </div>
                </>
              )}
              <div style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                marginBottom: '10px', 
                color: isGold ? '#B22222' : '#2C2C2C',
                textShadow: isGold ? '1px 1px 2px rgba(197,163,103,0.3)' : 'none',
                position: 'relative'
              }}>
                {item.name}
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: isGold ? '#C5A367' : '#999', 
                marginBottom: '10px',
                letterSpacing: '1px' 
              }}>
                {item.pinyin}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#666', 
                lineHeight: 1.5, 
                height: '36px', 
                overflow: 'hidden',
                opacity: 0.8 
              }}>
                {item.meaning.slice(0, 32)}...
              </div>
            </button>
            </React.Fragment>
          );
        })}
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
              
              <p style={{ color: '#B22222', fontSize: '16px', marginBottom: '10px' }}>
                {selectedName.pinyin}
              </p>
              
              {surname && selectedName.harmonyScore !== undefined && (
                <div style={{ 
                  marginBottom: '15px',
                  padding: '8px 16px',
                  backgroundColor: selectedName.harmonyScore >= 85 ? '#e8f5e9' : 
                                  selectedName.harmonyScore >= 70 ? '#fff3e0' : '#ffebee',
                  borderRadius: '20px',
                  display: 'inline-block'
                }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>契合度: </span>
                  <span style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold',
                    color: selectedName.harmonyScore >= 85 ? '#2e7d32' : 
                           selectedName.harmonyScore >= 70 ? '#f57c00' : '#c62828'
                  }}>
                    {selectedName.harmonyScore}%
                  </span>
                </div>
              )}
              
              <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '10px', marginTop: '10px' }}>
                {selectedName.meaning}
              </p>
              
              <p style={{ fontSize: '12px', color: '#999' }}>
                出自 {selectedName.source}
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '25px' }}>
                <button
                  onClick={() => {
                    setIsPremiumUnlocked(false);
                    setShowPreview(true);
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    color: '#666',
                    border: '1px solid #ddd',
                    borderRadius: '25px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  普通预览
                </button>
                
                <button
                  onClick={() => {
                    if (adCountdown > 0) return;
                    setAdCountdown(5); // 模拟5秒广告，实际可设为30
                    const timer = setInterval(() => {
                      setAdCountdown(prev => {
                        if (prev <= 1) {
                          clearInterval(timer);
                          setIsPremiumUnlocked(true);
                          setShowPreview(true);
                          return 0;
                        }
                        return prev - 1;
                      });
                    }, 1000);
                  }}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#B22222',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: adCountdown > 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 10px rgba(178,34,34,0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Smartphone size={18} />
                  {adCountdown > 0 ? `解锁中 (${adCountdown}s)` : '至尊名片解锁'}
                  {adCountdown === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      backgroundColor: '#FFD700',
                      color: '#B22222',
                      fontSize: '9px',
                      padding: '2px 8px',
                      transform: 'rotate(15deg)',
                      fontWeight: 'bold'
                    }}>PRO</div>
                  )}
                </button>
              </div>
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
            backgroundColor: isPremiumUnlocked ? '#1A1A1A' : '#F9F4E8',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '"Noto Serif SC", serif',
            border: isPremiumUnlocked ? '8px solid #C5A367' : 'none',
            boxSizing: 'border-box'
          }}>
            {/* 至尊版背景纹理 */}
            {isPremiumUnlocked && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(https://www.transparenttextures.com/patterns/black-linen.png)',
                opacity: 0.4,
                pointerEvents: 'none'
              }} />
            )}

            {/* 顶部装饰线 */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              height: '1px',
              background: isPremiumUnlocked 
                ? 'linear-gradient(to right, transparent, rgba(197,163,103,0.8), transparent)'
                : 'linear-gradient(to right, transparent, rgba(197,163,103,0.4), transparent)'
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
                color: isPremiumUnlocked ? '#C5A367' : '#B22222',
                fontWeight: 'bold',
                letterSpacing: '0.3em'
              }}>墨香</span>
              <span style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: '9px',
                color: isPremiumUnlocked ? '#EEE' : '#2C2C2C',
                letterSpacing: '0.2em'
              }}>{isPremiumUnlocked ? '馆藏' : '取名'}</span>
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
            }}>{isPremiumUnlocked ? '—— 传世雅名 · 至尊鉴赏 ——' : '为子寻雅名'}</div>

            {/* 名字区域 - 上半部分居中 */}
            <div style={{
              position: 'absolute',
              top: '42%',
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
                gap: '12px',
                marginBottom: '15px'
              }}>
                {surname && (
                  <div style={{
                    fontSize: '48px',
                    color: isPremiumUnlocked ? '#C5A367' : '#B22222',
                    fontWeight: 'bold',
                    textShadow: isPremiumUnlocked ? '0 2px 10px rgba(197,163,103,0.4)' : '1px 1px 3px rgba(178,34,34,0.2)'
                  }}>
                    {surname}
                  </div>
                )}
                <div style={{
                  fontSize: '48px',
                  color: isPremiumUnlocked ? '#FFF' : '#2C2C2C',
                  letterSpacing: '0.1em',
                  fontWeight: 'bold',
                  textShadow: isPremiumUnlocked ? '0 2px 15px rgba(255,255,255,0.3)' : '1px 1px 3px rgba(0,0,0,0.08)'
                }}>
                  {selectedName.name}
                </div>
              </div>

              {/* 拼音 */}
              <div style={{
                fontSize: '13px',
                color: '#C5A367',
                letterSpacing: '0.6em',
                fontStyle: 'italic',
                opacity: 0.9
              }}>
                {selectedName.pinyin.toUpperCase()}
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
              padding: '0 30px'
            }}>
              {/* 分隔线 */}
              <div style={{
                width: '60px',
                height: '1px',
                backgroundColor: 'rgba(197,163,103,0.5)',
                margin: '0 auto 20px'
              }} />

              {/* 寓意 */}
              <div style={{
                fontSize: '12px',
                color: isPremiumUnlocked ? 'rgba(255,255,255,0.85)' : 'rgba(44,44,44,0.8)',
                lineHeight: 1.8,
                marginBottom: '12px',
                letterSpacing: '1px'
              }}>
                {selectedName.meaning}
              </div>

              {/* 出处 */}
              <div style={{
                fontSize: '11px',
                color: '#C5A367',
                fontWeight: '500'
              }}>
                —— {selectedName.source} ——
              </div>
            </div>

            {/* 至尊版专属印章 */}
            {isPremiumUnlocked && (
              <div style={{
                position: 'absolute',
                top: '55px',
                right: '25px',
                width: '40px',
                height: '40px',
                border: '2px solid rgba(197,163,103,0.6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C5A367',
                fontSize: '9px',
                fontWeight: 'bold',
                writingMode: 'vertical-rl',
                transform: 'rotate(15deg)',
                backgroundColor: 'rgba(197,163,103,0.05)'
              }}>
                名家亲笔
              </div>
            )}

            {/* 底部 */}
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: 0,
              right: 0,
              textAlign: 'center'
            }}>
              <div style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(197,163,103,0.5), transparent)',
                margin: '0 auto 10px'
              }} />
              <div style={{
                fontSize: '9px',
                color: '#C5A367',
                letterSpacing: '0.4em',
                opacity: 0.8
              }}>墨香起名 · 馆藏至尊系列</div>
            </div>

            {/* 姓氏印章 */}
            {surname && (
              <div style={{
                position: 'absolute',
                bottom: '35px',
                right: '45px',
                width: '40px',
                height: '40px',
                border: isPremiumUnlocked ? '2px solid rgba(197,163,103,0.6)' : '2px solid rgba(178,34,34,0.6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-8deg)',
                backgroundColor: isPremiumUnlocked ? 'rgba(197,163,103,0.05)' : 'rgba(178,34,34,0.03)'
              }}>
                <span style={{
                  fontSize: '18px',
                  color: isPremiumUnlocked ? '#C5A367' : '#B22222',
                  fontFamily: '"KaiTi", "楷体", "STKaiti", serif',
                  fontWeight: 'normal'
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

      {/* 模拟广告加载层 */}
      {adCountdown > 0 && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '3px solid rgba(197,163,103,0.3)',
            borderTop: '3px solid #C5A367',
            borderRadius: '50%',
            animation: 'shimmer 2s infinite linear',
            marginBottom: '30px'
          }} />
          <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#C5A367' }}>正在解锁至尊名片</h2>
          <p style={{ opacity: 0.7, marginBottom: '20px' }}>正在为您生成名家亲笔至尊馆藏版...</p>
          <div style={{ 
            fontSize: '48px', 
            fontWeight: 'bold',
            fontFamily: 'serif' 
          }}>{adCountdown}</div>
        </div>
      )}
    </div>
  );
}
