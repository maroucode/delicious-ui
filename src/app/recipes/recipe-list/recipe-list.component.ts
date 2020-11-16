import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy
{

  subscription: Subscription;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void
  {
    this.subscription = this.recipeService.addOrUpdateEvent.subscribe((recipes: Recipe[]) =>
    {
      this.recipes = recipes;
    })
    this.recipes = this.recipeService.getRecipes();
  }


  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
