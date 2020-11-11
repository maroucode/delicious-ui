import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    { name: 'Apples', quantity: '5' },
    { name: 'Tomates', quantity: '5' },
  ];

  addIngredientEvent = new EventEmitter<Ingredient>();
  addIngredientsEvent = new EventEmitter<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.addIngredientEvent.emit(ingredient);
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.addIngredientsEvent.emit(ingredients);
  }
}
