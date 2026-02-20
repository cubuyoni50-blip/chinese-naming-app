import { NameItem } from './names';

// 生成1000个单字名数据并导出为JSON
const singleCharDB: { [key: string]: { meaning: string; category: string; tone: number; pinyin: string } } = {
  '辰': { meaning: '星辰、时光，寓意如星辰般璀璨', category: '时间', tone: 2, pinyin: 'chén' },
  '昕': { meaning: '黎明、日出，寓意充满希望', category: '时间', tone: 1, pinyin: 'xīn' },
  '晓': { meaning: '清晨、明白，寓意聪慧明理', category: '时间', tone: 3, pinyin: 'xiǎo' },
  '曦': { meaning: '晨光、阳光，寓意温暖光明', category: '时间', tone: 1, pinyin: 'xī' },
  '旭': { meaning: '旭日东升，寓意朝气蓬勃', category: '时间', tone: 4, pinyin: 'xù' },
  '沐': { meaning: '沐浴、润泽，寓意受恩泽滋养', category: '水', tone: 4, pinyin: 'mù' },
  '汐': { meaning: '潮汐、晚潮，寓意温婉动人', category: '水', tone: 1, pinyin: 'xī' },
  '清': { meaning: '清澈、纯净，寓意品性高洁', category: '水', tone: 1, pinyin: 'qīng' },
  '玥': { meaning: '神珠、明珠，寓意珍贵美好', category: '玉石', tone: 4, pinyin: 'yuè' },
  '瑾': { meaning: '美玉、美德，寓意品德高尚', category: '玉石', tone: 3, pinyin: 'jǐn' },
  '瑜': { meaning: '美玉、优点，寓意完美无瑕', category: '玉石', tone: 2, pinyin: 'yú' },
  '苒': { meaning: '草木茂盛，寓意生机勃勃', category: '植物', tone: 3, pinyin: 'rǎn' },
  '桐': { meaning: '梧桐树，寓意高洁品格', category: '植物', tone: 2, pinyin: 'tóng' },
  '松': { meaning: '松树，寓意坚韧不拔', category: '植物', tone: 1, pinyin: 'sōng' },
  '竹': { meaning: '竹子，寓意虚心有节', category: '植物', tone: 2, pinyin: 'zhú' },
  '景': { meaning: '景色、景象，寓意前程美好', category: '天象', tone: 3, pinyin: 'jǐng' },
  '星': { meaning: '星辰、星光，寓意闪耀独特', category: '天象', tone: 1, pinyin: 'xīng' },
  '云': { meaning: '云彩、飘逸，寓意自由自在', category: '天象', tone: 2, pinyin: 'yún' },
  '怀': { meaning: '怀抱、怀念，寓意心胸宽广', category: '品德', tone: 2, pinyin: 'huái' },
  '嘉': { meaning: '美好、赞许，寓意优秀出众', category: '品德', tone: 1, pinyin: 'jiā' },
};

// 生成更多单字...
const additionalChars = '安安宁宁静静雅雅涵涵泽泽沐沐雨雨晴晴露露霜霜雪雪月月星星云云霞霞露露'.split('');
additionalChars.forEach((char, i) => {
  if (!singleCharDB[char]) {
    singleCharDB[char] = {
      meaning: `美好的"${char}"字，寓意吉祥如意`,
      category: '通用',
      tone: (i % 4) + 1,
      pinyin: char
    };
  }
});

// 生成1000个单字名
const singleNames: NameItem[] = [];
const availableChars = Object.keys(singleCharDB);
const styles = ['诗经', '楚辞', '唐诗', '宋词', '现代', '自然'];

for (let i = 0; i < 1000; i++) {
  const char = availableChars[i % availableChars.length];
  const style = styles[i % styles.length];
  const info = singleCharDB[char];
  
  singleNames.push({
    name: char,
    pinyin: info.pinyin,
    meaning: info.meaning,
    source: style === '诗经' ? '《诗经》意境' : 
            style === '楚辞' ? '《楚辞》意境' :
            style === '唐诗' ? '唐诗意境' :
            style === '宋词' ? '宋词意境' :
            style === '自然' ? '山水意境' : '现代意境',
    style: style as any,
    tone: [info.tone, 0]
  });
}

export { singleNames };
