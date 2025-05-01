import { ItemObject } from 'src/types/global';
import { Keyword } from 'src/types/keyword';

export const extractItemListIds = (itemList: ItemObject[]) => {
  return itemList.map((item) => item.id);
};

export const extractKeywordListIds = (
  keywordList: {
    keyword: Keyword;
    value?: number;
  }[],
) => {
  return keywordList.map(({ keyword, value }) => ({
    keywordId: keyword.id,
    value,
  }));
};
