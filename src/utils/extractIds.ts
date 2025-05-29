import { Action } from 'src/types/action';
import { Item } from 'src/types/item';
import { Keyword } from 'src/types/keyword';

export const extractItemListIds = (itemList: Item[] | Action[]) => {
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
