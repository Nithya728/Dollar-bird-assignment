import { Component } from '@angular/core';
import { CategoryService } from '../category-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {
 constructor(public categoryService: CategoryService) {}
}
