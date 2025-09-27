import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Post } from '../models/post.model';
import { PostCard } from '../post-card/post-card';
import { PostService } from '../post-service';



@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule,FormsModule,PostCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    
    this.posts = this.postService.getPosts();
    this.filteredPosts = this.posts;
    this.isLoading = false;
  }

  searchPosts(): void {
    if (this.searchQuery.trim()) {
      this.filteredPosts = this.postService.searchPosts(this.searchQuery);
    } else {
      this.filteredPosts = this.posts;
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredPosts = this.posts;
  }

  get totalPosts(): number {
    return this.posts.length;
  }

  get showingPosts(): number {
    return this.filteredPosts.length;
  }
}