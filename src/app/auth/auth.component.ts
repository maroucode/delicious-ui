import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthData, AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isSignInMode: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;
  authObserver: Observable<AuthData>;

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
      this.authObserver = this.authService.singUp(email, password);
    } else {
      this.authObserver = this.authService.singIn(email, password);
    }
    this.authObserver.subscribe(
      (resdata) => {
        console.log(resdata);
        this.isLoading = false;
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
