import { NameItem } from './names';

// 每个字的详细寓意库
const charMeanings: { [key: string]: { meaning: string; category: string; tone: number } } = {
  // 时间类
  '辰': { meaning: '星辰、时光，寓意如星辰般璀璨，把握美好时光', category: '时间', tone: 2 },
  '昕': { meaning: '黎明、日出，寓意充满希望，朝气蓬勃', category: '时间', tone: 1 },
  '晓': { meaning: '清晨、明白，寓意聪慧明理，如晨光般清新', category: '时间', tone: 3 },
  '曦': { meaning: '晨光、阳光，寓意温暖光明，前程似锦', category: '时间', tone: 1 },
  
  // 水相关
  '沐': { meaning: '沐浴、润泽，寓意受恩泽滋养，心灵纯净', category: '水', tone: 4 },
  '汐': { meaning: '潮汐、晚潮，寓意有规律、有节奏，温婉动人', category: '水', tone: 1 },
  '溪': { meaning: '溪流、小河，寓意清澈纯净，源远流长', category: '水', tone: 1 },
  '清': { meaning: '清澈、纯净，寓意品性高洁，心思澄明', category: '水', tone: 1 },
  '涵': { meaning: '包容、涵养，寓意有内涵，心胸宽广', category: '水', tone: 2 },
  '泽': { meaning: '恩泽、光泽，寓意仁慈博爱，光彩照人', category: '水', tone: 2 },
  
  // 玉石类
  '玥': { meaning: '神珠、明珠，寓意珍贵美好，光彩夺目', category: '玉石', tone: 4 },
  '瑾': { meaning: '美玉、美德，寓意品德高尚，如玉般温润', category: '玉石', tone: 3 },
  '瑜': { meaning: '美玉、优点，寓意完美无瑕，才华出众', category: '玉石', tone: 2 },
  '琛': { meaning: '珍宝、宝物，寓意珍贵稀有，价值连城', category: '玉石', tone: 1 },
  
  // 植物类
  '苒': { meaning: '草木茂盛，寓意生机勃勃，岁月静好', category: '植物', tone: 3 },
  '桐': { meaning: '梧桐树，寓意高洁品格，凤凰来仪', category: '植物', tone: 2 },
  '枫': { meaning: '枫树、红叶，寓意热情浪漫，成熟稳重', category: '植物', tone: 1 },
  '松': { meaning: '松树，寓意坚韧不拔，品格高洁', category: '植物', tone: 1 },
  '柏': { meaning: '柏树，寓意正直坚强，长青不老', category: '植物', tone: 3 },
  '竹': { meaning: '竹子，寓意虚心有节，君子之风', category: '植物', tone: 2 },
  '梅': { meaning: '梅花，寓意傲雪凌霜，坚强不屈', category: '植物', tone: 2 },
  '兰': { meaning: '兰花，寓意幽雅高洁，清香自持', category: '植物', tone: 2 },
  
  // 天象类
  '景': { meaning: '景色、景象，寓意前程美好，光彩夺目', category: '天象', tone: 3 },
  '星': { meaning: '星辰、星光，寓意闪耀独特，前途光明', category: '天象', tone: 1 },
  '云': { meaning: '云彩、飘逸，寓意自由自在，志向高远', category: '天象', tone: 2 },
  '霞': { meaning: '彩霞、晚霞，寓意绚烂多彩，美好灿烂', category: '天象', tone: 2 },
  '露': { meaning: '露水、甘露，寓意清新纯洁，恩泽滋养', category: '天象', tone: 4 },
  '霜': { meaning: '霜雪、纯洁，寓意高洁清冷，坚韧不屈', category: '天象', tone: 1 },
  
  // 品德类
  '怀': { meaning: '怀抱、怀念，寓意心胸宽广，有情有义', category: '品德', tone: 2 },
  '嘉': { meaning: '美好、赞许，寓意优秀出众，值得赞美', category: '品德', tone: 1 },
  '懿': { meaning: '美好、德行，寓意品德完美，温文尔雅', category: '品德', tone: 4 },
  '修': { meaning: '修养、修行，寓意修身养性，追求完美', category: '品德', tone: 1 },
  '宁': { meaning: '安宁、平静，寓意心境平和，生活安稳', category: '品德', tone: 2 },
  '安': { meaning: '平安、安定，寓意一生平安，幸福美满', category: '品德', tone: 1 },
  
  // 动作类
  '行': { meaning: '行走、品行，寓意行动力强，品行端正', category: '动作', tone: 2 },
  '越': { meaning: '超越、跨越，寓意不断进取，超越自我', category: '动作', tone: 4 },
  '翔': { meaning: '飞翔、翱翔，寓意志向高远，自由不羁', category: '动作', tone: 2 },
  '游': { meaning: '游历、游泳，寓意见多识广，自由自在', category: '动作', tone: 2 },
  '思': { meaning: '思考、思念，寓意聪慧善思，重情重义', category: '动作', tone: 1 },
  '语': { meaning: '言语、说话，寓意善于表达，口才出众', category: '动作', tone: 3 },
  '言': { meaning: '言语、言论，寓意言而有信，出口成章', category: '动作', tone: 2 },
  
  // 鸟类
  '鸿': { meaning: '大雁、宏大，寓意志向远大，前程似锦', category: '鸟类', tone: 2 },
  '鹤': { meaning: '仙鹤、长寿，寓意高洁长寿，仙风道骨', category: '鸟类', tone: 4 },
  '鹏': { meaning: '大鹏、前程，寓意鹏程万里，志向高远', category: '鸟类', tone: 2 },
  '鸾': { meaning: '鸾鸟、神鸟，寓意吉祥如意，高贵典雅', category: '鸟类', tone: 2 },
  
  // 建筑/空间
  '宇': { meaning: '宇宙、空间，寓意胸怀广阔，气度不凡', category: '空间', tone: 3 },
  '轩': { meaning: '轩窗、高大，寓意气度不凡，前程远大', category: '空间', tone: 1 },
  '阁': { meaning: '楼阁、藏书，寓意学识渊博，高雅脱俗', category: '空间', tone: 2 },
  '庭': { meaning: '庭院、家庭，寓意家庭和睦，生活美满', category: '空间', tone: 2 },
  
  // 美好品质
  '婉': { meaning: '温婉、柔顺，寓意温柔贤淑，举止优雅', category: '品质', tone: 3 },
  '柔': { meaning: '柔和、温柔，寓意温柔体贴，善解人意', category: '品质', tone: 2 },
  '雅': { meaning: '优雅、高雅，寓意举止优雅，品味高尚', category: '品质', tone: 3 },
  '静': { meaning: '安静、宁静，寓意心境平和，温柔娴静', category: '品质', tone: 4 },
  
  // 自然
  '初': { meaning: '开始、最初，寓意不忘初心，始终如一', category: '自然', tone: 1 },
  '夏': { meaning: '夏天、华夏，寓意热情奔放，生机勃勃', category: '自然', tone: 4 },
  '秋': { meaning: '秋天、收获，寓意成熟稳重，硕果累累', category: '自然', tone: 1 },
  '悠': { meaning: '悠然、长远，寓意悠然自得，生活惬意', category: '自然', tone: 1 },
  
  // 雨相关
  '雨': { meaning: '雨水、恩泽，寓意滋润万物，温柔细腻', category: '雨', tone: 3 },
  '晴': { meaning: '晴天、晴朗，寓意阳光开朗，积极向上', category: '雨', tone: 2 },
  '霖': { meaning: '甘霖、连雨，寓意恩泽深厚，福气绵长', category: '雨', tone: 2 },
  '霏': { meaning: '雨雪纷飞，寓意温柔细腻，如诗如画', category: '雨', tone: 1 },
  
  // 山岳
  '峻': { meaning: '高峻、严厉，寓意高大挺拔，严于律己', category: '山岳', tone: 4 },
  '峰': { meaning: '山峰、顶峰，寓意勇攀高峰，成就卓越', category: '山岳', tone: 1 },
  '岳': { meaning: '山岳、岳父，寓意稳重可靠，高大威猛', category: '山岳', tone: 4 },
  '岭': { meaning: '山岭、山脉，寓意稳重踏实，气宇轩昂', category: '山岳', tone: 3 },
  
  // 光明
  '明': { meaning: '明亮、智慧，寓意聪明睿智，光明磊落', category: '光明', tone: 2 },
  '辉': { meaning: '光辉、辉煌，寓意光彩照人，前程辉煌', category: '光明', tone: 1 },
  '耀': { meaning: '照耀、显耀，寓意光芒四射，才华出众', category: '光明', tone: 4 },
  '映': { meaning: '映照、反映，寓意光彩照人，真诚坦率', category: '光明', tone: 4 },
  
  // 其他
  '书': { meaning: '书籍、书写，寓意学识渊博，文采斐然', category: '文化', tone: 1 },
  '墨': { meaning: '墨水、书画，寓意文采出众，才华横溢', category: '文化', tone: 4 },
  '画': { meaning: '绘画、图画，寓意富有艺术气质，美感出众', category: '文化', tone: 4 },
  '琴': { meaning: '琴瑟、音乐，寓意才艺出众，优雅知性', category: '文化', tone: 2 },
  '棋': { meaning: '棋艺、智慧，寓意聪明睿智，善于谋略', category: '文化', tone: 2 },
  '诗': { meaning: '诗歌、诗意，寓意文采斐然，浪漫多情', category: '文化', tone: 1 },
  '礼': { meaning: '礼仪、礼貌，寓意知书达理，举止得体', category: '文化', tone: 3 },
  '乐': { meaning: '快乐、音乐，寓意乐观开朗，生活幸福', category: '文化', tone: 4 },
  '舒': { meaning: '舒适、舒展，寓意舒适安逸，舒心自在', category: '文化', tone: 1 },
  '哲': { meaning: '哲理、智慧，寓意聪明智慧，富有哲理', category: '文化', tone: 2 },
  '华': { meaning: '华美、光彩，寓意容光焕发，才华横溢', category: '文化', tone: 2 }
};

