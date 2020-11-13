import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy
{

  ingredients: Ingredient[];
  constructor(private shoppingListService: ShoppingListService) { }
  
  subscription1: Subscription;
  subscription2: Subscription;

  ngOnInit(): void
  {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription1 = this.shoppingListService.addIngredientEvent.subscribe((ingredient: Ingredient) => { this.ingredients = this.shoppingListService.getIngredients(); })
    this.subscription2 = this.shoppingListService.addIngredientsEvent.subscribe((ingredients: Ingredient[]) => { this.ingredients = this.shoppingListService.getIngredients(); })

  }
  ngOnDestroy()
  {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }


}
