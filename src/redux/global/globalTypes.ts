export type Language = 'en' | 'ru';
export type alertType = 'success' | 'error' | 'warning';

export interface GlobalSlice {
  userId: string | null;
  token: string | null;
  language: Language;
  isAlerts: boolean;
  alertMessage: string;
  alertType: alertType;
}
