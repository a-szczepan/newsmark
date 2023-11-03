export type UserFormData = {
  email: string;
  password: string;
};

export type LoginRegisterResponse = {
  id: number;
  userId: number;
  userEmail: string;
  valid: true;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
};