// 精选的20个高品质双字名
const curatedDoubleNames: NameItem[] = [
  { name: "沐辰", pinyin: "mù chén", meaning: "如沐星辰之光，心怀广阔宇宙，寓意前程似锦，气度不凡。", source: "现代意境", style: "现代", tone: [4, 2] },
  { name: "望舒", pinyin: "wàng shū", meaning: "取自月神之名，如月光般高洁明亮，寓意温柔智慧，清辉普照。", source: "《楚辞·离骚》", style: "楚辞", tone: [4, 1] },
  { name: "呦呦", pinyin: "yōu yōu", meaning: "鹿鸣之声，悠扬动听，寓意生命力旺盛，性格开朗阳光。", source: "《诗经·小雅》", style: "诗经", tone: [1, 1] },
  { name: "思齐", pinyin: "sī qí", meaning: "见贤思齐焉，见不贤而内自省也，寓意见贤思齐，追求卓越。", source: "《诗经·大雅》", style: "诗经", tone: [1, 2] },
  { name: "怀瑾", pinyin: "huái jǐn", meaning: "怀揣美玉，怀抱美德，寓意品德高尚，内心纯洁如玉。", source: "《楚辞·九章》", style: "楚辞", tone: [2, 3] },
  { name: "景行", pinyin: "jǐng xíng", meaning: "高山仰止，景行行止，寓意德行高尚，令人敬仰。", source: "《诗经·小雅》", style: "诗经", tone: [3, 2] },
  { name: "清越", pinyin: "qīng yuè", meaning: "声音清脆悠扬，超越凡俗，寓意才华出众，气质高雅。", source: "自然意象", style: "自然", tone: [1, 4] },
  { name: "星阑", pinyin: "xīng lán", meaning: "夜色深沉，星光灿烂，寓意深邃迷人，光彩照人。", source: "唐诗意境", style: "唐诗", tone: [1, 2] },
  { name: "晓岚", pinyin: "xiǎo lán", meaning: "清晨山间雾气，缥缈如梦，寓意清新脱俗，灵动优雅。", source: "宋词意境", style: "宋词", tone: [3, 2] },
  { name: "逸然", pinyin: "yì rán", meaning: "安逸自然，超然物外，寓意生活从容，性情洒脱。", source: "现代意境", style: "现代", tone: [4, 2] },
  { name: "峻峰", pinyin: "jùn fēng", meaning: "高峻山峰，巍峨挺拔，寓意意志坚定，成就卓越。", source: "山水意境", style: "自然", tone: [4, 1] },
  { name: "语冰", pinyin: "yǔ bīng", meaning: "夏虫不可语冰，寓意见识广博，思想深刻，卓尔不群。", source: "《庄子》", style: "宋词", tone: [3, 1] },
  { name: "令仪", pinyin: "lìng yí", meaning: "仪态端庄优美，令人生敬，寓意举止大方，气质高贵。", source: "《诗经·大雅》", style: "诗经", tone: [4, 2] },
  { name: "海晏", pinyin: "hǎi yàn", meaning: "沧海平静，河清海晏，寓意天下太平，生活安稳顺遂。", source: "唐诗意境", style: "唐诗", tone: [3, 4] },
  { name: "予安", pinyin: "yǔ ān", meaning: "给予安宁，平安喜乐，寓意一生顺遂，内心宁静。", source: "现代意境", style: "现代", tone: [3, 1] },
  { name: "锦书", pinyin: "jǐn shū", meaning: "华美的书信，云中谁寄锦书来，寓意才华横溢，情意绵长。", source: "《一剪梅》", style: "宋词", tone: [3, 1] },
  { name: "云舒", pinyin: "yún shū", meaning: "去留无意，漫随天外云卷云舒，寓意心境豁达，从容自在。", source: "《幽窗小记》", style: "现代", tone: [2, 1] },
  { name: "知秋", pinyin: "zhī qiū", meaning: "一叶知秋，见微知著，寓意洞察敏锐，聪慧过人。", source: "《淮南子》", style: "现代", tone: [1, 1] },
  { name: "明哲", pinyin: "míng zhé", meaning: "明智睿哲，洞察世事，寓意聪明智慧，明辨是非。", source: "《诗经》", style: "诗经", tone: [2, 2] },
  { name: "若华", pinyin: "ruò huá", meaning: "若木之花，光彩照人，寓意容貌华美，生命璀璨。", source: "《楚辞·天问》", style: "楚辞", tone: [4, 2] }
];

