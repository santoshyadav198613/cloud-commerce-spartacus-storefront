import { Observable } from 'rxjs';
import {
  ProductInterestList,
  ProductInterestRelation,
} from '../../../model/product-interest.model';

export abstract class UserInterestsAdapter {
  abstract getInterests(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<ProductInterestList>;

  abstract removeInterests(
    userId: string,
    item: ProductInterestRelation
  ): Observable<any[]>;
}
