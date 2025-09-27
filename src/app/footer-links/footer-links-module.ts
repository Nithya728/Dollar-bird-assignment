import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Cookies } from './cookies/cookies';
import { Popular } from './popular/popular';
import { Privacy } from './privacy/privacy';
import { Sitemap } from './sitemap/sitemap';
import { Terms } from './terms/terms';

const routes: Routes = [
  { path: 'cookies', component: Cookies },
  { path: 'popular', component:  Popular},
    { path: 'privacy', component: Privacy },
      { path: 'sitemap', component: Sitemap },
        { path: 'terms', component: Terms },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})

export class FooterLinksModule { }
