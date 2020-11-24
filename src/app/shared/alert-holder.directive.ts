import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAlertHolder]',
})
export class AlertHolderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
