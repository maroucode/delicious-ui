import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService
{
  private ingredients: Ingredient[] = [
    { name: 'Apples', quantity: '5' },
    { name: 'Tomates', quantity: '5' },
  ];

  addIngredientEvent = new Subject<Ingredient>();
  addIngredientsEvent = new Subject<Ingredient[]>();
  modifyIngredientsEvent = new Subject<number>();


  getIngredients()
  {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient, isEdit: boolean, index: number)
  {
    if (!isEdit)
    {
      this.ingredients.push(ingredient);
      this.addIngredientEvent.next(ingredient);
    } else
    {
      this.ingredients[index] = ingredient;
      this.addIngredientEvent.next(ingredient);
    }
  }
  addIngredients(ingredients: Ingredient[])
  {
    this.ingredients.push(...ingredients);
    this.addIngredientsEvent.next(ingredients);
  }

  getIngredient(index: number): Ingredient
  {
    return this.ingredients[index];
  }

  modifyIngredient(index: number)
  {
    this.modifyIngredientsEvent.next(index);
  }
  removeIngredient(index: number)
  {
    this.ingredients.splice(index, 1);
    this.addIngredientsEvent.next(this.ingredients);

  }
}
