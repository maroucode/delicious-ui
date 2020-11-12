import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService {
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

  selectedRecipeEvent = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }
  addIngredients(ingredients: Ingredient[]) {
    this.shoppinglistService.addIngredients(ingredients);
  }
  getRecipe(index : number){
    return this.recipes.slice()[index];
  }
}
