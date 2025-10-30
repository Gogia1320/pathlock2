export interface Project {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  userId: number;
  tasks?: TaskItem[]; // Optional, will be populated in ProjectDetails
}

export interface TaskItem {
  id: number;
  title: string;
  dueDate: string;
  isCompleted: boolean;
  projectId: number;
}
