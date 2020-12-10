import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authServie: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId
  ) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authServie.autoSignIn();
    }
    console.log('Hello world'); 
  }
}
