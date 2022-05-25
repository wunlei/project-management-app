export type Language = 'en' | 'ru';

export interface GlobalSlice {
  userId: string | null;
  token: string | null;
  language: Language;
}
