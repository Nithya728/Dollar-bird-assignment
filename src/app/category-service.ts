import { Injectable } from '@angular/core';
import { Post } from './models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories = [
    {
      id: 'web-development',
      name: 'Web Development',
      description: 'Complete guide to modern web development practices and technologies',
      icon: '🌐',
      color: '#667eea',
      posts: [1, 2, 5] 
    },
    {
      id: 'angular',
      name: 'Angular',
      description: 'Everything about Angular framework - from basics to advanced topics',
      icon: '🅰️',
      color: '#dd0031',
      posts: [1, 2, 3, 4, 5]
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'Master JavaScript fundamentals and advanced concepts',
      icon: '💛',
      color: '#f7df1e',
      posts: [1, 3]
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      description: 'Type-safe JavaScript development with TypeScript',
      icon: '🔷',
      color: '#3178c6',
      posts: [1, 2, 3]
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      description: 'UI/UX design, responsive design, and frontend best practices',
      icon: '🎨',
      color: '#61dafb',
      posts: [2, 5]
    },
    {
      id: 'backend',
      name: 'Backend Development',
      description: 'Server-side programming, APIs, and database management',
      icon: '⚙️',
      color: '#339933',
      posts: [3, 4]
    }
  ];

  getCategories() {
    return this.categories;
  }

  getCategoryById(id: string) {
    return this.categories.find(cat => cat.id === id);
  }

  getPostsByCategory(categoryId: string, allPosts: Post[]): Post[] {
    const category = this.getCategoryById(categoryId);
    if (!category) return [];
    
    return allPosts.filter(post => category.posts.includes(post.id));
  }
}