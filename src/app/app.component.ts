import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authServie: AuthenticationService) {}
  ngOnInit() {
    this.authServie.autoSignIn();
  }
}
