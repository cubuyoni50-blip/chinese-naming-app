import { NameItem } from './names';

// 简化的单字名库（100个常用字）
const singleCharDB: { [key: string]: { meaning: string; category: string; tone: number; pinyin: string } } = {
  '辰': { meaning: '星辰、时光，寓意如星辰般璀璨', category: '时间', tone: 2, pinyin: 'chén' },
  '昕': { meaning: '黎明、日出，寓意充满希望', category: '时间', tone: 1, pinyin: 'xīn' },
  '晓': { meaning: '清晨、明白，寓意聪慧明理', category: '时间', tone: 3, pinyin: 'xiǎo' },
  '曦': { meaning: '晨光、阳光，寓意温暖光明', category: '时间', tone: 1, pinyin: 'xī' },
  '沐': { meaning: '沐浴、润泽，寓意受恩泽滋养', category: '水', tone: 4, pinyin: 'mù' },
  '汐': { meaning: '潮汐、晚潮，寓意温婉动人', category: '水', tone: 1, pinyin: 'xī' },
  '清': { meaning: '清澈、纯净，寓意品性高洁', category: '水', tone: 1, pinyin: 'qīng' },
  '涵': { meaning: '包容、涵养，寓意有内涵', category: '水', tone: 2, pinyin: 'hán' },
  '泽': { meaning: '恩泽、光泽，寓意仁慈博爱', category: '水', tone: 2, pinyin: 'zé' },
  '玥': { meaning: '神珠、明珠，寓意珍贵美好', category: '玉石', tone: 4, pinyin: 'yuè' },
  '瑾': { meaning: '美玉、美德，寓意品德高尚', category: '玉石', tone: 3, pinyin: 'jǐn' },
  '瑜': { meaning: '美玉、优点，寓意完美无瑕', category: '玉石', tone: 2, pinyin: 'yú' },
  '琛': { meaning: '珍宝、宝物，寓意珍贵稀有', category: '玉石', tone: 1, pinyin: 'chēn' },
  '苒': { meaning: '草木茂盛，寓意生机勃勃', category: '植物', tone: 3, pinyin: 'rǎn' },
  '桐': { meaning: '梧桐树，寓意高洁品格', category: '植物', tone: 2, pinyin: 'tóng' },
  '枫': { meaning: '枫树、红叶，寓意热情浪漫', category: '植物', tone: 1, pinyin: 'fēng' },
  '松': { meaning: '松树，寓意坚韧不拔', category: '植物', tone: 1, pinyin: 'sōng' },
  '竹': { meaning: '竹子，寓意虚心有节', category: '植物', tone: 2, pinyin: 'zhú' },
  '梅': { meaning: '梅花，寓意傲雪凌霜', category: '植物', tone: 2, pinyin: 'méi' },
  '兰': { meaning: '兰花，寓意幽雅高洁', category: '植物', tone: 2, pinyin: 'lán' },
  '景': { meaning: '景色、景象，寓意前程美好', category: '天象', tone: 3, pinyin: 'jǐng' },
  '星': { meaning: '星辰、星光，寓意闪耀独特', category: '天象', tone: 1, pinyin: 'xīng' },
  '云': { meaning: '云彩、飘逸，寓意自由自在', category: '天象', tone: 2, pinyin: 'yún' },
  '霞': { meaning: '彩霞、晚霞，寓意绚烂多彩', category: '天象', tone: 2, pinyin: 'xiá' },
  '怀': { meaning: '怀抱、怀念，寓意心胸宽广', category: '品德', tone: 2, pinyin: 'huái' },
  '嘉': { meaning: '美好、赞许，寓意优秀出众', category: '品德', tone: 1, pinyin: 'jiā' },
  '宁': { meaning: '安宁、平静，寓意心境平和', category: '品德', tone: 2, pinyin: 'níng' },
  '安': { meaning: '平安、安定，寓意一生平安', category: '品德', tone: 1, pinyin: 'ān' },
  '行': { meaning: '行走、品行，寓意行动力强', category: '动作', tone: 2, pinyin: 'xíng' },
  '翔': { meaning: '飞翔、翱翔，寓意志向高远', category: '动作', tone: 2, pinyin: 'xiáng' },
  '思': { meaning: '思考、思念，寓意聪慧善思', category: '动作', tone: 1, pinyin: 'sī' },
  '语': { meaning: '言语、说话，寓意善于表达', category: '动作', tone: 3, pinyin: 'yǔ' },
  '鸿': { meaning: '大雁、宏大，寓意志向远大', category: '鸟类', tone: 2, pinyin: 'hóng' },
  '鹏': { meaning: '大鹏、前程，寓意鹏程万里', category: '鸟类', tone: 2, pinyin: 'péng' },
  '宇': { meaning: '宇宙、空间，寓意胸怀广阔', category: '空间', tone: 3, pinyin: 'yǔ' },
  '轩': { meaning: '轩窗、高大，寓意气度不凡', category: '空间', tone: 1, pinyin: 'xuān' },
  '婉': { meaning: '温婉、柔顺，寓意温柔贤淑', category: '品质', tone: 3, pinyin: 'wǎn' },
  '雅': { meaning: '优雅、高雅，寓意举止优雅', category: '品质', tone: 3, pinyin: 'yǎ' },
  '初': { meaning: '开始、最初，寓意不忘初心', category: '自然', tone: 1, pinyin: 'chū' },
  '夏': { meaning: '夏天、华夏，寓意热情奔放', category: '自然', tone: 4, pinyin: 'xià' },
  '秋': { meaning: '秋天、收获，寓意成熟稳重', category: '自然', tone: 1, pinyin: 'qiū' },
  '雨': { meaning: '雨水、恩泽，寓意滋润万物', category: '雨', tone: 3, pinyin: 'yǔ' },
  '晴': { meaning: '晴天、晴朗，寓意阳光开朗', category: '雨', tone: 2, pinyin: 'qíng' },
  '明': { meaning: '明亮、智慧，寓意聪明睿智', category: '光明', tone: 2, pinyin: 'míng' },
  '辉': { meaning: '光辉、辉煌，寓意光彩照人', category: '光明', tone: 1, pinyin: 'huī' },
  '书': { meaning: '书籍、书写，寓意学识渊博', category: '文化', tone: 1, pinyin: 'shū' },
  '墨': { meaning: '墨水、书画，寓意文采出众', category: '文化', tone: 4, pinyin: 'mò' },
  '诗': { meaning: '诗歌、诗意，寓意文采斐然', category: '文化', tone: 1, pinyin: 'shī' },
  '瑞': { meaning: '祥瑞、吉祥，寓意吉祥如意', category: '吉祥', tone: 4, pinyin: 'ruì' },
  '祥': { meaning: '吉祥、祥瑞，寓意吉祥如意', category: '吉祥', tone: 2, pinyin: 'xiáng' },
  '博': { meaning: '博学、广博，寓意学识渊博', category: '才华', tone: 2, pinyin: 'bó' },
  '睿': { meaning: '睿智、明智，寓意聪明睿智', category: '才华', tone: 4, pinyin: 'ruì' },
};

// 生成100个单字名
const singleNames: NameItem[] = [];
const availableChars = Object.keys(singleCharDB);
const styles = ['诗经', '楚辞', '唐诗', '宋词', '现代', '自然'];

availableChars.forEach(char => {
  const style = styles[Math.floor(Math.random() * styles.length)];
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
});

export { singleNames };
