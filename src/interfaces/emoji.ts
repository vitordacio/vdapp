import { IEmojiType } from './types';

export interface IEmoji {
  id_emoji: string;
  value: string;
  shorthand: string;
  order: number;
  type_id: string;
  type: IEmojiType;
}
