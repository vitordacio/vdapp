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

export interface IAchievementType {
  id_achievement_type: string;
  type: 'user' | 'event';
  category: string;
  name: string;
  difficulty?: number;
  min_value?: number;
}
