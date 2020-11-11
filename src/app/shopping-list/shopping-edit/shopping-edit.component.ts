import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('inputName') inputNameRef:ElementRef;
  @ViewChild('inputQuantity') inputQuantityRef:ElementRef;
  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddEvent(){
    const name = this.inputNameRef.nativeElement.value;
    const quantity = this.inputQuantityRef.nativeElement.value;
    const ingredient =  new Ingredient(name, quantity);
    this.shoppingListService.addIngredient(ingredient);
  }
}
  