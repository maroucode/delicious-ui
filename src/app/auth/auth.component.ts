import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isSignInMode: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}
  switchMode() {
    this.isSignInMode = !this.isSignInMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (!this.isSignInMode) {
      this.authService.singUp(email, password).subscribe(
        (resdata) => {
          console.log(resdata);
          this.isLoading = false;
        },
        (errorMessage) => {
          this.errorMessage = errorMessage;
          this.isLoading = false;
        }
      );
    } else {
      this.authService.singIn(email, password).subscribe(
        (resdata) => {
          console.log(resdata);
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = error.error.error.message;
          this.isLoading = false;
        }
      );
    }
    form.reset();
  }
}
