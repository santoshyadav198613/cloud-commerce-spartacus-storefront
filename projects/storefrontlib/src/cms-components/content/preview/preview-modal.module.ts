import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import {
  MediaModule,
  SpinnerModule,
  StarRatingModule,
} from '../../../shared/index';
import { PreviewModalComponent } from './preview-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    SpinnerModule,
    StarRatingModule,
    ConfigModule,
    I18nModule,
    UrlModule,
  ],
  declarations: [PreviewModalComponent],
  exports: [PreviewModalComponent],
  entryComponents: [PreviewModalComponent],
})
export class PreviewModalModule {}
