import { IEmoji } from '@interfaces/emoji';

export interface ISearchEmoji {
  page?: number;
  limit?: number;
}

export interface IEmojiIndex {
  animal: IEmoji[];
  body: IEmoji[];
  face: IEmoji[];
  people: IEmoji[];
  symbol: IEmoji[];
}
