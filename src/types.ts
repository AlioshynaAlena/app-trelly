
export type Task = {
  id: string;
  type: string;
  attributes: TaskAttributes;
};

export type Meta = {
  page: number;
  pageSize: number;
  totalCount: number;
  pagesCount: number;
};

export type ApiResponse = {
  data: Task[];
  meta: Meta;
};



export type TaskAttributes = {
  title: string;
  boardId: string;
  status: number;
  priority: number;
  addedAt: string;
  attachmentsCount: number;
  // Новые поля
  description?: Record<string, any>;
  boardTitle?: string;
  order?: number;
  startDate?: Record<string, any> | null;
  deadline?: Record<string, any> | null;
  updatedAt?: string;
  attachments?: string[];
};

// Новый тип для детального ответа с одной задачей
export type TaskDetailResponse = {
  data: {
    id: string;
    type: "tasks";
    attributes: TaskAttributes;
  };
};
