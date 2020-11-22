import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import {
  AuthData,
  AuthenticationService,
} from '../auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;

  @Output() featureSelected = new EventEmitter<string>();

  authSubscription: Subscription;
  constructor(
    private dataService: DataStorageService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  logOut() {
    this.isAuthenticated = false;
    this.authService.signOut();
  }
  onSave() {
    this.dataService.storeRecipes();
  }
  onFetchData() {
    this.dataService.fetchRecipes().subscribe();
  }

  onSelect(link: string): void {
    this.featureSelected.emit(link);
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
