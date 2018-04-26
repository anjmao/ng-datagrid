import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { isDefined } from '../util/value-util';

export interface LentaOptionsPaging {
    enabled?: boolean;
    maxSize?: number;
    pageSize?: number;
}

export interface LentaOptionsSorting {
    enabled?: boolean;
}

export interface LentaOptionsCtor {
    clientSide?: boolean;
    sorting?: LentaOptionsSorting;
    paging?: LentaOptionsPaging;
}

export const LENTA_OPTIONS_CTOR = new InjectionToken<LentaOptionsCtor>('lenta.options.ctor');

@Injectable()
export class LentaOptions {
    clientSide = true;
    sorting = {
        enabled: true
    };
    paging = {
        enabled: true,
        maxSize: 5,
        pageSize: 10
    };

    constructor(@Optional() @Inject(LENTA_OPTIONS_CTOR) opts: LentaOptionsCtor) {
        if (!opts) {
            return;
        }
        this.clientSide = isDefined(opts.clientSide) ? <boolean>opts.clientSide : true;
        const p = opts.paging;
        if (p) {    
            if (isDefined(p.enabled)) {
                this.paging.enabled = <boolean>p.enabled;
            }
            if (isDefined(p.maxSize)) {
                this.paging.maxSize = <number>p.maxSize;
            }
            if (isDefined(p.pageSize)) {
                this.paging.pageSize = <number>p.pageSize;
            }
        }
        const s = opts.sorting;
        if (s) {
            if (isDefined(s.enabled)) {
                this.sorting.enabled = <boolean>s.enabled;
            }
        }
    }

    mergeInput(opts: LentaOptions) {
        this.clientSide = opts.clientSide;
        this.sorting = opts.sorting;
        this.paging = opts.paging;
    }
}
