import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { CmsAction } from '@spartacus/core';

@Component({
  selector: 'cx-page-action',
  templateUrl: './page-action.component.html',
  styleUrls: ['./page-action.component.scss']
})
export class PageActionComponent implements OnInit {

  @Input()
  action: CmsAction
  @Input()
  data: any;

  @Output()
  onaction = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onAction(){
    this.onaction.emit(this.data);
  }
}
