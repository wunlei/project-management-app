export type UserFromServer = { id: string; name: string; login: string };
export type UserFromClient = { name: string; login: string; password: string };

export type FileInfo = {
  filename: string;
  fileSize: number;
};

export type SignInResult = { token: string };
export type SignInArg = { body: { login: string; password: string } };

export type SignUpResult = UserFromServer;
export type SignUpArg = { body: UserFromClient };

export type GetAllUsersResult = Array<UserFromServer>;
export type GetAllUsersArg = void;

export type GetUserResult = UserFromServer;
export type GetUserArg = { userId?: string };

export type DeleteUserResult = void;
export type DeleteUserArg = { userId?: string };

export type UpdateUserResult = UserFromServer;
export type UpdateUserArg = { userId?: string; body: UserFromClient };

export type GetAllBoardsResult = Array<{ id: string; title: string }>;
export type GetAllBoardsArg = void;

export type GetBoardResult = {
  id: string;
  title: string;
  columns: Array<{
    id: string;
    title: string;
    order: number;
    tasks: Array<{
      id: string;
      title: string;
      order: number;
      description: string;
      userId: string;
      files: Array<FileInfo>;
    }>;
  }>;
};
export type GetBoardArg = { boardId: string };

export type CreateBoardResult = { id: string; title: string };
export type CreateBoardArg = { body: { title: string } };

export type DeleteBoardResult = void;
export type DeleteBoardArg = { boardId: string };

export type UpdateBoardResult = { id: string; title: string };
export type UpdateBoardArg = { boardId: string; body: { title: string } };

export type GetAllColumnsResult = Array<{
  id: string;
  title: string;
  order: number;
}>;
export type GetAllColumnsArg = { boardId: string };

export type GetColumnResult = {
  id: string;
  title: string;
  order: number;
  tasks: Array<{
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string;
    files: Array<FileInfo>;
  }>;
};
export type GetColumnArg = { boardId: string; columnId: string };

export type CreateColumnResult = {
  id: string;
  title: string;
  order: number;
};
export type CreateColumnArg = {
  boardId: string;
  body: { title: string; order: number };
};

export type DeleteColumnResult = void;
export type DeleteColumnArg = { boardId: string; columnId: string };

export type UpdateColumnResult = {
  id: string;
  title: string;
  order: number;
};
export type UpdateColumnArg = {
  boardId: string;
  columnId: string;
  body: { title: string; order: number };
};

export type GetAllTasksResult = Array<{
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: Array<FileInfo>;
}>;
export type GetAllTasksArg = {
  boardId: string;
  columnId: string;
};

export type GetTaskResult = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: Array<FileInfo>;
};
export type GetTaskArg = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export type CreateTaskResult = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};
export type CreateTaskArg = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
    description: string;
    userId?: string;
  };
};

export type DeleteTaskResult = void;
export type DeleteTaskArg = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export type UpdateTaskResult = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};
export type UpdateTaskArg = {
  boardId: string;
  columnId: string;
  taskId: string;
  body: {
    title: string;
    order: number;
    description: string;
    userId?: string;
    boardId: string;
    columnId: string;
  };
};
