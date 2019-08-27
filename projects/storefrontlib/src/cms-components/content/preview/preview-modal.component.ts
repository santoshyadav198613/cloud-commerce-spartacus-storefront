import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cx-preview-modal',
  templateUrl: './preview-modal.component.html',
})
export class PreviewModalComponent implements OnInit {
  @Input()
  productRef: any;

  product: any;

  constructor() {}

  ngOnInit() {
    this.product = this.productRef;
  }
}
