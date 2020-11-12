import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  index:number;
  @Input() recipe:Recipe;
  constructor(private activatedRoute : ActivatedRoute ,private recipeService:RecipeService,private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params : Params)=>{
      this.index = +params['index'];
      this.recipe= this.recipeService.getRecipe(this.index);
    });
  }
  addIngredientsToShoppingList(){
    this.recipeService.addIngredients(this.recipe.ingredients);
  }
  onNavigate(){
    this.router.navigate(['edit'],{relativeTo: this.activatedRoute})
  }
}
