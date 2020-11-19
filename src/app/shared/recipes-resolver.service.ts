import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  
  {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0)
    {
      return this.dataStorageService.fetchRecipes();
    }
  }
}
