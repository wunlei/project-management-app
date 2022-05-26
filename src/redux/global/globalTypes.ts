export type Language = 'en' | 'ru';
export type alertType = 'success' | 'error' | 'warning';
export interface IAlertState {
  alertMessage: string;
  alertType: alertType;
}

export interface GlobalSlice {
  userId: string | null;
  token: string | null;
  language: Language;
  alertState: IAlertState | null;
}
