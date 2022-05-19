export interface EditProfile {
  name: string;
  login: string;
  password: string;
}

export interface AlertState {
  color: 'error' | 'success';
  message: string;
}
