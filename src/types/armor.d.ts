import { Keyword } from './keyword';
import { Picture } from './picture';

interface Armor {
  id: number;
  name: string;
  picture: Picture;
  description: string;
  stats: ArmorStats;
  price: number;
  keywords: { keywordId: number; value?: number }[];
}

interface ArmorWithKeywords {
  id: number;
  name: string;
  picture: Picture;
  description: string;
  stats: ArmorStats;
  price: number;
  keywords: { keyword: Keyword; value?: number }[];
}

interface ArmorStats {
  armor?: number;
  ward?: number;
  block?: number;
  power?: number;
  weight?: number;
}
