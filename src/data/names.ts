import { singleNames } from './singleNames';
import { doubleNames } from './doubleNames';

export interface NameItem {
  name: string;
  pinyin: string;
  meaning: string;
  source: string;
  style: '诗经' | '楚辞' | '唐诗' | '宋词' | '现代' | '自然';
  tone: number[];
}

// 合并单字名和双字名（使用全部数据）
export const names: NameItem[] = [...singleNames, ...doubleNames];

// 导出统计信息
console.log(`已加载 ${names.length} 个名字（单字名：${singleNames.length} 个，双字名：${doubleNames.length} 个）`);
