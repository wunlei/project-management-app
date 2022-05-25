export type UserFromServer = { id: string; name: string; login: string };
export type UserFromClient = { name: string; login: string; password: string };

export type FileInfo = {
  filename: string;
  fileSize: number;
};

export type TaskFromServer = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: Array<FileInfo>;
};
export type TaskFromServerExpanded = TaskFromServer & {
  boardId: string;
  columnId: string;
};
export type TaskFromClient = {
  title: string;
  order?: number;
  done?: boolean;
  description: string;
  userId?: string;
};
export type TaskFromClientExpanded = TaskFromClient & {
  boardId: string;
  columnId: string;
};

export type ColumnFromServer = {
  id: string;
  title: string;
  order: number;
};
export type ColumnFromServerExpended = ColumnFromServer & {
  tasks: Array<TaskFromServer>;
};
export type ColumnFromClient = { title: string; order: number };

export type BoardFromServer = { id: string; title: string };
export type BoardFromServerExpanded = BoardFromServer & {
  columns: Array<ColumnFromServerExpended>;
};

// Sign -----

export type SignInResult = { token: string; id: string };
export type SignInArg = { body: { login: string; password: string } };

export type SignUpResult = UserFromServer;
export type SignUpArg = { body: UserFromClient };

// Users -----

export type GetAllUsersResult = Array<UserFromServer>;
export type GetAllUsersArg = void;

export type GetUserResult = UserFromServer;
export type GetUserArg = { userId?: string };

export type DeleteUserResult = void;
export type DeleteUserArg = { userId?: string };

export type UpdateUserResult = UserFromServer;
export type UpdateUserArg = { userId?: string; body: UserFromClient };

// Boards -----

export type GetAllBoardsResult = Array<BoardFromServer>;
export type GetAllBoardsArg = void;

export type GetBoardResult = BoardFromServerExpanded;
export type GetBoardArg = { boardId: string };

export type CreateBoardResult = BoardFromServer;
export type CreateBoardArg = { body: { title: string } };

export type DeleteBoardResult = void;
export type DeleteBoardArg = { boardId: string };

export type UpdateBoardResult = BoardFromServer;
export type UpdateBoardArg = { boardId: string; body: { title: string } };

// Columns -----

export type GetAllColumnsResult = Array<ColumnFromServer>;
export type GetAllColumnsArg = { boardId: string };

export type GetColumnResult = ColumnFromServerExpended;
export type GetColumnArg = { boardId: string; columnId: string };

export type CreateColumnResult = ColumnFromServer;
export type CreateColumnArg = {
  boardId: string;
  body: ColumnFromClient;
};

export type DeleteColumnResult = void;
export type DeleteColumnArg = { boardId: string; columnId: string };

export type UpdateColumnResult = ColumnFromServer;
export type UpdateColumnArg = {
  boardId: string;
  columnId: string;
  body: ColumnFromClient;
};

// Tasks -----

export type GetAllTasksResult = Array<TaskFromServerExpanded>;
export type GetAllTasksArg = {
  boardId: string;
  columnId: string;
};

export type GetTaskResult = TaskFromServerExpanded;
export type GetTaskArg = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export type CreateTaskResult = TaskFromServerExpanded;
export type CreateTaskArg = {
  boardId: string;
  columnId: string;
  body: TaskFromClient;
};

export type DeleteTaskResult = void;
export type DeleteTaskArg = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export type UpdateTaskResult = TaskFromServerExpanded;
export type UpdateTaskArg = {
  boardId: string;
  columnId: string;
  taskId: string;
  body: TaskFromClientExpanded;
};

// File -----

export type UploadFileResult = void;
export type UploadFileArg = {
  taskId: string;
  file: File;
};
