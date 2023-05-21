export interface IPost {
  id: number;
  title: string;
  summary: string;
  image: string;
  User: IUser;
  content: string;
  createdAt: string;
}

export interface IUser {
  id?: string;
  username?: string;
  email?: string;
}
