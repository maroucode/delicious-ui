import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit
{

  isSignInMode: boolean = false;
  constructor() { }

  ngOnInit(): void
  {
  }
  switchMode()
  {
    this.isSignInMode = !this.isSignInMode;
  }

}
