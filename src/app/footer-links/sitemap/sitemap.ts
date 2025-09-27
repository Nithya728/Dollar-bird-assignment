import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../category-service';

@Component({
  selector: 'app-sitemap',
  imports: [CommonModule,RouterModule],
  templateUrl: './sitemap.html',
  styleUrl: './sitemap.css'
})
export class Sitemap {
constructor(public categoryService: CategoryService) {}
}
