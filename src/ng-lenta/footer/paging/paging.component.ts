import { Component, EventEmitter, Input, 
    Output, OnChanges, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { isNumber } from '../../util/value-util';
import { Options } from '../../model/options';

@Component({
    selector: 'ngl-paging',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'role': 'navigation',
        'class': 'ngl-paging'
    },
    template: `
    <ul class="ngl-paging-list">
      <li class="ngl-page-item boundary-action-item"
        [class.disabled]="!hasPrevious() || disabled">
        <a aria-label="First" class="ngl-page-link" href (click)="!!selectPage(1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
          <span class="mdi mdi-page-first" aria-hidden="true"></span>
        </a>
      </li>
      <li class="ngl-page-item boundary-action-item"
        [class.disabled]="!hasPrevious() || disabled">
        <a aria-label="Previous" class="ngl-page-link" href (click)="!!selectPage(page-1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
            <span class="mdi mdi-chevron-left" aria-hidden="true"></span>
        </a>
      </li>
      <li *ngFor="let pageNumber of pages" class="ngl-page-item" [class.active]="pageNumber === page"
        [class.disabled]="isEllipsis(pageNumber) || disabled">
        <a *ngIf="isEllipsis(pageNumber)" class="ngl-page-link">...</a>
        <a *ngIf="!isEllipsis(pageNumber)" class="ngl-page-link" href (click)="!!selectPage(pageNumber)">
          {{pageNumber}}
          <span *ngIf="pageNumber === page" class="sr-only">(current)</span>
        </a>
      </li>
      <li class="ngl-page-item boundary-action-item" [class.disabled]="!hasNext() || disabled">
        <a aria-label="Next" class="ngl-page-link" href (click)="!!selectPage(page+1)" [attr.tabindex]="(hasNext() ? null : '-1')">
          <span class="mdi mdi-chevron-right" aria-hidden="true"></span>
        </a>
      </li>
      <li class="ngl-page-item boundary-action-item" [class.disabled]="!hasNext() || disabled">
        <a aria-label="Last" class="ngl-page-link" href (click)="!!selectPage(pageCount)" [attr.tabindex]="(hasNext() ? null : '-1')">
          <span class="mdi mdi-page-last" aria-hidden="true"></span>
        </a>
      </li>
    </ul>
  `
})
export class PagingComponent implements OnChanges {
    pageCount = 0;
    pages: number[] = [];

    @Input() disabled = false;
    @Input() totalCount = 0;
    @Input() maxSize: number;
    @Input() page = 1;
    @Input() pageSize: number;

    @Output() pageChange = new EventEmitter<number>(true);

    constructor(defaultOptions: Options, private _cd: ChangeDetectorRef) {
        // TODO: handle options change
        this.disabled = !defaultOptions.paging.enabled;
        this.maxSize = defaultOptions.paging.maxSize;
        this.pageSize = defaultOptions.paging.pageSize;
    }

    hasPrevious(): boolean {
        return this.page > 1;
    }

    hasNext(): boolean {
        return this.page < this.pageCount;
    }

    selectPage(pageNumber: number): void {
        this._updatePages(pageNumber);
        this._cd.markForCheck();
    }

    ngOnChanges(_: SimpleChanges): void {
        this._updatePages(this.page);
    }

    isEllipsis(pageNumber): boolean {
        return pageNumber === -1;
    }

    private _applyEllipses(start: number, end: number) {
        if (start > 0) {
            if (start > 1) {
                this.pages.unshift(-1);
            }
            this.pages.unshift(1);
        }
        if (end < this.pageCount) {
            if (end < (this.pageCount - 1)) {
                this.pages.push(-1);
            }
            this.pages.push(this.pageCount);
        }
    }

    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    private _applyRotation(): [number, number] {
        let start = 0;
        let end = this.pageCount;
        let leftOffset = Math.floor(this.maxSize / 2);
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;

        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        } else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        } else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }

        return [start, end];
    }

    private _setPageInRange(newPageNo) {
        const prevPageNo = this.page;
        this.page = this._getValueInRange(newPageNo, this.pageCount, 1);

        if (this.page !== prevPageNo && isNumber(this.totalCount)) {
            this.pageChange.emit(this.page);
        }
    }

    private _updatePages(newPage: number) {
        this.pageCount = Math.ceil(this.totalCount / this.pageSize);

        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }

        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }

        // set page within 1..max range
        this._setPageInRange(newPage);

        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            let start = 0;
            let end = this.pageCount;

            // either paginating or rotating page numbers
            [start, end] = this._applyRotation();

            this.pages = this.pages.slice(start, end);

            // adding ellipses
            this._applyEllipses(start, end);
        }
    }

    private _getValueInRange(value: number, max: number, min = 0): number {
        return Math.max(Math.min(value, max), min);
    }
}
