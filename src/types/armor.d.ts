import { Keyword } from './keyword';
import { Picture } from './picture';

interface Armor {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  description: string;
  stats: ArmorStats;
  price: number;
  equipped: boolean;
  keywords: { keywordId: number; value?: number }[];
}

interface ArmorWithKeywords {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  description: string;
  stats: ArmorStats;
  price: number;
  equipped: boolean;
  keywords: { keyword: Keyword; value?: number }[];
}

interface ArmorStats {
  armor?: number;
  ward?: number;
  currentBlock: number;
  block?: number;
  currentPower?: number;
  power?: number;
  weight?: number;
}
