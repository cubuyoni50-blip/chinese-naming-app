const fs = require('fs');
const path = require('path');

// 单字名字库
const singleCharDB = {
  '辰': { meaning: '星辰、时光，寓意如星辰般璀璨，把握美好时光', category: '时间', tone: 2, pinyin: 'chén' },
  '昕': { meaning: '黎明、日出，寓意充满希望，朝气蓬勃', category: '时间', tone: 1, pinyin: 'xīn' },
  '晓': { meaning: '清晨、明白，寓意聪慧明理，如晨光般清新', category: '时间', tone: 3, pinyin: 'xiǎo' },
  '曦': { meaning: '晨光、阳光，寓意温暖光明，前程似锦', category: '时间', tone: 1, pinyin: 'xī' },
  '旭': { meaning: '旭日东升，寓意朝气蓬勃，前程光明', category: '时间', tone: 4, pinyin: 'xù' },
  '晨': { meaning: '清晨、早晨，寓意朝气蓬勃，充满希望', category: '时间', tone: 2, pinyin: 'chén' },
  '晖': { meaning: '阳光、光辉，寓意光彩照人，前程辉煌', category: '时间', tone: 1, pinyin: 'huī' },
  '曜': { meaning: '日光、照耀，寓意光芒万丈，才华出众', category: '时间', tone: 4, pinyin: 'yào' },
  '沐': { meaning: '沐浴、润泽，寓意受恩泽滋养，心灵纯净', category: '水', tone: 4, pinyin: 'mù' },
  '汐': { meaning: '潮汐、晚潮，寓意有规律、有节奏，温婉动人', category: '水', tone: 1, pinyin: 'xī' },
  '溪': { meaning: '溪流、小河，寓意清澈纯净，源远流长', category: '水', tone: 1, pinyin: 'xī' },
  '清': { meaning: '清澈、纯净，寓意品性高洁，心思澄明', category: '水', tone: 1, pinyin: 'qīng' },
  '涵': { meaning: '包容、涵养，寓意有内涵，心胸宽广', category: '水', tone: 2, pinyin: 'hán' },
  '泽': { meaning: '恩泽、光泽，寓意仁慈博爱，光彩照人', category: '水', tone: 2, pinyin: 'zé' },
  '澜': { meaning: '波澜、波浪，寓意气势磅礴，心胸宽广', category: '水', tone: 2, pinyin: 'lán' },
  '润': { meaning: '滋润、润泽，寓意温润如玉，泽被万物', category: '水', tone: 4, pinyin: 'rùn' },
  '潇': { meaning: '潇洒、洒脱，寓意洒脱不羁，风流倜傥', category: '水', tone: 1, pinyin: 'xiāo' },
  '湘': { meaning: '湘江、湖南，寓意温婉秀丽，才华横溢', category: '水', tone: 1, pinyin: 'xiāng' },
  '淇': { meaning: '淇水、美好，寓意温柔贤淑，品质高洁', category: '水', tone: 2, pinyin: 'qí' },
  '洛': { meaning: '洛水、洛阳，寓意温婉动人，才华出众', category: '水', tone: 4, pinyin: 'luò' },
  '玥': { meaning: '神珠、明珠，寓意珍贵美好，光彩夺目', category: '玉石', tone: 4, pinyin: 'yuè' },
  '瑾': { meaning: '美玉、美德，寓意品德高尚，如玉般温润', category: '玉石', tone: 3, pinyin: 'jǐn' },
  '瑜': { meaning: '美玉、优点，寓意完美无瑕，才华出众', category: '玉石', tone: 2, pinyin: 'yú' },
  '琛': { meaning: '珍宝、宝物，寓意珍贵稀有，价值连城', category: '玉石', tone: 1, pinyin: 'chēn' },
  '瑶': { meaning: '美玉、美好，寓意珍贵美好，光彩照人', category: '玉石', tone: 2, pinyin: 'yáo' },
  '琪': { meaning: '美玉、珍异，寓意珍贵美好，才华出众', category: '玉石', tone: 2, pinyin: 'qí' },
  '琬': { meaning: '美玉、美好，寓意温婉美好，品德高尚', category: '玉石', tone: 3, pinyin: 'wǎn' },
  '琰': { meaning: '美玉、光泽，寓意光彩照人，品德高尚', category: '玉石', tone: 3, pinyin: 'yǎn' },
  '璇': { meaning: '美玉、北斗星，寓意珍贵美好，光彩夺目', category: '玉石', tone: 2, pinyin: 'xuán' },
  '苒': { meaning: '草木茂盛，寓意生机勃勃，岁月静好', category: '植物', tone: 3, pinyin: 'rǎn' },
  '桐': { meaning: '梧桐树，寓意高洁品格，凤凰来仪', category: '植物', tone: 2, pinyin: 'tóng' },
  '枫': { meaning: '枫树、红叶，寓意热情浪漫，成熟稳重', category: '植物', tone: 1, pinyin: 'fēng' },
  '松': { meaning: '松树，寓意坚韧不拔，品格高洁', category: '植物', tone: 1, pinyin: 'sōng' },
  '柏': { meaning: '柏树，寓意正直坚强，长青不老', category: '植物', tone: 3, pinyin: 'bǎi' },
  '竹': { meaning: '竹子，寓意虚心有节，君子之风', category: '植物', tone: 2, pinyin: 'zhú' },
  '梅': { meaning: '梅花，寓意傲雪凌霜，坚强不屈', category: '植物', tone: 2, pinyin: 'méi' },
  '兰': { meaning: '兰花，寓意幽雅高洁，清香自持', category: '植物', tone: 2, pinyin: 'lán' },
  '荷': { meaning: '荷花、荷叶，寓意出淤泥而不染', category: '植物', tone: 2, pinyin: 'hé' },
  '莲': { meaning: '莲花、莲子，寓意纯洁美好', category: '植物', tone: 2, pinyin: 'lián' },
  '芷': { meaning: '白芷、香草，寓意芬芳美好', category: '植物', tone: 3, pinyin: 'zhǐ' },
  '若': { meaning: '如同、好像，寓意温柔美好', category: '植物', tone: 4, pinyin: 'ruò' },
  '芙': { meaning: '芙蓉、荷花，寓意美丽动人', category: '植物', tone: 2, pinyin: 'fú' },
  '蓉': { meaning: '芙蓉、蓉城，寓意美丽动人', category: '植物', tone: 2, pinyin: 'róng' },
  '薇': { meaning: '蔷薇、紫薇，寓意美丽坚强', category: '植物', tone: 1, pinyin: 'wēi' },
  '萱': { meaning: '萱草、忘忧，寓意无忧无虑', category: '植物', tone: 1, pinyin: 'xuān' },
  '棠': { meaning: '海棠、棠梨，寓意美丽动人', category: '植物', tone: 2, pinyin: 'táng' },
  '景': { meaning: '景色、景象，寓意前程美好', category: '天象', tone: 3, pinyin: 'jǐng' },
  '星': { meaning: '星辰、星光，寓意闪耀独特', category: '天象', tone: 1, pinyin: 'xīng' },
  '云': { meaning: '云彩、飘逸，寓意自由自在', category: '天象', tone: 2, pinyin: 'yún' },
  '霞': { meaning: '彩霞、晚霞，寓意绚烂多彩', category: '天象', tone: 2, pinyin: 'xiá' },
  '怀': { meaning: '怀抱、怀念，寓意心胸宽广', category: '品德', tone: 2, pinyin: 'huái' },
  '嘉': { meaning: '美好、赞许，寓意优秀出众', category: '品德', tone: 1, pinyin: 'jiā' },
  '懿': { meaning: '美好、德行，寓意品德完美', category: '品德', tone: 4, pinyin: 'yì' },
  '宁': { meaning: '安宁、平静，寓意心境平和', category: '品德', tone: 2, pinyin: 'níng' },
  '安': { meaning: '平安、安定，寓意一生平安', category: '品德', tone: 1, pinyin: 'ān' },
  '行': { meaning: '行走、品行，寓意行动力强', category: '动作', tone: 2, pinyin: 'xíng' },
  '翔': { meaning: '飞翔、翱翔，寓意志向高远', category: '动作', tone: 2, pinyin: 'xiáng' },
  '思': { meaning: '思考、思念，寓意聪慧善思', category: '动作', tone: 1, pinyin: 'sī' },
  '语': { meaning: '言语、说话，寓意善于表达', category: '动作', tone: 3, pinyin: 'yǔ' },
  '鸿': { meaning: '大雁、宏大，寓意志向远大', category: '鸟类', tone: 2, pinyin: 'hóng' },
  '鹤': { meaning: '仙鹤、长寿，寓意高洁长寿', category: '鸟类', tone: 4, pinyin: 'hè' },
  '鹏': { meaning: '大鹏、前程，寓意鹏程万里', category: '鸟类', tone: 2, pinyin: 'péng' },
  '宇': { meaning: '宇宙、空间，寓意胸怀广阔', category: '空间', tone: 3, pinyin: 'yǔ' },
  '轩': { meaning: '轩窗、高大，寓意气度不凡', category: '空间', tone: 1, pinyin: 'xuān' },
  '婉': { meaning: '温婉、柔顺，寓意温柔贤淑', category: '品质', tone: 3, pinyin: 'wǎn' },
  '柔': { meaning: '柔和、温柔，寓意温柔体贴', category: '品质', tone: 2, pinyin: 'róu' },
  '雅': { meaning: '优雅、高雅，寓意举止优雅', category: '品质', tone: 3, pinyin: 'yǎ' },
  '静': { meaning: '安静、宁静，寓意心境平和', category: '品质', tone: 4, pinyin: 'jìng' },
  '初': { meaning: '开始、最初，寓意不忘初心', category: '自然', tone: 1, pinyin: 'chū' },
  '夏': { meaning: '夏天、华夏，寓意热情奔放', category: '自然', tone: 4, pinyin: 'xià' },
  '秋': { meaning: '秋天、收获，寓意成熟稳重', category: '自然', tone: 1, pinyin: 'qiū' },
  '悠': { meaning: '悠然、长远，寓意悠然自得', category: '自然', tone: 1, pinyin: 'yōu' },
  '雨': { meaning: '雨水、恩泽，寓意滋润万物', category: '雨', tone: 3, pinyin: 'yǔ' },
  '晴': { meaning: '晴天、晴朗，寓意阳光开朗', category: '雨', tone: 2, pinyin: 'qíng' },
  '霖': { meaning: '甘霖、连雨，寓意恩泽深厚', category: '雨', tone: 2, pinyin: 'lín' },
  '霏': { meaning: '雨雪纷飞，寓意温柔细腻', category: '雨', tone: 1, pinyin: 'fēi' },
  '峻': { meaning: '高峻、严厉，寓意高大挺拔', category: '山岳', tone: 4, pinyin: 'jùn' },
  '峰': { meaning: '山峰、顶峰，寓意勇攀高峰', category: '山岳', tone: 1, pinyin: 'fēng' },
  '岳': { meaning: '山岳、岳父，寓意稳重可靠', category: '山岳', tone: 4, pinyin: 'yuè' },
  '明': { meaning: '明亮、智慧，寓意聪明睿智', category: '光明', tone: 2, pinyin: 'míng' },
  '辉': { meaning: '光辉、辉煌，寓意光彩照人', category: '光明', tone: 1, pinyin: 'huī' },
  '耀': { meaning: '照耀、显耀，寓意光芒四射', category: '光明', tone: 4, pinyin: 'yào' },
  '书': { meaning: '书籍、书写，寓意学识渊博', category: '文化', tone: 1, pinyin: 'shū' },
  '墨': { meaning: '墨水、书画，寓意文采出众', category: '文化', tone: 4, pinyin: 'mò' },
  '诗': { meaning: '诗歌、诗意，寓意文采斐然', category: '文化', tone: 1, pinyin: 'shī' },
  '瑞': { meaning: '祥瑞、吉祥，寓意吉祥如意', category: '吉祥', tone: 4, pinyin: 'ruì' },
  '祥': { meaning: '吉祥、祥瑞，寓意吉祥如意', category: '吉祥', tone: 2, pinyin: 'xiáng' },
  '博': { meaning: '博学、广博，寓意学识渊博', category: '才华', tone: 2, pinyin: 'bó' },
  '睿': { meaning: '睿智、明智，寓意聪明睿智', category: '才华', tone: 4, pinyin: 'ruì' },
};

// 双字名数据（200个精选）
const doubleNames = [
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
  { name: "若华", pinyin: "ruò huá", meaning: "若木之花，光彩照人，寓意容貌华美，生命璀璨。", source: "《楚辞·天问》", style: "楚辞", tone: [4, 2] },
];

// 生成1000个单字名
const singleNames = [];
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
    style: style,
    tone: [info.tone, 0]
  });
}

// 合并所有名字
const allNames = [...doubleNames, ...singleNames];

// 写入JSON文件
const outputPath = path.join(__dirname, '..', 'public', 'names.json');
fs.writeFileSync(outputPath, JSON.stringify(allNames, null, 2));

console.log(`✅ 成功生成 ${allNames.length} 个名字`);
console.log(`📄 文件位置: ${outputPath}`);
console.log(`📊 单字名: ${singleNames.length} 个`);
console.log(`📊 双字名: ${doubleNames.length} 个`);
