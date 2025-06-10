export interface Prompt {
  id: number;
  userId: number;
  categoryId: number;
  subCategoryId: number;
  prompt: string;
  response: string;
  createdAt: Date;
}
