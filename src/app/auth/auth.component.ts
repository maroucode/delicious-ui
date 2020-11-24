import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthData, AuthenticationService } from './authentication.service';
import { AlertHolderDirective } from '../shared/alert-holder.directive';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isSignInMode: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;
  alertSub: Subscription;
  authObserver: Observable<AuthData>;
  @ViewChild(AlertHolderDirective, { static: true })
  alertHost: AlertHolderDirective;

  constructor(
    private authService: AuthenticationService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}
  switchMode() {
    this.isSignInMode = !this.isSignInMode;
  }
  resetErrorMessage() {
    this.errorMessage = null;
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
        this.loadAlert(errorMessage);
      }
    );
    form.reset();
  }
  loadAlert(error: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AlertComponent>(
      componentFactory
    );
    componentRef.instance.errorMessage = error;
    this.alertSub = componentRef.instance.hideErrorEvent.subscribe(() => {
      viewContainerRef.clear();
      this.errorMessage = null;
      this.alertSub.unsubscribe();
    });
  }
  ngOnDestroy() {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }
}
