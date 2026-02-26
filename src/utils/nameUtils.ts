/**
 * 墨香取名 - 核心逻辑工具包
 */

// 1. 简转繁映射表
export const toTraditional = (s: string): string => {
  const map: Record<string, string> = {
    '张': '張', '刘': '劉', '陈': '陳', '杨': '楊', '黄': '黃', '赵': '趙', '吴': '吳', '孙': '孫',
    '马': '馬', '罗': '羅', '梁': '梁', '宋': '宋', '郑': '鄭', '谢': '謝', '韩': '韓', '唐': '唐',
    '冯': '馮', '董': '董', '萧': '蕭', '程': '程', '曹': '曹', '袁': '袁', '邓': '鄧', '许': '許',
    '傅': '傅', '沈': '沈', '曾': '曾', '彭': '彭', '吕': '吕', '苏': '蘇', '卢': '盧', '蒋': '蔣',
    '蔡': '蔡', '贾': '賈', '丁': '丁', '魏': '魏', '薛': '薛', '叶': '葉', '阎': '閻', '余': '餘',
    '潘': '潘', '杜': '杜', '戴': '戴', '夏': '夏', '钟': '鐘', '汪': '汪', '田': '田', '任': '任',
    '姜': '姜', '范': '范', '方': '方', '石': '石', '姚': '姚', '谭': '譚', '廖': '廖', '邹': '鄒',
    '熊': '熊', '金': '金', '陆': '陸', '郝': '郝', '孔': '孔', '白': '白', '崔': '崔', '康': '康',
    '毛': '毛', '邱': '邱', '秦': '秦', '江': '江', '史': '史', '顾': '顧', '侯': '侯', '邵': '邵',
    '孟': '孟', '龙': '龍', '万': '萬', '段': '段', '雷': '雷', '钱': '錢', '汤': '湯', '尹': '尹',
    '易': '易', '黎': '黎', '向': '向', '乔': '喬'
  };
  return map[s] || s;
};

// 2. 姓氏声调分析
export const getSurnameTone = (s: string): number => {
  if (!s) return 1;
  const lastChar = s[s.length - 1];
  const pingToneChars = ['张', '王', '周', '林', '高', '陈', '李', '刘', '孙'];
  return pingToneChars.includes(lastChar) ? 1 : 2;
};

// 3. 契合度核心算法
export const calculateHarmony = (s: string, name: string, tone: number[]): number => {
  if (!s) return 0;
  
  const surnameTone = getSurnameTone(s);
  const nameTone1 = tone?.[0] || 1;
  const nameTone2 = tone?.[1] || 2;
  
  // 声调平仄基础分
  let toneScore = 15;
  if (surnameTone !== nameTone1) toneScore += 8;
  if (nameTone1 !== nameTone2 && name.length > 1) toneScore += 7;
  
  // 姓名哈希权重 (模拟五行)
  const combined = s + name;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash) + combined.charCodeAt(i);
    hash |= 0; 
  }
  const destinyFactor = Math.abs(hash % 40);
  
  // 字形平衡
  const visualBalance = Math.abs((combined.charCodeAt(0) + combined.charCodeAt(combined.length-1)) % 21);
  
  const totalScore = 10 + toneScore + destinyFactor + visualBalance;
  return totalScore >= 100 ? (hash % 100 === 7 ? 100 : 99) : Math.max(60, totalScore);
};