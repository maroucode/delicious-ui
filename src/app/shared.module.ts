import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertHolderDirective } from './shared/alert-holder.directive';
import { AlertComponent } from './shared/alert/alert.component';
import { DropDownDirective } from './shared/dropdown.directive';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@NgModule({
  declarations: [
    DropDownDirective,
    SpinnerComponent,
    AlertComponent,
    AlertHolderDirective,
  ],
  imports: [CommonModule],
  exports: [
    DropDownDirective,
    SpinnerComponent,
    AlertComponent,
    AlertHolderDirective, 
  ],
  entryComponents:[AlertComponent]
})
export class SharedModule {}
