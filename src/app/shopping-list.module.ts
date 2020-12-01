import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SharedModule } from './shared.module';

const routes: Routes = [
  { path: '', component: ShoppingListComponent },
];
@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [SharedModule, CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class ShoppingListModule {}
