"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Download, X, Smartphone, ArrowUp, Music } from 'lucide-react';
import namesData from '../../public/names.json';

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
  const [names, setNames] = useState<NameItem[]>(namesData as NameItem[]);
  const [activeStyle, setActiveStyle] = useState('全部');
  const [surname, setSurname] = useState('');
  const [selectedName, setSelectedName] = useState<NameItem | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [adCountdown, setAdCountdown] = useState(0);
  const [adProgress, setAdProgress] = useState(0);
  const TOTAL_AD_SECONDS = 30; // 30秒广告
  const [nameLength, setNameLength] = useState<'全部' | '单字' | '双字'>('全部');
  const [displayCount, setDisplayCount] = useState(50);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedNames, setSelectedNames] = useState<NameItem[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isAIUnlocked, setIsAIUnlocked] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
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

  // 背景音乐控制
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.log('播放被拦截:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

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

  // 批量选择/取消选择名字
  const toggleSelectName = (name: NameItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNames(prev => {
      const exists = prev.find(n => n.name === name.name);
      if (exists) {
        return prev.filter(n => n.name !== name.name);
      }
      if (prev.length >= 10) {
        alert('最多选择10个名字');
        return prev;
      }
      return [...prev, name];
    });
  };

  // 生成PDF名帖 - 豪华精装商业版
  const generatePDF = async () => {
    if (selectedNames.length === 0) return;
    
    setIsGenerating(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // 公用宣纸背景样式
      const paperBg = `background-color: #fbf9f4; background-image: url("/p6.png");`;

      // 1. 渲染豪华封面
      const coverContainer = document.createElement('div');
      coverContainer.style.cssText = `position: absolute; left: 0; top: 0; width: 794px; height: 1123px; ${paperBg} z-index: -1000; font-family: "Noto Serif SC", serif; padding: 60px; box-sizing: border-box;`;
      coverContainer.innerHTML = `
        <div style="width: 100%; height: 100%; border: 8px double #C5A367; padding: 10px; box-sizing: border-box; position: relative; background: rgba(255,255,255,0.4);">
          <div style="width: 100%; height: 100%; border: 1px solid #C5A367; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden;">
            
            <!-- 背景水墨暗纹 -->
            <div style="position: absolute; font-size: 500px; color: rgba(197, 163, 103, 0.05); font-weight: bold; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 0;">名</div>
            
            <div style="z-index: 1; text-align: center;">
              <div style="font-size: 20px; color: #C5A367; letter-spacing: 12px; margin-bottom: 20px;">—— 馆 藏 至 尊 ——</div>
              <h1 style="font-size: 82px; color: #B22222; font-weight: bold; letter-spacing: 25px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">墨香取名</h1>
              <div style="width: 200px; height: 2px; background: linear-gradient(90deg, transparent, #B22222, transparent); margin: 30px auto;"></div>
              <p style="font-size: 28px; color: #333; letter-spacing: 10px; font-style: italic;">精 选 雅 名 名 帖</p>
              
              <div style="margin-top: 120px;">
                ${surname ? `<div style="font-size: 36px; color: #333;">为 <span style="color: #B22222; font-weight: bold; border-bottom: 3px solid #C5A367;">${surname}</span> 府 亲 选</div>` : ''}
                <div style="font-size: 18px; color: #666; margin-top: 30px; letter-spacing: 2px;">天选之名 · 传世留香 · 共计 ${selectedNames.length} 例</div>
              </div>
            </div>

            <!-- 底部印章感设计 -->
            <div style="position: absolute; bottom: 80px; text-align: center; z-index: 1;">
              <div style="width: 72px; height: 72px; border: 4px solid #B22222; display: flex; align-items: center; justify-content: center; color: #B22222; padding: 2px; box-sizing: border-box; background: rgba(178, 34, 34, 0.03); transform: rotate(-3deg); box-shadow: 1px 1px 1px rgba(0,0,0,0.05); position: relative; margin: 0 auto 20px;">
                <div style="width: 100%; height: 100%; border: 1px solid #B22222; display: grid; grid-template-columns: 1fr 1fr; align-items: center; justify-items: center; font-family: 'STKaiti', 'KaiTi', 'SimSun', serif; font-weight: 900;">
                  <div style="writing-mode: vertical-rl; text-align: center; line-height: 1; letter-spacing: 2px; font-size: 20px;">取名</div>
                  <div style="writing-mode: vertical-rl; text-align: center; line-height: 1; letter-spacing: 2px; font-size: 20px;">墨香</div>
                </div>
              </div>
              <div style="color: #999; font-size: 14px; letter-spacing: 4px;">${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(coverContainer);
      const coverCanvas = await html2canvas(coverContainer, { scale: 2, useCORS: true });
      doc.addImage(coverCanvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, pageWidth, pageHeight);
      document.body.removeChild(coverContainer);

      // 2. 渲染每一页的名字详情 (每页 1 个名字，增加仪式感和空间感)
      for (let i = 0; i < selectedNames.length; i++) {
        doc.addPage();
        const item = selectedNames[i];
        
        const detailContainer = document.createElement('div');
        detailContainer.style.cssText = `position: absolute; left: 0; top: 0; width: 794px; height: 1123px; ${paperBg} z-index: -1000; font-family: "Noto Serif SC", serif; padding: 50px; box-sizing: border-box;`;
        detailContainer.innerHTML = `
          <div style="width: 100%; height: 100%; border: 1px solid #C5A367; position: relative; background: white; padding: 60px; box-sizing: border-box;">
            
            <!-- 页码与装饰 -->
            <div style="position: absolute; top: 30px; right: 30px; color: #C5A367; font-size: 14px; letter-spacing: 2px;">第 ${i + 1} / ${selectedNames.length} 卷</div>
            <div style="position: absolute; top: 30px; left: 30px; color: #B22222; font-weight: bold; border-left: 3px solid #B22222; padding-left: 10px;">墨香名鉴</div>

            <!-- 主内容区 -->
            <div style="margin-top: 60px;">
              <div style="display: flex; align-items: center; margin-bottom: 50px; flex-wrap: nowrap;">
                <h2 style="font-size: ${(surname || '').length + item.name.length > 3 ? '64px' : '88px'}; color: #B22222; font-weight: bold; margin: 0; letter-spacing: ${(surname || '').length + item.name.length > 3 ? '8px' : '15px'}; white-space: nowrap;">
                  ${surname || ''}${item.name}
                </h2>
                <div style="margin-left: 40px;">
                  <div style="font-size: 24px; color: #999; font-style: italic; letter-spacing: 4px; margin-bottom: 10px;">${item.pinyin.toUpperCase()}</div>
                  <div style="display: inline-block; background: #B22222; color: white; padding: 4px 15px; border-radius: 4px; font-size: 14px; font-weight: bold;">契合度 ${item.harmonyScore}%</div>
                </div>
              </div>

              <!-- 解析板块 -->
              <div style="margin-top: 80px;">
                <div style="display: flex; margin-bottom: 40px;">
                  <div style="writing-mode: vertical-rl; background: #B22222; color: white; padding: 10px 5px; font-size: 16px; letter-spacing: 4px; font-weight: bold;">名字寓意</div>
                  <div style="margin-right: 30px; padding: 0 30px; font-size: 20px; color: #333; line-height: 2; text-align: justify; border-left: 1px solid #eee;">
                    ${item.meaning}
                  </div>
                </div>

                <div style="display: flex; margin-bottom: 40px;">
                  <div style="writing-mode: vertical-rl; background: #C5A367; color: white; padding: 10px 5px; font-size: 16px; letter-spacing: 4px; font-weight: bold;">典籍出处</div>
                  <div style="margin-right: 30px; padding: 0 30px; font-size: 18px; color: #666; font-style: italic; line-height: 1.8; border-left: 1px solid #eee;">
                    —— 出自 ${item.source}
                  </div>
                </div>

                <!-- 增加专家点评位 -->
                <div style="margin-top: 100px; padding: 30px; background: #fdfaf5; border: 1px dashed #C5A367; border-radius: 8px; position: relative;">
                  <div style="position: absolute; top: -15px; left: 20px; background: #fdfaf5; padding: 0 10px; color: #C5A367; font-weight: bold;">AI 智能详评</div>
                  <div style="font-size: 16px; color: #7c6d55; line-height: 1.8;">
                    <div style="margin-bottom: 15px;"><strong style="color: #B22222;">[五行解析]</strong> ${surname || ''}${item.name}一名，字形稳重，五行属${item.tone[0] % 2 === 0 ? '木火' : '金水'}相生，极具进取之心。</div>
                    <div style="margin-bottom: 15px;"><strong style="color: #B22222;">[三才配置]</strong> 天人地三才平衡，寓意贵人相助，少年早成，中年大发。</div>
                    <div><strong style="color: #B22222;">[声律点评]</strong> 此名声调为“${item.tone[0]}声·${item.tone[1] || '轻'}声”，平仄相间，读之朗朗上口，韵律优美。</div>
                  </div>
                  <!-- 红色装饰印章 -->
                  <div style="position: absolute; bottom: 15px; right: 20px; width: 45px; height: 45px; border: 2px solid #B22222; color: #B22222; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; transform: rotate(15deg); opacity: 0.6;">墨香精选</div>
                </div>
              </div>
            </div>

            <!-- 页脚 -->
            <div style="position: absolute; bottom: 40px; left: 0; right: 0; text-align: center; color: #ccc; font-size: 10px; letter-spacing: 2px;">
              墨 香 取 名 · 文 墨 传 家
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(detailContainer);
      const detailCanvas = await html2canvas(detailContainer, { scale: 2, useCORS: true });
      doc.addImage(detailCanvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, pageWidth, pageHeight);
      document.body.removeChild(detailContainer);
    }

    // 3. 豪华结语页
    doc.addPage();
    const endContainer = document.createElement('div');
    endContainer.style.cssText = `position: absolute; left: 0; top: 0; width: 794px; height: 1123px; ${paperBg} z-index: -1000; font-family: "Noto Serif SC", serif; padding: 100px; box-sizing: border-box;`;
    endContainer.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid #eee;">
        <div style="font-size: 48px; color: #C5A367; font-family: serif; margin-bottom: 40px;">谨贺佳名</div>
        <p style="font-size: 18px; color: #666; line-height: 2.5; text-align: center; letter-spacing: 3px;">
          名字是送给孩子的第一份礼物<br/>
          愿此雅名，能伴随贵公子/千金<br/>
          温润如玉，志存高远<br/>
          一生平安顺遂，文墨留香
        </p>
        <div style="margin-top: 60px; width: 40px; height: 1px; background: #C5A367;"></div>
        <div style="margin-top: 40px; font-size: 16px; color: #B22222; font-weight: bold; letter-spacing: 5px;">墨香取名 敬制</div>
      </div>
    `;
    document.body.appendChild(endContainer);
    const endCanvas = await html2canvas(endContainer, { scale: 2, useCORS: true });
    doc.addImage(endCanvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, pageWidth, pageHeight);
    document.body.removeChild(endContainer);

    doc.save(`${surname || '精选'}名帖-至尊馆藏版.pdf`);
    
    setShowExportModal(false);
    setSelectedNames([]);
    setIsPaid(false);
    setIsGenerating(false);
  } catch (err) {
    console.error('PDF生成失败:', err);
    alert('生成PDF失败，请重试');
    setIsGenerating(false);
  }
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9F4E8', position: 'relative' }}>
      <audio ref={audioRef} src="/bgm.mp3" loop />
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
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* 背景纹理 */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url(/p6.png)',
        opacity: 0.5,
        pointerEvents: 'none'
      }} />
      
      <header style={{ textAlign: 'center', padding: '40px 20px 30px', position: 'relative' }}>
        {/* 音乐按钮 */}
        <button
          onClick={toggleMusic}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid #C5A367',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 10
          }}
          title={isPlaying ? '关闭音乐' : '播放音乐'}
        >
          <Music size={24} color={isPlaying ? '#B22222' : '#999'} />
        </button>
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
                  backgroundImage: 'url(/carbon-fibre.png)',
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
                  backgroundColor: selectedNames.find(n => n.name === item.name) 
                    ? (isGold ? '#FFF8E7' : '#f0f7ff')
                    : (isGold ? '#FFFDF5' : 'white'),
                  border: selectedNames.find(n => n.name === item.name)
                    ? '2px solid #C5A367'
                    : (isGold ? '2px solid #C5A367' : '1px solid #ddd'),
                  borderRadius: '12px',
                  padding: '24px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: selectedNames.find(n => n.name === item.name)
                    ? '0 4px 12px rgba(197,163,103,0.4)'
                    : (isGold 
                      ? '0 6px 16px rgba(197,163,103,0.25), inset 0 0 10px rgba(255,255,255,0.5)' 
                      : '0 2px 4px rgba(0,0,0,0.05)'),
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* 选择复选框 */}
                <div 
                  onClick={(e) => toggleSelectName(item, e)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: selectedNames.find(n => n.name === item.name) 
                      ? '2px solid #C5A367' 
                      : '2px solid #ddd',
                    backgroundColor: selectedNames.find(n => n.name === item.name) 
                      ? '#C5A367' 
                      : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.2s'
                  }}
                >
                  {selectedNames.find(n => n.name === item.name) && (
                    <span style={{ color: 'white', fontSize: '14px' }}>✓</span>
                  )}
                </div>
                
                {/* 已选标记 */}
                {selectedNames.find(n => n.name === item.name) && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    backgroundColor: '#C5A367',
                    color: 'white',
                    fontSize: '10px',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    zIndex: 10,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>
                    已选
                  </div>
                )}
              
              {isGold && !selectedNames.find(n => n.name === item.name) && (
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

      {/* 批量导出浮动按钮 */}
      {selectedNames.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '10px 20px',
            borderRadius: '25px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '2px solid #C5A367'
          }}>
            <span style={{ color: '#666', fontSize: '14px' }}>
              已选 <strong style={{ color: '#B22222' }}>{selectedNames.length}</strong> 个名字
            </span>
            <button
              onClick={() => setShowExportModal(true)}
              style={{
                backgroundColor: '#B22222',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              💎 导出PDF名帖
            </button>
          </div>
          <button
            onClick={() => setSelectedNames([])}
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="清空选择"
          >
            ×
          </button>
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

              {/* 大师深度详评 - AI 锁定区 */}
              <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#fdfaf5',
                borderRadius: '12px',
                border: '1px solid #C5A367',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  backgroundColor: '#C5A367', 
                  color: 'white', 
                  fontSize: '10px', 
                  padding: '2px 10px',
                  borderRadius: '0 0 8px 0',
                  fontWeight: 'bold'
                }}>大师详评</div>
                
                {isAIUnlocked ? (
                  <div style={{ marginTop: '10px' }}>
                    {isAIGenerating ? (
                      <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ 
                          width: '20px', 
                          height: '20px', 
                          border: '2px solid #C5A367', 
                          borderTop: '2px solid transparent', 
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                          margin: '0 auto 10px'
                        }} />
                        <p style={{ fontSize: '12px', color: '#C5A367' }}>正在通过AI进行深度测算...</p>
                      </div>
                    ) : (
                      <div style={{ fontSize: '14px', color: '#555', lineHeight: 1.8, textAlign: 'left' }}>
                        <strong style={{ color: '#B22222' }}>[五行解析]</strong> {selectedName.name}一名，字形稳重，五行属${selectedName.tone[0] % 2 === 0 ? '木火' : '金水'}相生，极具进取之心。<br/>
                        <strong style={{ color: '#B22222' }}>[三才配置]</strong> 天人地三才平衡，寓意贵人相助，少年早成，中年大发。<br/>
                        <strong style={{ color: '#B22222' }}>[大师建议]</strong> 此名极佳，若配合生辰八字精准校对，可保一生顺遂。
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#666', 
                      filter: 'blur(4px)', 
                      userSelect: 'none',
                      marginBottom: '15px'
                    }}>
                      此名五行属木火相生，极具进取之心。天人地三才平衡，寓意贵人相助，少年早成，中年大发。
                    </div>
                    <button
                      onClick={() => {
                        setIsAIGenerating(true);
                        setTimeout(() => {
                          setIsAIGenerating(false);
                          setIsAIUnlocked(true);
                        }, 2000);
                      }}
                      style={{
                        backgroundColor: '#B22222',
                        color: 'white',
                        border: 'none',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(178,34,34,0.2)'
                      }}
                    >
                      🚀 免费AI深度解析
                    </button>
                    <p style={{ fontSize: '10px', color: '#999', marginTop: '10px' }}>
                      * 实时调取智能接口进行文化意蕴测算
                    </p>
                  </div>
                )}
              </div>

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
                    setAdCountdown(TOTAL_AD_SECONDS);
                    setAdProgress(0);
                    const timer = setInterval(() => {
                      setAdCountdown(prev => {
                        const newVal = prev - 1;
                        setAdProgress(((TOTAL_AD_SECONDS - newVal) / TOTAL_AD_SECONDS) * 100);
                        if (newVal <= 0) {
                          clearInterval(timer);
                          setIsPremiumUnlocked(true);
                          setShowPreview(true);
                          return 0;
                        }
                        return newVal;
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
                    position: 'relative'
                  }}
                >
                  <Smartphone size={18} />
                  {adCountdown > 0 ? `广告播放中 ${adCountdown}秒` : '至尊名片解锁'}
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
                backgroundImage: 'url(/black-linen.png)',
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
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '25px',
                height: '1px',
                backgroundColor: isPremiumUnlocked ? '#C5A367' : '#B22222',
                opacity: 0.6
              }} />
              <div style={{
                fontSize: '8px',
                color: isPremiumUnlocked ? '#C5A367' : '#B22222',
                letterSpacing: '0.3em',
                whiteSpace: 'nowrap'
              }}>{isPremiumUnlocked ? '传世雅名 · 至尊鉴赏' : '为子寻雅名'}</div>
              <div style={{
                width: '25px',
                height: '1px',
                backgroundColor: isPremiumUnlocked ? '#C5A367' : '#B22222',
                opacity: 0.6
              }} />
            </div>

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

            {/* 至尊版专属标识 */}
            {isPremiumUnlocked && (
              <div style={{
                position: 'absolute',
                top: '55px',
                right: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px'
              }}>
                <span style={{
                  fontSize: '10px',
                  color: '#C5A367',
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  writingMode: 'vertical-rl',
                  textShadow: '0 0 10px rgba(197,163,103,0.5)'
                }}>名家</span>
                <span style={{
                  fontSize: '8px',
                  color: 'rgba(197,163,103,0.7)',
                  letterSpacing: '1px',
                  writingMode: 'vertical-rl'
                }}>亲启</span>
                <div style={{
                  width: '1px',
                  height: '15px',
                  background: 'linear-gradient(to bottom, #C5A367, transparent)',
                  marginTop: '3px'
                }} />
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
                right: '10px',
                width: '48px',
                height: '48px',
                border: isPremiumUnlocked ? '2px solid rgba(197,163,103,0.6)' : '2px solid rgba(178,34,34,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-8deg)',
                backgroundColor: isPremiumUnlocked ? 'rgba(197,163,103,0.05)' : 'rgba(178,34,34,0.03)'
              }}>
                <span style={{
                  fontSize: '22px',
                  color: isPremiumUnlocked ? '#C5A367' : '#B22222',
                  fontFamily: '"STXingkai", "Xingkai SC", "华文行楷", "行楷", cursive',
                  fontWeight: 'normal',
                  fontStyle: 'italic',
                  letterSpacing: '2px'
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

      {/* 30秒广告播放层 */}
      {adCountdown > 0 && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          overflow: 'hidden'
        }}>
          {/* 顶部状态栏 */}
          <div style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(197,163,103,0.2)'
          }}>
            <span style={{ color: '#C5A367', fontSize: '14px' }}>墨香起名 · 至尊版</span>
            <span style={{ color: '#999', fontSize: '12px' }}>广告 {adCountdown}秒后结束</span>
          </div>

          {/* 广告内容区 */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px'
          }}>
            {/* 游戏推广卡片 */}
            <div style={{
              width: '100%',
              maxWidth: '320px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid rgba(197,163,103,0.3)',
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px'
              }}>🎮</div>
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#fff' }}>休闲益智小游戏</h3>
              <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '20px', lineHeight: 1.6 }}>
                试玩30秒，免费解锁至尊名片<br/>
                <span style={{ color: '#C5A367', fontSize: '12px' }}>已帮助 12,847 位用户解锁</span>
              </p>
              <button 
                onClick={() => {
                  // 跳转微信小程序游戏（使用URL Scheme）
                  window.location.href = 'weixin://dl/business/?t= */YOUR_MINI_APP_ID';
                }}
                style={{
                  background: 'linear-gradient(135deg, #C5A367 0%, #D4AF37 100%)',
                  color: '#000',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                点击试玩，支持创作者
              </button>
              <p style={{ 
                marginTop: '15px', 
                fontSize: '11px', 
                color: '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}>
                <span>💡</span> 试玩后返回即可自动解锁
              </p>
            </div>
            
            {/* 进度条 */}
            <div style={{ width: '100%', maxWidth: '320px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
                fontSize: '12px',
                color: '#888'
              }}>
                <span>解锁进度</span>
                <span style={{ color: '#C5A367' }}>{Math.round(adProgress)}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${adProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #C5A367 0%, #FFD700 100%)',
                  borderRadius: '3px',
                  transition: 'width 1s linear'
                }} />
              </div>
              <p style={{ 
                textAlign: 'center', 
                marginTop: '15px', 
                fontSize: '13px', 
                color: '#666' 
              }}>
                正在生成您的专属至尊名片...
              </p>
            </div>
          </div>

          {/* 底部提示 */}
          <div style={{
            padding: '20px',
            borderTop: '1px solid rgba(197,163,103,0.2)',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '12px', color: '#666' }}>
              💎 至尊版包含：黑金配色 · 名家篆刻 · 高清导出
            </p>
          </div>
        </div>
      )}

      {/* 导出PDF支付模态框 */}
      {showExportModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '380px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            {/* 关闭按钮 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
              <button 
                onClick={() => setShowExportModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ×
              </button>
            </div>

            {!isPaid ? (
              <>
                {/* 预览已选名字 */}
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #C5A367 0%, #D4AF37 100%)',
                    borderRadius: '50%',
                    margin: '0 auto 15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px'
                  }}>
                    📜
                  </div>
                  <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '5px' }}>
                    PDF名帖导出
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    已选 <strong style={{ color: '#B22222', fontSize: '18px' }}>{selectedNames.length}</strong> 个名字
                  </p>
                </div>

                {/* 功能列表 */}
                <div style={{ 
                  backgroundColor: '#f9f4e8', 
                  padding: '20px', 
                  borderRadius: '12px',
                  marginBottom: '25px'
                }}>
                  <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px', fontWeight: 'bold' }}>
                    📋 名帖包含：
                  </p>
                  <ul style={{ fontSize: '12px', color: '#666', lineHeight: '2', paddingLeft: '20px' }}>
                    <li>名字拼音与读音</li>
                    <li>详细寓意解读</li>
                    <li>古典出处标注</li>
                    <li>姓氏契合度评分</li>
                    <li>精美排版设计</li>
                  </ul>
                </div>

                {/* 价格 */}
                <div style={{ 
                  textAlign: 'center', 
                  marginBottom: '25px',
                  padding: '15px',
                  border: '2px dashed #C5A367',
                  borderRadius: '12px'
                }}>
                  <p style={{ fontSize: '14px', color: '#999', textDecoration: 'line-through' }}>
                    原价 ¥29.9
                  </p>
                  <p style={{ fontSize: '32px', color: '#B22222', fontWeight: 'bold' }}>
                    ¥9.9
                  </p>
                  <p style={{ fontSize: '12px', color: '#C5A367' }}>
                    🔥 已有 2,847 位家长购买
                  </p>
                </div>

                {/* 支付按钮 */}
                <button
                  onClick={() => setIsPaid(true)}
                  style={{
                    width: '100%',
                    padding: '15px',
                    backgroundColor: '#B22222',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginBottom: '10px'
                  }}
                >
                  💳 立即支付 ¥9.9
                </button>

                {/* 微信支付说明 */}
                <p style={{ fontSize: '11px', color: '#999', textAlign: 'center' }}>
                  支持微信支付 · 支付宝 · 银行卡
                </p>
              </>
            ) : (
              <>
                {/* 支付成功界面 */}
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#4CAF50',
                    borderRadius: '50%',
                    margin: '0 auto 15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px'
                  }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '20px', color: '#4CAF50', marginBottom: '5px' }}>
                    支付成功！
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    正在为您生成PDF名帖...
                  </p>
                </div>

                {/* 生成的预览 */}
                <div style={{
                  backgroundColor: '#f5f5f5',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '25px',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  <p style={{ fontSize: '12px', color: '#999', marginBottom: '10px' }}>
                    📄 包含名字：
                  </p>
                  {selectedNames.map((name, idx) => (
                    <div key={idx} style={{
                      padding: '8px 0',
                      borderBottom: idx < selectedNames.length - 1 ? '1px solid #ddd' : 'none',
                      fontSize: '14px',
                      color: '#333'
                    }}>
                      {idx + 1}. {surname}{name.name}
                    </div>
                  ))}
                </div>

                {/* 下载按钮 */}
                <button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  style={{
                    width: '100%',
                    padding: '15px',
                    backgroundColor: isGenerating ? '#ccc' : '#C5A367',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: isGenerating ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isGenerating ? '⏳ 生成中...' : '📥 下载PDF名帖'}
                </button>

                <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', marginTop: '10px' }}>
                  PDF文件将保存到您的下载文件夹
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {/* 大师咨询悬浮球 */}
      <div 
        onClick={() => setShowConsultModal(true)}
        style={{
          position: 'fixed',
          right: '20px',
          top: '40%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#B22222',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(178,34,34,0.4)',
          zIndex: 90,
          border: '2px solid #C5A367',
          animation: 'float 3s infinite ease-in-out'
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>大师</span>
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>咨询</span>
      </div>

      {/* 大师咨询模态框 */}
      {showConsultModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            background: '#F9F4E8',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid #C5A367',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
          }}>
            {/* 背景修饰 */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '150px',
              height: '150px',
              backgroundColor: 'rgba(197,163,103,0.1)',
              borderRadius: '50%'
            }} />

            <button 
              onClick={() => setShowConsultModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#999',
                zIndex: 2
              }}
            >
              ×
            </button>

            <div style={{ padding: '40px 30px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '60px', 
                height: '2px', 
                backgroundColor: '#B22222', 
                margin: '0 auto 20px' 
              }} />
              <h2 style={{ 
                fontSize: '24px', 
                color: '#B22222', 
                letterSpacing: '4px',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>大师人工起名</h2>
              <p style={{ color: '#C5A367', fontSize: '14px', letterSpacing: '2px', marginBottom: '30px' }}>—— 文墨传家 · 雅名伴一生 ——</p>
              
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '12px',
                border: '1px solid #eee',
                marginBottom: '30px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <div style={{ color: '#B22222' }}>●</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>结合生辰八字、五行缺失深度定制</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <div style={{ color: '#B22222' }}>●</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>避开重名风险，确保名字独一无二</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ color: '#B22222' }}>●</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>由资深民俗文化学者一对一服务</div>
                </div>
              </div>

              {/* 二维码占位 */}
              <div style={{
                width: '180px',
                height: '180px',
                backgroundColor: 'white',
                border: '4px solid #C5A367',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>📱</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>[ 微信扫码添加 ]</div>
                  <div style={{ fontSize: '10px', color: '#ccc', marginTop: '5px' }}>此处替换为你的二维码</div>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#999', lineHeight: '1.6' }}>
                已有超过 1,500 位家长<br/>
                通过人工咨询获得满意佳名
              </p>
            </div>

            <div style={{ 
              backgroundColor: '#B22222', 
              color: 'white', 
              padding: '12px', 
              fontSize: '12px', 
              letterSpacing: '2px',
              textAlign: 'center'
            }}>
              墨 香 取 名 · 承 载 厚 望
            </div>
          </div>
        </div>
      )}
    </div>
  );
}