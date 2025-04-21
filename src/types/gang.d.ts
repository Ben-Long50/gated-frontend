import { Campaign } from './campaign';
import { Character } from './character';
import { Affiliation } from './faction';

interface Gang {
  id: number;
  name: string;
  level: number;
  characters: Character[];
  profits: number;
  campaign: Campaign;
  campaignId: number;
  affiliations: Affiliation[];
}
