import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../post-service';

@Component({
  selector: 'app-add-post',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.css'
})
export class AddPost {
  postForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      excerpt: ['', [Validators.maxLength(300)]],
      content: ['', [Validators.required, Validators.minLength(50)]],
      tags: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.postForm.valid) {
      this.isLoading = true;
      
    
      setTimeout(() => {
        const formValue = this.postForm.value;
        const postData = {
          ...formValue,
          tags: formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : []
        };
        
        this.postService.addPost(postData);
        this.isLoading = false;
        this.router.navigate(['/']);
      }, 1000);
    }
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/']);
    }
  }

  get f() { return this.postForm.controls; }

  get characterCount(): number {
    return this.postForm.get('content')?.value.length || 0;
  }

  get excerptCharacterCount(): number {
    return this.postForm.get('excerpt')?.value.length || 0;
  }
}