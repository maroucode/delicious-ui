import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() errorMessage: string;
  @Output() hideErrorEvent = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {
    this.hideErrorEvent.subscribe(() => {
      this.errorMessage = null;
    });
  }
  onClick() {
    this.hideErrorEvent.emit();
  }
}
