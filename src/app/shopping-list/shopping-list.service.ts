import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    { name: 'Apples', quantity: '5' },
    { name: 'Tomates', quantity: '5' },
  ];

  addIngredientEvent = new Subject<Ingredient>();
  addIngredientsEvent = new Subject<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.addIngredientEvent.next(ingredient);
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.addIngredientsEvent.next(ingredients);
  }
}