// 生成名字的辅助函数
function generateMeaning(char1: string, char2: string, style: string): string {
  const info1 = charMeanings[char1];
  const info2 = charMeanings[char2];
  
  if (!info1 || !info2) {
    return `${char1}${char2}相映成趣，寓意美好吉祥，前程似锦。`;
  }
  
  const templates = [
    `${info1.meaning}；${info2.meaning}。两字相配，${style}气韵浓厚。`,
    `取"${char1}"之${info1.meaning.split('，')[0]}，配"${char2}"之${info2.meaning.split('，')[0]}，寓意${style}意境深远。`,
    `${char1}${char2}合璧，${info1.meaning.split('，')[0]}，${info2.meaning.split('，')[0]}，${style}风雅自成。`,
    `"${char1}"者，${info1.meaning.split('，')[0]}；"${char2}"者，${info2.meaning.split('，')[0]}。合而为名，${style}意蕴悠长。`,
    `${char1}${char2}相生，${info1.meaning}；${info2.meaning}。整体寓意${style}之美。`,
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generatePinyin(char: string): string {
  const pinyinMap: { [key: string]: string } = {
    '辰': 'chén', '沐': 'mù', '昕': 'xīn', '宁': 'níng', '安': 'ān', 
    '玥': 'yuè', '汐': 'xī', '苒': 'rǎn', '清': 'qīng', '越': 'yuè',
    '景': 'jǐng', '行': 'xíng', '怀': 'huái', '瑾': 'jǐn', '雨': 'yǔ', 
    '晴': 'qíng', '松': 'sōng', '柏': 'bǎi', '鸿': 'hóng', '宇': 'yǔ', 
    '嘉': 'jiā', '树': 'shù', '婉': 'wǎn', '溪': 'xī', '初': 'chū', '夏': 'xià',
    '语': 'yǔ', '悠': 'yōu', '桐': 'tóng', '枫': 'fēng', '竹': 'zhú',
    '梅': 'méi', '兰': 'lán', '云': 'yún', '霞': 'xiá', '露': 'lù',
    '霜': 'shuāng', '懿': 'yì', '修': 'xiū', '翔': 'xiáng', '游': 'yóu',
    '思': 'sī', '言': 'yán', '鹤': 'hè', '鹏': 'péng', '鸾': 'luán',
    '轩': 'xuān', '阁': 'gé', '庭': 'tíng', '柔': 'róu', '雅': 'yǎ',
    '静': 'jìng', '秋': 'qiū', '霖': 'lín', '霏': 'fēi', '岳': 'yuè',
    '岭': 'lǐng', '明': 'míng', '辉': 'huī', '耀': 'yào', '映': 'yìng',
    '书': 'shū', '墨': 'mò', '画': 'huà', '琴': 'qín', '棋': 'qí',
    '诗': 'shī', '礼': 'lǐ', '乐': 'lè', '曦': 'xī', '涵': 'hán',
    '泽': 'zé', '瑜': 'yú', '琛': 'chēn', '舒': 'shū',
    '哲': 'zhé', '华': 'huá'
  };
  return pinyinMap[char] || char;
}

function getTone(char: string): number {
  return charMeanings[char]?.tone || (Math.random() > 0.5 ? 1 : 2);
}

// 可用的汉字池
const availableChars = Object.keys(charMeanings);

// 生成名字
let doubleNames: NameItem[] = [...curatedDoubleNames];
const targetCount = 1000;
const styles = ['诗经', '楚辞', '唐诗', '宋词', '现代', '自然'];

while (doubleNames.length < targetCount) {
  const char1 = availableChars[Math.floor(Math.random() * availableChars.length)];
  const char2 = availableChars[Math.floor(Math.random() * availableChars.length)];
  
  if (char1 === char2) continue;
  
  const name = char1 + char2;
  
  // 检查是否已存在
  if (doubleNames.some(item => item.name === name)) continue;
  
  const style = styles[Math.floor(Math.random() * styles.length)];
  const meaning = generateMeaning(char1, char2, style);
  
  doubleNames.push({
    name,
    pinyin: `${generatePinyin(char1)} ${generatePinyin(char2)}`,
    meaning,
    source: style === '诗经' ? '《诗经》意境' : 
            style === '楚辞' ? '《楚辞》意境' :
            style === '唐诗' ? '唐诗意境' :
            style === '宋词' ? '宋词意境' :
            style === '自然' ? '山水意境' : '现代意境',
    style: style as any,
    tone: [getTone(char1), getTone(char2)]
  });
}

export { doubleNames };
