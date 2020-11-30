import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthenticationService } from './auth/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,
        AuthGuardService,
        AuthenticationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ]
})
export class CoreModule{

}