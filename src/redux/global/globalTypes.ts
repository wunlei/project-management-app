export type Language = 'en' | 'ru';

export interface GlobalSlice {
  userId: string | null;
  language: Language;
}
