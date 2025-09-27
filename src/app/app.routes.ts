import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AddPost } from './add-post/add-post';
import { PostDetails } from './post-details/post-details';
import { PostCard } from './post-card/post-card';
import { About } from './about/about';
import { Category } from './category/category';
import { Categories } from './categories/categories';


export const routes: Routes = [
    
 { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'add-post', component: AddPost },
  { path: 'post-details/:id', component: PostDetails },
    { path: 'about', component: About },
     { path: 'category/:id', component: Category },
     {path: 'categories', component: Categories},
      {
      path: 'footer-links', 
      loadChildren: () => import('./footer-links/footer-links-module').then(m => m.FooterLinksModule) 
    },

  { path: '**', redirectTo: '' },
];


