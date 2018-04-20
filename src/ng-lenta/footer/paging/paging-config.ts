
import { Injectable } from '@angular/core';

@Injectable()
export class PagingConfig {
    disabled = false;
    boundaryLinks = false;
    directionLinks = true;
    ellipses = true;
    maxSize = 0;
    pageSize = 10;
    rotate = false;
}
