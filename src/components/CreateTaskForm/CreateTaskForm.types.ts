import { UserFromServer } from 'redux/api/apiTypes';

export interface CreateTaskFormValues {
  name: string;
  description: string;
  picture: FileList;
  member: UserFromServer;
}
