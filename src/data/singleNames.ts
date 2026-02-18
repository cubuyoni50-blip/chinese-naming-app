import { NameItem } from './names';

// 单字名详细库 - 扩展版
const singleCharDB: { [key: string]: { meaning: string; category: string; tone: number; pinyin: string } } = {
  // 时间类
  '辰': { meaning: '星辰、时光，寓意如星辰般璀璨，把握美好时光', category: '时间', tone: 2, pinyin: 'chén' },
  '昕': { meaning: '黎明、日出，寓意充满希望，朝气蓬勃', category: '时间', tone: 1, pinyin: 'xīn' },
  '晓': { meaning: '清晨、明白，寓意聪慧明理，如晨光般清新', category: '时间', tone: 3, pinyin: 'xiǎo' },
  '曦': { meaning: '晨光、阳光，寓意温暖光明，前程似锦', category: '时间', tone: 1, pinyin: 'xī' },
  '旭': { meaning: '旭日东升，寓意朝气蓬勃，前程光明', category: '时间', tone: 4, pinyin: 'xù' },
  '晨': { meaning: '清晨、早晨，寓意朝气蓬勃，充满希望', category: '时间', tone: 2, pinyin: 'chén' },
  '晖': { meaning: '阳光、光辉，寓意光彩照人，前程辉煌', category: '时间', tone: 1, pinyin: 'huī' },
  '曜': { meaning: '日光、照耀，寓意光芒万丈，才华出众', category: '时间', tone: 4, pinyin: 'yào' },
  
  // 水相关
  '沐': { meaning: '沐浴、润泽，寓意受恩泽滋养，心灵纯净', category: '水', tone: 4, pinyin: 'mù' },
  '汐': { meaning: '潮汐、晚潮，寓意有规律、有节奏，温婉动人', category: '水', tone: 1, pinyin: 'xī' },
  '溪': { meaning: '溪流、小河，寓意清澈纯净，源远流长', category: '水', tone: 1, pinyin: 'xī' },
  '清': { meaning: '清澈、纯净，寓意品性高洁，心思澄明', category: '水', tone: 1, pinyin: 'qīng' },
  '涵': { meaning: '包容、涵养，寓意有内涵，心胸宽广', category: '水', tone: 2, pinyin: 'hán' },
  '泽': { meaning: '恩泽、光泽，寓意仁慈博爱，光彩照人', category: '水', tone: 2, pinyin: 'zé' },
  '澜': { meaning: '波澜、波浪，寓意气势磅礴，心胸宽广', category: '水', tone: 2, pinyin: 'lán' },
  '润': { meaning: '滋润、润泽，寓意温润如玉，泽被万物', category: '水', tone: 4, pinyin: 'rùn' },
  '潇': { meaning: '潇洒、潇洒，寓意洒脱不羁，风流倜傥', category: '水', tone: 1, pinyin: 'xiāo' },
  '湘': { meaning: '湘江、湖南，寓意温婉秀丽，才华横溢', category: '水', tone: 1, pinyin: 'xiāng' },
  '淇': { meaning: '淇水、美好，寓意温柔贤淑，品质高洁', category: '水', tone: 2, pinyin: 'qí' },
  '洛': { meaning: '洛水、洛阳，寓意温婉动人，才华出众', category: '水', tone: 4, pinyin: 'luò' },
  '沅': { meaning: '沅水、沅江，寓意源远流长，生生不息', category: '水', tone: 2, pinyin: 'yuán' },
  '澄': { meaning: '澄澈、清明，寓意心思澄明，品性高洁', category: '水', tone: 2, pinyin: 'chéng' },
  
  // 玉石类
  '玥': { meaning: '神珠、明珠，寓意珍贵美好，光彩夺目', category: '玉石', tone: 4, pinyin: 'yuè' },
  '瑾': { meaning: '美玉、美德，寓意品德高尚，如玉般温润', category: '玉石', tone: 3, pinyin: 'jǐn' },
  '瑜': { meaning: '美玉、优点，寓意完美无瑕，才华出众', category: '玉石', tone: 2, pinyin: 'yú' },
  '琛': { meaning: '珍宝、宝物，寓意珍贵稀有，价值连城', category: '玉石', tone: 1, pinyin: 'chēn' },
  '瑶': { meaning: '美玉、美好，寓意珍贵美好，光彩照人', category: '玉石', tone: 2, pinyin: 'yáo' },
  '琪': { meaning: '美玉、珍异，寓意珍贵美好，才华出众', category: '玉石', tone: 2, pinyin: 'qí' },
  '琬': { meaning: '美玉、美好，寓意温婉美好，品德高尚', category: '玉石', tone: 3, pinyin: 'wǎn' },
  '琰': { meaning: '美玉、光泽，寓意光彩照人，品德高尚', category: '玉石', tone: 3, pinyin: 'yǎn' },
  '璇': { meaning: '美玉、北斗星，寓意珍贵美好，光彩夺目', category: '玉石', tone: 2, pinyin: 'xuán' },
  '璜': { meaning: '美玉、半璧，寓意珍贵美好，品德高尚', category: '玉石', tone: 2, pinyin: 'huáng' },
  
  // 植物类
  '苒': { meaning: '草木茂盛，寓意生机勃勃，岁月静好', category: '植物', tone: 3, pinyin: 'rǎn' },
  '桐': { meaning: '梧桐树，寓意高洁品格，凤凰来仪', category: '植物', tone: 2, pinyin: 'tóng' },
  '枫': { meaning: '枫树、红叶，寓意热情浪漫，成熟稳重', category: '植物', tone: 1, pinyin: 'fēng' },
  '松': { meaning: '松树，寓意坚韧不拔，品格高洁', category: '植物', tone: 1, pinyin: 'sōng' },
  '柏': { meaning: '柏树，寓意正直坚强，长青不老', category: '植物', tone: 3, pinyin: 'bǎi' },
  '竹': { meaning: '竹子，寓意虚心有节，君子之风', category: '植物', tone: 2, pinyin: 'zhú' },
  '梅': { meaning: '梅花，寓意傲雪凌霜，坚强不屈', category: '植物', tone: 2, pinyin: 'méi' },
  '兰': { meaning: '兰花，寓意幽雅高洁，清香自持', category: '植物', tone: 2, pinyin: 'lán' },
  '荷': { meaning: '荷花、荷叶，寓意出淤泥而不染，品格高洁', category: '植物', tone: 2, pinyin: 'hé' },
  '莲': { meaning: '莲花、莲子，寓意纯洁美好，连生贵子', category: '植物', tone: 2, pinyin: 'lián' },
  '芷': { meaning: '白芷、香草，寓意芬芳美好，品德高洁', category: '植物', tone: 3, pinyin: 'zhǐ' },
  '若': { meaning: '如同、好像，寓意温柔美好，如诗如画', category: '植物', tone: 4, pinyin: 'ruò' },
  '芙': { meaning: '芙蓉、荷花，寓意美丽动人，纯洁高贵', category: '植物', tone: 2, pinyin: 'fú' },
  '蓉': { meaning: '芙蓉、蓉城，寓意美丽动人，温婉可人', category: '植物', tone: 2, pinyin: 'róng' },
  '薇': { meaning: '蔷薇、紫薇，寓意美丽坚强，朝气蓬勃', category: '植物', tone: 1, pinyin: 'wēi' },
  '萱': { meaning: '萱草、忘忧，寓意无忧无虑，快乐幸福', category: '植物', tone: 1, pinyin: 'xuān' },
  '棠': { meaning: '海棠、棠梨，寓意美丽动人，温柔贤淑', category: '植物', tone: 2, pinyin: 'táng' },
  '梨': { meaning: '梨花、梨树，寓意纯洁美好，清新脱俗', category: '植物', tone: 2, pinyin: 'lí' },
  '杏': { meaning: '杏花、杏林，寓意春意盎然，生机勃勃', category: '植物', tone: 4, pinyin: 'xìng' },
  '桃': { meaning: '桃花、桃树，寓意美好幸福，春意盎然', category: '植物', tone: 2, pinyin: 'táo' },
  '樱': { meaning: '樱花、樱桃，寓意美丽动人，纯洁浪漫', category: '植物', tone: 1, pinyin: 'yīng' },
  
  // 天象类
  '景': { meaning: '景色、景象，寓意前程美好，光彩夺目', category: '天象', tone: 3, pinyin: 'jǐng' },
  '星': { meaning: '星辰、星光，寓意闪耀独特，前途光明', category: '天象', tone: 1, pinyin: 'xīng' },
  '云': { meaning: '云彩、飘逸，寓意自由自在，志向高远', category: '天象', tone: 2, pinyin: 'yún' },
  '霞': { meaning: '彩霞、晚霞，寓意绚烂多彩，美好灿烂', category: '天象', tone: 2, pinyin: 'xiá' },
  '露': { meaning: '露水、甘露，寓意清新纯洁，恩泽滋养', category: '天象', tone: 4, pinyin: 'lù' },
  '霜': { meaning: '霜雪、纯洁，寓意高洁清冷，坚韧不屈', category: '天象', tone: 1, pinyin: 'shuāng' },
  '雪': { meaning: '雪花、雪白，寓意纯洁无瑕，清新脱俗', category: '天象', tone: 3, pinyin: 'xuě' },
  '冰': { meaning: '冰雪、晶莹，寓意纯洁透明，晶莹剔透', category: '天象', tone: 1, pinyin: 'bīng' },
  '虹': { meaning: '彩虹、虹桥，寓意美好希望，连接梦想', category: '天象', tone: 2, pinyin: 'hóng' },
  '霓': { meaning: '霓虹、虹霓，寓意绚烂多彩，光彩照人', category: '天象', tone: 2, pinyin: 'ní' },
  
  // 品德类
  '怀': { meaning: '怀抱、怀念，寓意心胸宽广，有情有义', category: '品德', tone: 2, pinyin: 'huái' },
  '嘉': { meaning: '美好、赞许，寓意优秀出众，值得赞美', category: '品德', tone: 1, pinyin: 'jiā' },
  '懿': { meaning: '美好、德行，寓意品德完美，温文尔雅', category: '品德', tone: 4, pinyin: 'yì' },
  '修': { meaning: '修养、修行，寓意修身养性，追求完美', category: '品德', tone: 1, pinyin: 'xiū' },
  '宁': { meaning: '安宁、平静，寓意心境平和，生活安稳', category: '品德', tone: 2, pinyin: 'níng' },
  '安': { meaning: '平安、安定，寓意一生平安，幸福美满', category: '品德', tone: 1, pinyin: 'ān' },
  '和': { meaning: '和谐、温和，寓意温和善良，平易近人', category: '品德', tone: 2, pinyin: 'hé' },
  '谦': { meaning: '谦虚、谦和，寓意谦虚谨慎，不骄不躁', category: '品德', tone: 1, pinyin: 'qiān' },
  '谨': { meaning: '谨慎、严谨，寓意严谨认真，一丝不苟', category: '品德', tone: 3, pinyin: 'jǐn' },
  '诚': { meaning: '诚实、真诚，寓意诚实守信，真诚待人', category: '品德', tone: 2, pinyin: 'chéng' },
  '信': { meaning: '信任、信用，寓意言而有信，值得信赖', category: '品德', tone: 4, pinyin: 'xìn' },
  '善': { meaning: '善良、美好，寓意心地善良，品德高尚', category: '品德', tone: 4, pinyin: 'shàn' },
  '良': { meaning: '善良、良好，寓意心地善良，品德优良', category: '品德', tone: 2, pinyin: 'liáng' },
  '贤': { meaning: '贤德、贤能，寓意德才兼备，才华出众', category: '品德', tone: 2, pinyin: 'xián' },
  '德': { meaning: '品德、道德，寓意品德高尚，德行兼备', category: '品德', tone: 2, pinyin: 'dé' },
  '仁': { meaning: '仁爱、仁慈，寓意仁爱宽厚，心地善良', category: '品德', tone: 2, pinyin: 'rén' },
  '义': { meaning: '正义、道义，寓意正直正义，重情重义', category: '品德', tone: 4, pinyin: 'yì' },
  '礼': { meaning: '礼仪、礼貌，寓意知书达理，举止得体', category: '品德', tone: 3, pinyin: 'lǐ' },
  '智': { meaning: '智慧、聪明，寓意聪明智慧，才智过人', category: '品德', tone: 4, pinyin: 'zhì' },
  '慧': { meaning: '智慧、聪慧，寓意聪慧过人，智慧超群', category: '品德', tone: 4, pinyin: 'huì' },
  
  // 动作类
  '行': { meaning: '行走、品行，寓意行动力强，品行端正', category: '动作', tone: 2, pinyin: 'xíng' },
  '越': { meaning: '超越、跨越，寓意不断进取，超越自我', category: '动作', tone: 4, pinyin: 'yuè' },
  '翔': { meaning: '飞翔、翱翔，寓意志向高远，自由不羁', category: '动作', tone: 2, pinyin: 'xiáng' },
  '游': { meaning: '游历、游泳，寓意见多识广，自由自在', category: '动作', tone: 2, pinyin: 'yóu' },
  '思': { meaning: '思考、思念，寓意聪慧善思，重情重义', category: '动作', tone: 1, pinyin: 'sī' },
  '语': { meaning: '言语、说话，寓意善于表达，口才出众', category: '动作', tone: 3, pinyin: 'yǔ' },
  '言': { meaning: '言语、言论，寓意言而有信，出口成章', category: '动作', tone: 2, pinyin: 'yán' },
  '飞': { meaning: '飞翔、飞扬，寓意志向高远，鹏程万里', category: '动作', tone: 1, pinyin: 'fēi' },
  '舞': { meaning: '舞蹈、飞舞，寓意优美动人，才艺出众', category: '动作', tone: 3, pinyin: 'wǔ' },
  '歌': { meaning: '歌唱、歌曲，寓意乐观开朗，才华横溢', category: '动作', tone: 1, pinyin: 'gē' },
  '啸': { meaning: '呼啸、长啸，寓意豪迈奔放，气势磅礴', category: '动作', tone: 4, pinyin: 'xiào' },
  
  // 鸟类
  '鸿': { meaning: '大雁、宏大，寓意志向远大，前程似锦', category: '鸟类', tone: 2, pinyin: 'hóng' },
  '鹤': { meaning: '仙鹤、长寿，寓意高洁长寿，仙风道骨', category: '鸟类', tone: 4, pinyin: 'hè' },
  '鹏': { meaning: '大鹏、前程，寓意鹏程万里，志向高远', category: '鸟类', tone: 2, pinyin: 'péng' },
  '鸾': { meaning: '鸾鸟、神鸟，寓意吉祥如意，高贵典雅', category: '鸟类', tone: 2, pinyin: 'luán' },
  '凤': { meaning: '凤凰、祥瑞，寓意吉祥如意，高贵典雅', category: '鸟类', tone: 4, pinyin: 'fèng' },
  '凰': { meaning: '凤凰、雌凤，寓意美丽高贵，吉祥如意', category: '鸟类', tone: 2, pinyin: 'huáng' },
  '莺': { meaning: '黄莺、鸣禽，寓意声音动听，活泼可爱', category: '鸟类', tone: 1, pinyin: 'yīng' },
  '燕': { meaning: '燕子、飞燕，寓意灵巧敏捷，春意盎然', category: '鸟类', tone: 4, pinyin: 'yàn' },
  '雁': { meaning: '大雁、鸿雁，寓意志向远大，忠诚守信', category: '鸟类', tone: 4, pinyin: 'yàn' },
  
  // 建筑/空间
  '宇': { meaning: '宇宙、空间，寓意胸怀广阔，气度不凡', category: '空间', tone: 3, pinyin: 'yǔ' },
  '轩': { meaning: '轩窗、高大，寓意气度不凡，前程远大', category: '空间', tone: 1, pinyin: 'xuān' },
  '阁': { meaning: '楼阁、藏书，寓意学识渊博，高雅脱俗', category: '空间', tone: 2, pinyin: 'gé' },
  '庭': { meaning: '庭院、家庭，寓意家庭和睦，生活美满', category: '空间', tone: 2, pinyin: 'tíng' },
  '府': { meaning: '府邸、官府，寓意尊贵显赫，才华出众', category: '空间', tone: 3, pinyin: 'fǔ' },
  '苑': { meaning: '园林、苑囿，寓意环境优美，才华出众', category: '空间', tone: 4, pinyin: 'yuàn' },
  '榭': { meaning: '亭榭、楼阁，寓意高雅脱俗，才华横溢', category: '空间', tone: 4, pinyin: 'xiè' },
  
  // 美好品质
  '婉': { meaning: '温婉、柔顺，寓意温柔贤淑，举止优雅', category: '品质', tone: 3, pinyin: 'wǎn' },
  '柔': { meaning: '柔和、温柔，寓意温柔体贴，善解人意', category: '品质', tone: 2, pinyin: 'róu' },
  '雅': { meaning: '优雅、高雅，寓意举止优雅，品味高尚', category: '品质', tone: 3, pinyin: 'yǎ' },
  '静': { meaning: '安静、宁静，寓意心境平和，温柔娴静', category: '品质', tone: 4, pinyin: 'jìng' },
  '淑': { meaning: '淑女、善良，寓意温柔贤淑，品德高尚', category: '品质', tone: 1, pinyin: 'shū' },
  '娴': { meaning: '娴静、娴熟，寓意温婉娴静，才艺出众', category: '品质', tone: 2, pinyin: 'xián' },
  '曼': { meaning: '曼妙、柔美，寓意身姿曼妙，温柔美丽', category: '品质', tone: 4, pinyin: 'màn' },
  '丽': { meaning: '美丽、秀丽，寓意容貌美丽，气质出众', category: '品质', tone: 4, pinyin: 'lì' },
  '美': { meaning: '美好、美丽，寓意容貌美丽，品德美好', category: '品质', tone: 3, pinyin: 'měi' },
  '秀': { meaning: '秀丽、优秀，寓意容貌秀丽，才华出众', category: '品质', tone: 4, pinyin: 'xiù' },
  '颖': { meaning: '聪颖、脱颖而出，寓意聪明过人，才华出众', category: '品质', tone: 3, pinyin: 'yǐng' },
  '敏': { meaning: '敏捷、聪敏，寓意思维敏捷，反应迅速', category: '品质', tone: 3, pinyin: 'mǐn' },
  '捷': { meaning: '敏捷、快捷，寓意行动敏捷，才思敏捷', category: '品质', tone: 2, pinyin: 'jié' },
  
  // 自然
  '初': { meaning: '开始、最初，寓意不忘初心，始终如一', category: '自然', tone: 1, pinyin: 'chū' },
  '夏': { meaning: '夏天、华夏，寓意热情奔放，生机勃勃', category: '自然', tone: 4, pinyin: 'xià' },
  '秋': { meaning: '秋天、收获，寓意成熟稳重，硕果累累', category: '自然', tone: 1, pinyin: 'qiū' },
  '悠': { meaning: '悠然、长远，寓意悠然自得，生活惬意', category: '自然', tone: 1, pinyin: 'yōu' },
  '春': { meaning: '春天、春意，寓意生机勃勃，充满希望', category: '自然', tone: 1, pinyin: 'chūn' },
  '冬': { meaning: '冬天、寒冬，寓意坚韧不拔，历经考验', category: '自然', tone: 1, pinyin: 'dōng' },
  '岚': { meaning: '山岚、雾气，寓意清新脱俗，灵动优雅', category: '自然', tone: 2, pinyin: 'lán' },
  '岫': { meaning: '山洞、峰峦，寓意沉稳内敛，才德兼备', category: '自然', tone: 4, pinyin: 'xiù' },
  '岱': { meaning: '泰山、岱宗，寓意稳重可靠，德高望重', category: '自然', tone: 4, pinyin: 'dài' },
  '岳': { meaning: '山岳、岳父，寓意稳重可靠，高大威猛', category: '自然', tone: 4, pinyin: 'yuè' },
  '川': { meaning: '河流、山川，寓意胸怀广阔，气度不凡', category: '自然', tone: 1, pinyin: 'chuān' },
  '河': { meaning: '河流、黄河，寓意源远流长，生生不息', category: '自然', tone: 2, pinyin: 'hé' },
  '海': { meaning: '大海、海洋，寓意胸怀广阔，气度不凡', category: '自然', tone: 3, pinyin: 'hǎi' },
  '洋': { meaning: '海洋、广大，寓意胸怀广阔，气度不凡', category: '自然', tone: 2, pinyin: 'yáng' },
  
  // 雨相关
  '雨': { meaning: '雨水、恩泽，寓意滋润万物，温柔细腻', category: '雨', tone: 3, pinyin: 'yǔ' },
  '晴': { meaning: '晴天、晴朗，寓意阳光开朗，积极向上', category: '雨', tone: 2, pinyin: 'qíng' },
  '霖': { meaning: '甘霖、连雨，寓意恩泽深厚，福气绵长', category: '雨', tone: 2, pinyin: 'lín' },
  '霏': { meaning: '雨雪纷飞，寓意温柔细腻，如诗如画', category: '雨', tone: 1, pinyin: 'fēi' },
  '雯': { meaning: '云彩、云纹，寓意美丽动人，文采斐然', category: '雨', tone: 2, pinyin: 'wén' },
  
  // 山岳
  '峻': { meaning: '高峻、严厉，寓意高大挺拔，严于律己', category: '山岳', tone: 4, pinyin: 'jùn' },
  '峰': { meaning: '山峰、顶峰，寓意勇攀高峰，成就卓越', category: '山岳', tone: 1, pinyin: 'fēng' },
  '岭': { meaning: '山岭、山脉，寓意稳重踏实，气宇轩昂', category: '山岳', tone: 3, pinyin: 'lǐng' },
  '岩': { meaning: '岩石、山岩，寓意坚强不屈，意志坚定', category: '山岳', tone: 2, pinyin: 'yán' },
  '磊': { meaning: '磊落、光明，寓意光明磊落，胸怀坦荡', category: '山岳', tone: 3, pinyin: 'lěi' },
  
  // 光明
  '明': { meaning: '明亮、智慧，寓意聪明睿智，光明磊落', category: '光明', tone: 2, pinyin: 'míng' },
  '辉': { meaning: '光辉、辉煌，寓意光彩照人，前程辉煌', category: '光明', tone: 1, pinyin: 'huī' },
  '耀': { meaning: '照耀、显耀，寓意光芒四射，才华出众', category: '光明', tone: 4, pinyin: 'yào' },
  '映': { meaning: '映照、反映，寓意光彩照人，真诚坦率', category: '光明', tone: 4, pinyin: 'yìng' },
  '昭': { meaning: '昭示、明亮，寓意光明正大，昭示天下', category: '光明', tone: 1, pinyin: 'zhāo' },
  '朗': { meaning: '明朗、开朗，寓意性格开朗，前途光明', category: '光明', tone: 3, pinyin: 'lǎng' },
  
  // 文化
  '书': { meaning: '书籍、书写，寓意学识渊博，文采斐然', category: '文化', tone: 1, pinyin: 'shū' },
  '墨': { meaning: '墨水、书画，寓意文采出众，才华横溢', category: '文化', tone: 4, pinyin: 'mò' },
  '画': { meaning: '绘画、图画，寓意富有艺术气质，美感出众', category: '文化', tone: 4, pinyin: 'huà' },
  '琴': { meaning: '琴瑟、音乐，寓意才艺出众，优雅知性', category: '文化', tone: 2, pinyin: 'qín' },
  '棋': { meaning: '棋艺、智慧，寓意聪明睿智，善于谋略', category: '文化', tone: 2, pinyin: 'qí' },
  '诗': { meaning: '诗歌、诗意，寓意文采斐然，浪漫多情', category: '文化', tone: 1, pinyin: 'shī' },
  '乐': { meaning: '快乐、音乐，寓意乐观开朗，生活幸福', category: '文化', tone: 4, pinyin: 'lè' },
  '文': { meaning: '文化、文采，寓意文采斐然，学识渊博', category: '文化', tone: 2, pinyin: 'wén' },
  '采': { meaning: '文采、风采，寓意才华横溢，风采出众', category: '文化', tone: 3, pinyin: 'cǎi' },
  
  // 吉祥如意
  '瑞': { meaning: '祥瑞、吉祥，寓意吉祥如意，幸福安康', category: '吉祥', tone: 4, pinyin: 'ruì' },
  '祥': { meaning: '吉祥、祥瑞，寓意吉祥如意，幸福安康', category: '吉祥', tone: 2, pinyin: 'xiáng' },
  '祺': { meaning: '吉祥、福气，寓意吉祥如意，福气满满', category: '吉祥', tone: 2, pinyin: 'qí' },
  '禧': { meaning: '喜庆、幸福，寓意喜气洋洋，幸福美满', category: '吉祥', tone: 3, pinyin: 'xǐ' },
  '福': { meaning: '福气、幸福，寓意福气满满，幸福美满', category: '吉祥', tone: 2, pinyin: 'fú' },
  '康': { meaning: '健康、安康，寓意健康平安，幸福美满', category: '吉祥', tone: 1, pinyin: 'kāng' },
  '泰': { meaning: '平安、康泰，寓意平安康泰，顺遂如意', category: '吉祥', tone: 4, pinyin: 'tài' },
  '顺': { meaning: '顺利、顺心，寓意一帆风顺，事事顺心', category: '吉祥', tone: 4, pinyin: 'shùn' },
  '达': { meaning: '通达、发达，寓意通情达理，飞黄腾达', category: '吉祥', tone: 2, pinyin: 'dá' },
  '昌': { meaning: '昌盛、兴旺，寓意繁荣昌盛，兴旺发达', category: '吉祥', tone: 1, pinyin: 'chāng' },
  '盛': { meaning: '兴盛、繁盛，寓意繁荣兴盛，蒸蒸日上', category: '吉祥', tone: 4, pinyin: 'shèng' },
  '兴': { meaning: '兴盛、兴旺，寓意兴旺发达，蒸蒸日上', category: '吉祥', tone: 1, pinyin: 'xīng' },
  '旺': { meaning: '兴旺、旺盛，寓意兴旺发达，生机勃勃', category: '吉祥', tone: 4, pinyin: 'wàng' },
  '发': { meaning: '发展、发达，寓意蓬勃发展，前程似锦', category: '吉祥', tone: 1, pinyin: 'fā' },
  
  // 才华智慧
  '博': { meaning: '博学、广博，寓意学识渊博，见多识广', category: '才华', tone: 2, pinyin: 'bó' },
  '渊': { meaning: '深渊、渊博，寓意学识渊博，深不可测', category: '才华', tone: 1, pinyin: 'yuān' },
  '睿': { meaning: '睿智、明智，寓意聪明睿智，智慧超群', category: '才华', tone: 4, pinyin: 'ruì' },
  '哲': { meaning: '哲理、智慧，寓意聪明智慧，富有哲理', category: '才华', tone: 2, pinyin: 'zhé' },
  '才': { meaning: '才能、才华，寓意才华横溢，能力出众', category: '才华', tone: 2, pinyin: 'cái' },
  '俊': { meaning: '俊秀、英俊，寓意容貌俊秀，才华出众', category: '才华', tone: 4, pinyin: 'jùn' },
  '杰': { meaning: '杰出、杰作，寓意才华杰出，出类拔萃', category: '才华', tone: 2, pinyin: 'jié' },
  '英': { meaning: '英雄、精英，寓意英姿飒爽，出类拔萃', category: '才华', tone: 1, pinyin: 'yīng' },
  '豪': { meaning: '豪迈、豪杰，寓意豪迈奔放，英雄气概', category: '才华', tone: 2, pinyin: 'háo' },
  '逸': { meaning: '飘逸、安逸，寓意洒脱不羁，安逸自在', category: '才华', tone: 4, pinyin: 'yì' },
  '卓': { meaning: '卓越、卓然，寓意卓越不凡，出类拔萃', category: '才华', tone: 2, pinyin: 'zhuó' },
  '然': { meaning: '自然、安然，寓意自然洒脱，安然自得', category: '才华', tone: 2, pinyin: 'rán' },
  
  // 颜色
  '青': { meaning: '青色、青春，寓意青春常驻，生机勃勃', category: '颜色', tone: 1, pinyin: 'qīng' },
  '碧': { meaning: '碧绿、碧玉，寓意清新脱俗，晶莹剔透', category: '颜色', tone: 4, pinyin: 'bì' },
  '翠': { meaning: '翠绿、翡翠，寓意生机勃勃，清新脱俗', category: '颜色', tone: 4, pinyin: 'cuì' },
  '紫': { meaning: '紫色、紫气，寓意高贵典雅，紫气东来', category: '颜色', tone: 3, pinyin: 'zǐ' },
  '彤': { meaning: '红色、彤云，寓意红红火火，吉祥如意', category: '颜色', tone: 2, pinyin: 'tóng' },
  '丹': { meaning: '红色、丹心，寓意赤诚之心，忠心耿耿', category: '颜色', tone: 1, pinyin: 'dān' },
  '素': { meaning: '朴素、白色，寓意朴素淡雅，纯洁无瑕', category: '颜色', tone: 4, pinyin: 'sù' },
  '皓': { meaning: '洁白、明亮，寓意洁白无瑕，光明磊落', category: '颜色', tone: 4, pinyin: 'hào' },
  
  // 其他美好
  '怡': { meaning: '愉快、和悦，寓意心情愉悦，和颜悦色', category: '美好', tone: 2, pinyin: 'yí' },
  '悦': { meaning: '喜悦、愉快，寓意心情愉悦，快乐幸福', category: '美好', tone: 4, pinyin: 'yuè' },
  '欣': { meaning: '欣喜、欢欣，寓意欢欣鼓舞，心情愉悦', category: '美好', tone: 1, pinyin: 'xīn' },
  '欢': { meaning: '欢乐、欢快，寓意欢乐幸福，快乐无忧', category: '美好', tone: 1, pinyin: 'huān' },
  '畅': { meaning: '畅快、通达，寓意心情舒畅，一帆风顺', category: '美好', tone: 4, pinyin: 'chàng' },
  '舒': { meaning: '舒适、舒展，寓意舒适安逸，舒心自在', category: '美好', tone: 1, pinyin: 'shū' },
  '闲': { meaning: '闲适、悠闲', category: '美好', tone: 2, pinyin: 'xián' },
  '趣': { meaning: '趣味、情趣，寓意生活有趣，情趣盎然', category: '美好', tone: 4, pinyin: 'qù' },
  '韵': { meaning: '韵味、韵律，寓意韵味十足，文采斐然', category: '美好', tone: 4, pinyin: 'yùn' },
  '致': { meaning: '精致、情趣，寓意精致优雅，情趣高雅', category: '美好', tone: 4, pinyin: 'zhì' },
  '远': { meaning: '远大、深远，寓意志向远大，目光深远', category: '美好', tone: 3, pinyin: 'yuǎn' },
  '宏': { meaning: '宏大、宏伟，寓意胸怀广阔，气度不凡', category: '美好', tone: 2, pinyin: 'hóng' },
  '阔': { meaning: '广阔、开阔，寓意胸怀广阔，眼界开阔', category: '美好', tone: 4, pinyin: 'kuò' },
  '广': { meaning: '广大、广阔，寓意胸怀广阔，气度不凡', category: '美好', tone: 3, pinyin: 'guǎng' },
  '厚': { meaning: '厚重、厚道，寓意厚德载物，厚道待人', category: '美好', tone: 4, pinyin: 'hòu' },
  '淳': { meaning: '淳朴、淳厚，寓意淳朴善良，心地纯良', category: '美好', tone: 2, pinyin: 'chún' },
  '朴': { meaning: '朴素、朴实，寓意朴素无华，真诚待人', category: '美好', tone: 3, pinyin: 'pǔ' },
  '真': { meaning: '真诚、真实，寓意真诚待人，真实可信', category: '美好', tone: 1, pinyin: 'zhēn' },
  '纯': { meaning: '纯洁、纯粹，寓意纯洁无瑕，纯粹真挚', category: '美好', tone: 2, pinyin: 'chún' },
  '净': { meaning: '干净、纯净，寓意纯净无暇，心地纯净', category: '美好', tone: 4, pinyin: 'jìng' }
};

