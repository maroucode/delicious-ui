import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService
{
  constructor(private shoppinglistService: ShoppingListService) { }
  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'This is simply a test',
      'https://www.scenolia.com/media/catalog/product/cache/f9dcbe8826929f1dab7f58564ff0bb3f/3/7/3701237730179.main.jpg',
      [new Ingredient('Floor', '3'), new Ingredient('Oil', '2')]
    ),
    new Recipe(
      'Shakshuka',
      'This is simply a test',
      'https://www.welcometothetable.coop/sites/default/files/Shakshuka_with_Spinach.jpg',
      [new Ingredient('Meat', '3'), new Ingredient('Sauce', '2')]
    ),
  ];
  addOrUpdateEvent = new Subject<Recipe[]>();
  selectedRecipeEvent = new EventEmitter<Recipe>();
  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.addOrUpdateEvent.next(this.recipes.slice());
  }
  addRecipe(recipe: Recipe)
  {
    this.recipes.push(recipe);
    this.addOrUpdateEvent.next(this.recipes);
  }
  updateRecipe(index: number, recipe: Recipe)
  {
    this.recipes[index] = recipe;
    this.addOrUpdateEvent.next(this.recipes);
  }
  onDelete(index: number)
  {
    this.recipes.splice(index, 1);
    this.addOrUpdateEvent.next(this.recipes);
  }
  getRecipes()
  {
    this.addOrUpdateEvent.next(this.recipes);
    return this.recipes.slice();
  }
  addIngredients(ingredients: Ingredient[])
  {
    this.shoppinglistService.addIngredients(ingredients);
  }
  getRecipe(index: number)
  {
    return this.recipes.slice()[index];
  }
}
