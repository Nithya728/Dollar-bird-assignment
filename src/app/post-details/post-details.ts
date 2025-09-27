import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Post, Comment } from '../models/post.model';

import { PostService } from '../post-service';

@Component({
  selector: 'app-post-details',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css'
})
export class PostDetails implements OnInit {
post: Post | undefined;
  comments: Comment[] = [];
  commentForm: FormGroup;
  showCommentForm = false;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const postId = Number(params.get('id'));
    console.log('Route parameter id:', params.get('id'));
    console.log('Parsed postId:', postId);
    this.loadPost(postId);
  });
}

 loadPost(postId: number): void {
  console.log('Loading post with ID:', postId);
  this.isLoading = true;
  this.error = '';
  
  const post = this.postService.getPostById(postId);
  console.log('Found post:', post);
  
  if (!post) {
    this.error = 'Post not found';
    this.isLoading = false;
    return;
  }

  this.post = post;
  this.comments = this.postService.getCommentsByPostId(postId);
  this.isLoading = false;
}

  toggleCommentForm(): void {
    this.showCommentForm = !this.showCommentForm;
    if (this.showCommentForm) {
      setTimeout(() => {
        const el = document.getElementById('commentForm');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
  }
}

  onSubmitComment(): void {
    if (!this.post) {
      this.error = 'Cannot add comment: Post not loaded';
      return;
    }

    if (this.commentForm.valid) {
      const newComment = { 
        postId: this.post.id, 
        ...this.commentForm.value 
      };
      
      this.postService.addComment(newComment);
      this.comments = this.postService.getCommentsByPostId(this.post.id);
      this.commentForm.reset();
      this.showCommentForm = false;
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.commentForm.controls).forEach(key =>
      this.commentForm.get(key)?.markAsTouched()
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  get commentFormControls() {
    return this.commentForm.controls;
  }
}
