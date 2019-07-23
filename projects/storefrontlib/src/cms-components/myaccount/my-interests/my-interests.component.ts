import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  AuthService,
  UserInterestsService,
  ProductInterestList,
  ProductInterestRelation,
  PaginationModel,
} from '@spartacus/core';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'cx-my-interests',
  templateUrl: './my-interests.component.html',
})
export class MyInterestsComponent implements OnInit, OnDestroy {
  interests$: Observable<ProductInterestList>;
  loaded$: Observable<boolean>;
  subscription: Subscription;

  private userId: string;
  private PAGE_SIZE = 1;
  private sortMapping = {
    byNameAsc: 'name:asc',
    byNameDesc: 'name:desc',
  };

  sort = 'byNameAsc';
  sortLabels = {
    byNameAsc: 'NAME(ASCENDING)',
    byNameDesc: 'NAME(DESCENDING)',
  };
  sortOptions = [
    {
      code: 'byNameAsc',
      selected: false,
    },
    {
      code: 'byNameDesc',
      selected: false,
    },
  ];
  pagination: PaginationModel;

  constructor(
    private auth: AuthService,
    private productInterestService: UserInterestsService
  ) {}

  ngOnInit() {
    this.subscription = this.auth.getUserToken().subscribe(userData => {
      if (userData && userData.userId) {
        this.userId = userData.userId;
      }
    });
    this.interests$ = this.productInterestService
      .getProdutInterests(this.userId, this.PAGE_SIZE)
      .pipe(
        tap(
          interests =>
            (this.pagination = {
              currentPage: interests.pagination.page,
              pageSize: interests.pagination.count,
              totalPages: interests.pagination.totalPages,
              totalResults: interests.pagination.totalCount,
              sort: 'byNameAsc',
            })
        )
      );
    this.loaded$ = this.productInterestService.getProdutInterestsLoaded();
  }

  removeInterests(result: ProductInterestRelation): void {
    if (this.userId) {
      this.productInterestService.deleteProdutInterest(this.userId, result);
    }
  }

  sortChange(sort: string): void {
    this.sort = sort;
    this.productInterestService.loadProductInterests(
      this.userId,
      this.PAGE_SIZE,
      0,
      this.sortMapping[sort]
    );
  }

  pageChange(page: number): void {
    this.productInterestService.loadProductInterests(
      this.userId,
      this.PAGE_SIZE,
      page,
      this.sortMapping[this.sort]
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.productInterestService.clearProductInterests();
  }
}
