"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { names } from '@/data/names';
import { Download, X, Smartphone } from 'lucide-react';

export default function Home() {
  const [activeStyle, setActiveStyle] = useState('全部');
  const [surname, setSurname] = useState('');
  const [selectedName, setSelectedName] = useState<any>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);
  const styles = ['全部', '诗经', '楚辞', '唐诗', '宋词', '现代', '自然'];

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

  const filteredNames = useMemo(() => {
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
    
    if (activeStyle === '全部') return processed;
    return processed.filter(n => n.style === activeStyle);
  }, [activeStyle, surname]);

  // 简化的点击处理
  const handleNameClick = (name: any) => {
    console.log('点击了名字:', name.name);
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

  // 调试日志
  useEffect(() => {
    console.log('Component mounted, filteredNames:', filteredNames.length);
  }, []);

  // 使用原生事件监听器确保在静态导出后点击仍然有效
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // 延迟绑定以确保 DOM 完全准备好
    const timer = setTimeout(() => {
      console.log('Binding click events...');
      
      // 为名字卡片添加点击事件
      const nameCards = document.querySelectorAll('[data-name-card]');
      console.log('Found name cards:', nameCards.length);
      
      const handleCardClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        const target = e.currentTarget as HTMLElement;
        const nameData = target.getAttribute('data-name');
        console.log('Card clicked, nameData:', nameData);
        if (nameData) {
          try {
            const nameObj = JSON.parse(decodeURIComponent(nameData));
            console.log('Opening drawer for:', nameObj.name);
            setSelectedName(nameObj);
            setShowDrawer(true);
          } catch (err) {
            console.error('Failed to parse name data:', err);
          }
        }
      };
      
      nameCards.forEach((card, index) => {
        console.log(`Binding events to card ${index}`);
        card.addEventListener('click', handleCardClick);
      });
    }, 100);
    
    // 摇一摇功能
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastUpdate = 0;
    
    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;
      
      const now = Date.now();
      if (now - lastUpdate < 200) return;
      
      const { x, y, z } = acc;
      const delta = Math.abs(x! - lastX) + Math.abs(y! - lastY) + Math.abs(z! - lastZ);
      
      if (delta > 15) {
        const randomName = names[Math.floor(Math.random() * names.length)];
        setSelectedName(randomName);
        setShowDrawer(true);
      }
      
      lastX = x!; lastY = y!; lastZ = z!;
      lastUpdate = now;
    };

    const setupMotion = async () => {
      if ('DeviceMotionEvent' in window) {
        const DeviceMotionEventAny = DeviceMotionEvent as any;
        if (typeof DeviceMotionEventAny.requestPermission === 'function') {
          try {
            const permission = await DeviceMotionEventAny.requestPermission();
            if (permission === 'granted') {
              window.addEventListener('devicemotion', handleMotion);
            }
          } catch (e) {}
        } else {
          window.addEventListener('devicemotion', handleMotion);
        }
      }
    };
    
    setupMotion();
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [filteredNames]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9F4E8', position: 'relative' }}>
      {/* 背景纹理 */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'url(https://www.transparenttextures.com/patterns/p6.png)', opacity: 0.5, pointerEvents: 'none' }} />

      {/* 头部 */}
      <header style={{ textAlign: 'center', padding: '40px 20px 30px' }}>
        {/* 顶部装饰线 */}
        <div style={{ 
          width: '60px', 
          height: '2px', 
          backgroundColor: '#C5A367', 
          margin: '0 auto 25px',
          opacity: 0.6 
        }} />
        
        {/* 英文小字 */}
        <div style={{ 
          fontSize: '10px', 
          color: '#999', 
          letterSpacing: '3px',
          marginBottom: '15px',
          textTransform: 'uppercase'
        }}>
          Chinese Naming
        </div>
        
        {/* 主标题 - 精致排版 */}
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center',
          gap: '3px',
          marginBottom: '12px'
        }}>
          {/* 墨 */}
          <span style={{
            fontSize: '42px',
            fontWeight: 'bold',
            color: '#2C2C2C',
            letterSpacing: '0',
            fontFamily: '"Noto Serif SC", serif'
          }}>墨</span>
          
          {/* 香 - 朱砂色，稍小 */}
          <span style={{
            fontSize: '38px',
            fontWeight: '500',
            color: '#B22222',
            letterSpacing: '0',
            marginTop: '-5px',
            fontFamily: '"Noto Serif SC", serif'
          }}>香</span>
          
          {/* 装饰点 */}
          <span style={{
            width: '4px',
            height: '4px',
            backgroundColor: '#C5A367',
            borderRadius: '50%',
            margin: '0 8px'
          }} />
          
          {/* 取 - 稍小 */}
          <span style={{
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#2C2C2C',
            letterSpacing: '0',
            fontFamily: '"Noto Serif SC", serif'
          }}>取</span>
          
          {/* 名 - 朱砂色 */}
          <span style={{
            fontSize: '42px',
            fontWeight: 'bold',
            color: '#B22222',
            letterSpacing: '0',
            marginTop: '3px',
            fontFamily: '"Noto Serif SC", serif'
          }}>名</span>
        </div>
        
        {/* 分隔装饰 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '15px'
        }}>
          <div style={{ width: '30px', height: '1px', backgroundColor: '#C5A367', opacity: 0.4 }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#C5A367', opacity: 0.6 }} />
          <div style={{ width: '30px', height: '1px', backgroundColor: '#C5A367', opacity: 0.4 }} />
        </div>
        
        {/* 副标题 */}
        <p style={{ 
          color: '#888', 
          fontSize: '13px',
          letterSpacing: '2px'
        }}>雅名共赏 · 文墨传家</p>
      </header>

      {/* 姓氏输入 */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="输入您的姓氏"
          value={surname}
          onChange={(e) => setSurname(e.target.value.slice(0, 2))}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            border: 'none',
            borderBottom: '2px solid #C5A367',
            background: 'transparent',
            textAlign: 'center',
            outline: 'none'
          }}
        />
        {surname && (
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            分析「{surname}」姓的音律契合度
          </p>
        )}
      </div>

      {/* 风格筛选 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px', 
        marginBottom: '30px',
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

      {/* 名字网格 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '15px',
        padding: '0 20px 100px'
      }}>
        {filteredNames.map((item) => (
          <button
            key={item.name}
            data-name-card
            data-name={encodeURIComponent(JSON.stringify(item))}
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
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>
              {item.name}
            </div>
            <div style={{ fontSize: '11px', color: '#999', marginBottom: '5px' }}>
              {item.pinyin}
            </div>
            {surname && item.harmonyScore > 0 && (
              <div style={{
                fontSize: '11px',
                color: item.harmonyScore >= 80 ? '#B22222' : '#666'
              }}>
                契合度 {item.harmonyScore}%
              </div>
            )}
            <div style={{ fontSize: '10px', color: '#999', marginTop: '5px' }}>
              {item.meaning.slice(0, 20)}...
            </div>
          </button>
        ))}
      </div>

      {/* 底部提示 */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '12px',
        color: '#999',
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: '8px 16px',
        borderRadius: '20px'
      }}>
        <Smartphone size={14} />
        <span>手机摇一摇，随机推荐雅名</span>
      </div>

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
                {selectedName.name.split('').map((char: string, i: number) => (
                  <span 
                    key={i}
                    style={{
                      border: '2px solid #C5A367',
                      padding: '10px 15px',
                      borderRadius: '4px'
                    }}
                  >
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

              {surname && selectedName.harmonyScore > 0 && (
                <p style={{
                  marginTop: '15px',
                  padding: '8px 16px',
                  backgroundColor: selectedName.harmonyScore >= 80 ? '#B22222' : '#f0f0f0',
                  color: selectedName.harmonyScore >= 80 ? 'white' : '#666',
                  borderRadius: '20px',
                  display: 'inline-block'
                }}>
                  与「{surname}」姓契合度：{selectedName.harmonyScore}%
                </p>
              )}

              {/* 生成名片按钮 */}
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                style={{
                  marginTop: '25px',
                  padding: '12px 32px',
                  backgroundColor: '#B22222',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '16px',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  opacity: isGenerating ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '25px auto 0'
                }}
              >
                <Download size={20} />
                {isGenerating ? '生成中...' : '生成名片'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* 隐藏的海报模板 - 使用内联样式确保兼容性 */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <div 
          ref={posterRef}
          style={{
            width: '1080px',
            height: '1920px',
            backgroundColor: '#F9F4E8',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '"Noto Serif SC", serif'
          }}
        >
          {/* 背景纹理 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
            opacity: 0.5
          }} />
          
          {/* 顶部线 */}
          <div style={{
            position: 'absolute',
            top: '64px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(197,163,103,0.4), transparent)'
          }} />
          
          {/* 左上角标题 */}
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: '28px',
              color: '#B22222',
              fontWeight: 'bold',
              letterSpacing: '0.3em'
            }}>墨香</span>
            <span style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: '24px',
              color: '#2C2C2C',
              letterSpacing: '0.2em'
            }}>取名</span>
          </div>
          
          {/* 顶部标题 */}
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '20px',
            color: '#C5A367',
            letterSpacing: '0.3em'
          }}>为子寻雅名</div>
          
          {/* 左侧竖排 */}
          <div style={{
            position: 'absolute',
            left: '60px',
            top: '200px',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontSize: '24px',
            color: 'rgba(197,163,103,0.6)',
            letterSpacing: '0.5em'
          }}>
            雅名共赏 · 文墨传家
          </div>
          
          {/* 主内容区域 */}
          <div style={{
            position: 'absolute',
            top: '50%',
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
              gap: '20px',
              marginBottom: '40px'
            }}>
              {/* 姓氏 */}
              {surname && (
                <div style={{
                  width: '140px',
                  height: '140px',
                  border: '4px solid #B22222',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(-5deg)',
                  backgroundColor: 'rgba(178,34,34,0.08)',
                  boxShadow: '3px 3px 10px rgba(0,0,0,0.1)'
                }}>
                  <span style={{
                    fontSize: '80px',
                    color: '#B22222',
                    fontWeight: 'bold'
                  }}>{surname}</span>
                </div>
              )}
              
              {/* 名字 */}
              <div style={{
                fontSize: '180px',
                color: '#2C2C2C',
                letterSpacing: '0.3em',
                fontWeight: 'bold',
                textShadow: '2px 2px 8px rgba(0,0,0,0.08)'
              }}>
                {selectedName?.name}
              </div>
            </div>
            
            {/* 拼音 */}
            <div style={{
              fontSize: '32px',
              color: 'rgba(197,163,103,0.7)',
              letterSpacing: '0.5em',
              fontStyle: 'italic',
              marginBottom: '48px'
            }}>
              {selectedName?.pinyin}
            </div>
            
            {/* 分隔线 */}
            <div style={{
              width: '112px',
              height: '1px',
              backgroundColor: 'rgba(197,163,103,0.4)',
              margin: '48px auto'
            }} />
            
            {/* 寓意 */}
            <div style={{
              fontSize: '28px',
              color: 'rgba(44,44,44,0.8)',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 40px',
              marginBottom: '32px'
            }}>
              {selectedName?.meaning}
            </div>
            
            {/* 出处 */}
            <div style={{
              fontSize: '24px',
              color: 'rgba(197,163,103,0.6)'
            }}>
              —— {selectedName?.source}
            </div>
          </div>
          
          {/* 底部 */}
          <div style={{
            position: 'absolute',
            bottom: '80px',
            left: 0,
            right: 0,
            textAlign: 'center'
          }}>
            <div style={{
              width: '160px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(197,163,103,0.4), transparent)',
              margin: '0 auto 24px'
            }} />
            <div style={{
              fontSize: '18px',
              color: 'rgba(197,163,103,0.5)',
              letterSpacing: '0.3em'
            }}>墨香取名 · 为子寻雅名</div>
          </div>
          
          {/* 姓氏印章 */}
          {surname && (
            <div style={{
              position: 'absolute',
              bottom: '80px',
              right: '80px',
              width: '96px',
              height: '96px',
              border: '3px solid #B22222',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-3deg)',
              backgroundColor: 'rgba(178,34,34,0.05)'
            }}>
              <span style={{
                fontSize: '36px',
                color: '#B22222',
                fontWeight: 'bold'
              }}>{surname}</span>
            </div>
          )}
          
          {/* 底部线 */}
          <div style={{
            position: 'absolute',
            bottom: '64px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(197,163,103,0.4), transparent)'
          }} />
        </div>
      </div>
    </div>
  );
}
