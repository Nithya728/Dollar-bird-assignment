
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: Date;
  tags?: string[];
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  date: Date;

}