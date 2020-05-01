import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';


const modRoutes: Routes = [
  {path: '', children: [
    {path: 'money', component: ArticleComponent},
    {path: 'cbp', component: ArticleComponent},
    {path: 'fumble', component: ArticleComponent},
    {path: 'actions', component: ArticleComponent},
    {path: 'ip', component: ArticleComponent},
    {path: 'luck', component: ArticleComponent},
    {path: 'medtechs', component: ArticleComponent},
    {path: 'nr', component: ArticleComponent},
    {path: 'skills', component: ArticleComponent},
    {path: 'sa', component: ArticleComponent},
    {path: 'careers', component: ArticleComponent},
    {path: 'youth', component: ArticleComponent},
    {path: '**', redirectTo: '/', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(modRoutes)],
  exports: [RouterModule]
})
export class ModSectionRoutingModule { }
