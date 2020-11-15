import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy
{

  @ViewChild('f') formInput: NgForm;
  name: string;
  quantity: string;
  isEditMode: boolean = false;
  editedIngredient: Ingredient;
  editedIndex: number;
  subscriptionModify: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit()
  {
    this.subscriptionModify = this.shoppingListService.modifyIngredientsEvent.subscribe((index) =>
    {
      console.log(index);
      this.isEditMode = true;
      this.editedIngredient = this.shoppingListService.getIngredient(index);
      this.editedIndex = index;
      this.formInput.setValue({ name: this.editedIngredient.name, quantity: this.editedIngredient.quantity });
    });
  }

  onAddEvent(formInput: NgForm)
  {
    this.name = this.formInput.value.name;
    this.quantity = this.formInput.value.quantity;
    const ingredient = new Ingredient(this.name, this.quantity);
    this.shoppingListService.addIngredient(ingredient, this.isEditMode, this.editedIndex);

    this.onClear();
  }

  onClear()
  {
    this.isEditMode = false;
    this.editedIndex = null;
    this.editedIngredient = null;
    this.formInput.reset();
  }

  onDelete()
  {

    this.shoppingListService.removeIngredient(this.editedIndex);
    this.onClear();
  }
  ngOnDestroy(): void
  {
    this.subscriptionModify.unsubscribe();
  }
}
