import { isSyntheticPropertyOrListener } from '@angular/compiler/src/render3/util';
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[dropDownButton]'
  })
export class DropDownDirective{
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') clickDropDownEvent(){
        this.isOpen = !this.isOpen;
    }
}