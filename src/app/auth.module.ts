import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    { path: 'auth', component: AuthComponent }
  ];

@NgModule({
  declarations: [AuthComponent],
  imports: [FormsModule, CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class AuthModule {}
