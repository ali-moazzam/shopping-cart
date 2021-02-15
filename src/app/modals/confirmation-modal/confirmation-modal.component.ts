import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  showConfirmationModal = false;
  @Input() totatCost;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.showConfirmationModal = true;

  }

  onClickClose() {
    this.showConfirmationModal = false;
    this.closeModal.emit(true);
  }

}
