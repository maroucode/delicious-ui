import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit
{

  editmode: boolean = false;
  index: number;
  recipe: Recipe;
  recipeForm: FormGroup;
  ingredientsFormArray: FormArray;
  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void
  {
    this.activatedRoute.params.subscribe((params: Params) =>
    {
      this.index = +params['index'];
      this.editmode = params['index'] != null;
      this.initForm();
    });
  }
  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({ 'name': new FormControl(null, Validators.required), 'quantity': new FormControl(null, Validators.required) }));
  }
  onSubmit()
  {
    let recipe = this.recipeForm.value;
    if (this.editmode)
    {
      this.recipeService.updateRecipe(this.index, recipe);
    } else
    {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }
  onDeleteIngredient(i: number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
  public get controls()
  { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onCancel()
  {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  initForm()
  {
    if (this.editmode)
    {
      let recipe = this.recipeService.getRecipe(this.index);
      if (recipe['ingredients'])
      {
        this.ingredientsFormArray = new FormArray([]);
        let ingredients = recipe.ingredients;
        for (let ingredient of ingredients)
        {
          this.ingredientsFormArray.push(new FormGroup({ 'name': new FormControl(ingredient.name, Validators.required), 'quantity': new FormControl(ingredient.quantity, Validators.required) }));
        }
      }
      this.recipe = recipe;
      this.recipeForm = new FormGroup({
        'name': new FormControl(recipe.name, Validators.required),
        'description': new FormControl(recipe.description, Validators.required),
        'imagePath': new FormControl(recipe.imagePath, Validators.required),
        'ingredients': this.ingredientsFormArray
      });
    } else
    {
      this.recipeForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'imagePath': new FormControl(null, Validators.required),
        'ingredients': new FormArray([])
      });
    }
  }

}
