import { Injectable } from '@angular/core';
import { LentaOptions } from '../public-types';

@Injectable()
export class Options {
    clientSide = true;
    paging = {
        disabled: false,
        maxSize: 0,
        pageSize: 10
    }

    mergePublicOptions(options: LentaOptions) {
        // TODO: paging options are not updated in paging component
        Object.assign(this, options || {});
    }
}
