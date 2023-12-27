export interface IEventType {
  id_event_type: string;
  name: string;
  free_access: boolean;
  count: number;
}
export interface IEmojiType {
  id_emoji_type: string;
  category: 'animal' | 'body' | 'face' | 'people' | 'symbol';
}
