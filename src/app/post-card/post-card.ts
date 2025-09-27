import { Component, Input } from '@angular/core';
import { Post } from '../models/post.model';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../pipes/truncate-pipe';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule,RouterModule,TruncatePipe   ],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css'
})
export class PostCard {
   @Input() post!: Post;
  @Input() showFullContent: boolean = false;
}
