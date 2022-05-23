import { UserFromServer } from 'redux/api/apiTypes';

export interface CreateTaskFormValues {
  title: string;
  description: string;
  picture: FileList;
  member: UserFromServer;
}
