import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit
{

  isSignInMode: boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void
  {
  }
  switchMode()
  {
    this.isSignInMode = !this.isSignInMode;
  }

  onSubmit(form: NgForm)
  {

    const email = form.value.email;
    const password = form.value.password;

    if (!this.isSignInMode)    
    {
      this.authService.singUp(email, password).subscribe((resdata) => { console.log(resdata); }, (error) => { this.errorMessage = error.error.error.message; });
    } else 
    {
      this.authService.singIn(email, password).subscribe((resdata) => { console.log(resdata); }, (error) => { this.errorMessage = error.error.error.message; });
    }
    form.reset();
  }

}
