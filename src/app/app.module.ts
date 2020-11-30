import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { AuthenticationService } from './auth/authentication.service';
import { HeaderComponent } from './header/header.component';
import { RecipesModule } from './recipes.module';
import { RecipeService } from './recipes/recipe.service';
import { AlertHolderDirective } from './shared/alert-holder.directive';
import { AlertComponent } from './shared/alert/alert.component';
import { DropDownDirective } from './shared/dropdown.directive';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ShoppingListModule } from './shopping-list.module';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { SharedModule } from './shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AuthComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ShoppingListModule,
    RecipesModule,
    SharedModule,
    CoreModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