// 风格列表
const styles = ['诗经', '楚辞', '唐诗', '宋词', '现代', '自然'];

// 生成单字名的寓意描述
function generateSingleMeaning(char: string, style: string): string {
  const info = singleCharDB[char];
  if (!info) {
    return `取"${char}"字，寓意美好吉祥，${style}意境深远。`;
  }
  
  const templates = [
    `取"${char}"之${info.meaning.split('，')[0]}，寓意${style}意境，独特雅致。`,
    `"${char}"字${info.meaning}，${style}气韵浓厚，意蕴悠长。`,
    `${info.meaning.split('，')[0]}，${style}风格，寓意深远。`,
    `取"${char}"字，${info.meaning}，${style}意境，高雅脱俗。`,
    `"${char}"者，${info.meaning.split('，')[0]}，${style}风雅，自成一格。`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

// 生成1000个单字名
const singleNames: NameItem[] = [];
const availableChars = Object.keys(singleCharDB);

// 首先添加一些精选的高品质单字名
const curatedSingleNames = [
  { char: '墨', meaning: '取"墨"之墨水、书画，寓意文采出众，才华横溢，现代意境。', style: '现代', source: '书画意境' },
  { char: '轩', meaning: '"轩"字轩窗、高大，寓意气度不凡，前程远大，楚辞气韵浓厚。', style: '楚辞', source: '《楚辞》意境' },
  { char: '瑶', meaning: '"瑶"字美玉、美好，寓意珍贵美好，光彩照人，诗经意境深远。', style: '诗经', source: '《诗经》意境' },
  { char: '辰', meaning: '取"辰"之星辰、时光，寓意如星辰般璀璨，唐诗意境独特雅致。', style: '唐诗', source: '唐诗意境' },
  { char: '曦', meaning: '"曦"字晨光、阳光，寓意温暖光明，前程似锦，宋词气韵浓厚。', style: '宋词', source: '宋词意境' },
  { char: '岚', meaning: '"岚"字山岚、雾气，寓意清新脱俗，灵动优雅，自然意境深远。', style: '自然', source: '山水意境' },
  { char: '瑾', meaning: '取"瑾"之美玉、美德，寓意品德高尚，如玉般温润，诗经意境。', style: '诗经', source: '《诗经》意境' },
  { char: '逸', meaning: '"逸"字安逸、超脱，寓意安逸自在，超凡脱俗，现代意境。', style: '现代', source: '现代意境' },
  { char: '清', meaning: '"清"字清澈、纯净，寓意品性高洁，心思澄明，楚辞意境深远。', style: '楚辞', source: '《楚辞》意境' },
  { char: '玥', meaning: '"玥"字神珠、明珠，寓意珍贵美好，光彩夺目，诗经意境独特雅致。', style: '诗经', source: '《诗经》意境' },
  { char: '澜', meaning: '取"澜"之波澜、波浪，寓意气势磅礴，心胸宽广，唐诗意境。', style: '唐诗', source: '唐诗意境' },
  { char: '婉', meaning: '"婉"字温婉、柔顺，寓意温柔贤淑，举止优雅，宋词气韵浓厚。', style: '宋词', source: '宋词意境' },
  { char: '鹤', meaning: '"鹤"字仙鹤、长寿，寓意高洁长寿，仙风道骨，自然意境深远。', style: '自然', source: '山水意境' },
  { char: '睿', meaning: '取"睿"之睿智、明智，寓意聪明睿智，智慧超群，现代意境。', style: '现代', source: '现代意境' },
  { char: '澄', meaning: '"澄"字澄澈、清明，寓意心思澄明，品性高洁，楚辞意境深远。', style: '楚辞', source: '《楚辞》意境' },
  { char: '瑜', meaning: '"瑜"字美玉、优点，寓意完美无瑕，才华出众，诗经意境独特雅致。', style: '诗经', source: '《诗经》意境' },
  { char: '潇', meaning: '取"潇"之潇洒、潇洒，寓意洒脱不羁，风流倜傥，唐诗意境。', style: '唐诗', source: '唐诗意境' },
  { char: '颖', meaning: '"颖"字聪颖、脱颖而出，寓意聪明过人，才华出众，宋词气韵浓厚。', style: '宋词', source: '宋词意境' },
  { char: '鹏', meaning: '"鹏"字大鹏、前程，寓意鹏程万里，志向高远，自然意境深远。', style: '自然', source: '山水意境' },
  { char: '淳', meaning: '取"淳"之淳朴、淳厚，寓意淳朴善良，心地纯良，现代意境。', style: '现代', source: '现代意境' }
];

curatedSingleNames.forEach(item => {
  const info = singleCharDB[item.char];
  singleNames.push({
    name: item.char,
    pinyin: info?.pinyin || item.char,
    meaning: item.meaning,
    source: item.source,
    style: item.style as any,
    tone: [info?.tone || 1]
  });
});

// 生成剩余的单字名
while (singleNames.length < 1000) {
  const char = availableChars[Math.floor(Math.random() * availableChars.length)];
  
  // 检查是否已存在
  if (singleNames.some(item => item.name === char)) continue;
  
  const style = styles[Math.floor(Math.random() * styles.length)];
  const info = singleCharDB[char];
  const meaning = generateSingleMeaning(char, style);
  
  singleNames.push({
    name: char,
    pinyin: info?.pinyin || char,
    meaning,
    source: style === '诗经' ? '《诗经》意境' : 
            style === '楚辞' ? '《楚辞》意境' :
            style === '唐诗' ? '唐诗意境' :
            style === '宋词' ? '宋词意境' :
            style === '自然' ? '山水意境' : '现代意境',
    style: style as any,
    tone: [info?.tone || 1]
  });
}

export { singleNames };
