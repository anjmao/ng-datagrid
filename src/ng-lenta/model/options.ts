import { Injectable } from '@angular/core';
import { LentaOptions } from '../public-types';

@Injectable()
export class Options {
    clientSide = true;
    autoLayout = true;
    sorting = {
        enabled: true
    };
    paging = {
        enabled: true,
        maxSize: 5,
        pageSize: 10
    };

    mergePublicOptions(options: LentaOptions) {
        // TODO: paging options are not updated in paging component
        Object.assign(this, options || {});
    }
}
