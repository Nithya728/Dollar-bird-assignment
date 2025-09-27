import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostCard } from '../post-card/post-card';
import { Post } from '../models/post.model';
import { CategoryService } from '../category-service';
import { PostService } from '../post-service';

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterModule, PostCard],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {
 category: any;
  posts: Post[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      this.loadCategory(categoryId);
    });
  }

  loadCategory(categoryId: string | null): void {
    if (!categoryId) {
      this.isLoading = false;
      return;
    }

    this.category = this.categoryService.getCategoryById(categoryId);
    if (this.category) {
      const allPosts = this.postService.getPosts();
      this.posts = this.categoryService.getPostsByCategory(categoryId, allPosts);
    }
    this.isLoading = false;
  }
}