import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ModalService } from '../../../../shared/components/modal/index';
import { PreviewModalComponent } from '../../../content/preview/preview-modal.component';

@Component({
  selector: 'cx-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridItemComponent implements OnInit {
  @Input() product: any;

  previewModalRef: any;
  constructor(
    private modalService: ModalService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    console.log('product', this.product);
  }

  showPreviewButton(event: MouseEvent) {
    const currentItem = <HTMLElement>event.currentTarget;

    this.renderer.removeClass(currentItem.firstElementChild, 'hide-preview');
  }

  hidePreviewButton(event: MouseEvent) {
    const currentItem = <HTMLElement>event.currentTarget;

    this.renderer.addClass(currentItem.firstElementChild, 'hide-preview');
  }

  testing() {
    this.previewModalRef = this.modalService.open(PreviewModalComponent, {
      centered: true,
      size: 'lg',
    });

    this.previewModalRef.componentInstance.productRef = this.product;
  }
}
