import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeStarterComponent } from './recipes/recipe-starter/recipe-starter.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesResolverService } from './shared/recipes-resolver.service';
import { SharedModule } from './shared.module';


const routes: Routes = [
    {
      path: 'recipes',
      component: RecipesComponent,
      canActivate: [AuthGuardService],
      children: [
        { path: '', component: RecipeStarterComponent },
        { path: 'new', component: RecipeEditComponent },
        {
          path: ':index',
          component: RecipeDetailComponent,
          resolve: [RecipesResolverService],
        }, 
        {
          path: ':index/edit',
          component: RecipeEditComponent,
          resolve: [RecipesResolverService],
        },
      ],
    } ];
  

@NgModule({
  declarations: [
      
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent, 
    RecipeStarterComponent
  ],
  imports: [SharedModule, CommonModule,ReactiveFormsModule,RouterModule.forChild(routes)] 
})
export class RecipesModule {}
