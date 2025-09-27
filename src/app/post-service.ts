import { Injectable } from '@angular/core';
import { Post } from './models/post.model';
import { Comment } from './models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
private posts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with Angular',
    content: `Angular is a platform for building mobile and desktop web applications. It's a complete rewrite of AngularJS and is built on TypeScript. Angular provides a robust framework for building scalable web applications with a component-based architecture.

Key Features:
- Component-based architecture
- Dependency injection
- TypeScript support
- RxJS for reactive programming
- Powerful CLI tools

In this tutorial, we'll explore the fundamentals of Angular and build our first application.`,
    author: 'John Doe',
    date: new Date('2023-01-15'),
    tags: ['Angular', 'TypeScript', 'Beginner']
  },
  {
    id: 2,
    title: 'Understanding Angular Components',
    content: `Components are the fundamental building blocks of Angular applications. They control a patch of screen called a view and consist of:
- A TypeScript class (component class)
- An HTML template
- Optional CSS styles

Each component defines a class that contains application data and logic, and is associated with an HTML template that defines a view to be displayed in a target environment.

@Component({
  selector: 'app-example',
  template: '<h1>Hello World</h1>'
})
export class ExampleComponent {}`,
    author: 'Jane Smith',
    date: new Date('2023-02-20'),
    tags: ['Components', 'Angular', 'Advanced']
  },
  {
    id: 3,
    title: 'Angular Services and Dependency Injection',
    content: `Services in Angular are used to share data and functionality across components. They are singleton objects that get instantiated only once during the lifetime of an application.

Dependency Injection (DI) is a design pattern in which a class requests dependencies from external sources rather than creating them itself.

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData() {
    return ['data1', 'data2', 'data3'];
  }
}

Services are essential for:
- Sharing data between components
- API communication
- Business logic encapsulation
- State management`,
    author: 'Mike Johnson',
    date: new Date('2023-03-10'),
    tags: ['Services', 'Dependency Injection', 'Intermediate']
  },
  {
    id: 4,
    title: 'Angular Routing and Navigation',
    content: `Angular Router enables navigation from one view to the next as users perform application tasks. It allows you to define navigation paths and associate components with those paths.

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];

Key features include:
- Route parameters
- Child routes
- Route guards
- Lazy loading
- Route resolvers`,
    author: 'Sarah Wilson',
    date: new Date('2023-04-05'),
    tags: ['Routing', 'Navigation', 'SPA']
  },
  {
    id: 5,
    title: 'Angular Forms: Template-driven vs Reactive',
    content: `Angular provides two approaches for handling user input through forms: template-driven and reactive forms.

Template-driven forms:
- Simple to implement
- Suitable for simple scenarios
- Two-way data binding with [(ngModel)]

Reactive forms:
- More powerful and scalable
- Immutable data flow
- Explicit form control management
- Better testability

Choose based on your application's complexity and requirements.`,
    author: 'David Brown',
    date: new Date('2023-05-12'),
    tags: ['Forms', 'Validation', 'Reactive']
  }
];

  private comments: Comment[] = [
    {
      id: 1,
      postId: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      body: 'Great introduction to Angular! Very helpful for beginners starting their web development journey.',
      date: new Date('2023-01-16')
    },
    {
      id: 2,
      postId: 1,
      name: 'Bob Smith',
      email: 'bob@example.com',
      body: 'I wish there was more detail about component lifecycle hooks. Otherwise, excellent tutorial!',
      date: new Date('2023-01-17')
    },
    {
      id: 3,
      postId: 2,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      body: 'The component explanation was crystal clear. Thanks for the detailed examples!',
      date: new Date('2023-02-21')
    },
    {
      id: 4,
      postId: 3,
      name: 'Diana Prince',
      email: 'diana@example.com',
      body: 'Services and DI were always confusing to me until I read this article. Well explained!',
      date: new Date('2023-03-15')
    }
  ];

  constructor() { }

  getPosts(): Post[] {
    return this.posts.slice(); 
  }

  getPostById(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  addPost(post: Omit<Post, 'id' | 'date'>): Post {
  const newPost: Post = {
    ...post,
    id: this.generateId(),
    date: new Date()
  };
  this.posts.unshift(newPost);
  return newPost;
}

  getCommentsByPostId(postId: number): Comment[] {
    return this.comments.filter(comment => comment.postId === postId)
                       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  addComment(comment: Omit<Comment, 'id' | 'date'>): Comment {
    const newComment: Comment = {
      ...comment,
      id: this.generateCommentId(),
      date: new Date()
    };
    this.comments.push(newComment);
    return newComment;
  }

  searchPosts(query: string): Post[] {
    if (!query.trim()) {
      return this.posts;
    }
    const searchTerm = query.toLowerCase();
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.author.toLowerCase().includes(searchTerm) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  private generateId(): number {
    return this.posts.length > 0 ? Math.max(...this.posts.map(p => p.id)) + 1 : 1;
  }

  private generateCommentId(): number {
    return this.comments.length > 0 ? Math.max(...this.comments.map(c => c.id)) + 1 : 1;
  }
}
