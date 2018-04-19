import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { HeaderCell } from '../model/list';

@Component({
    selector: 'ngl-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'ngl-header'
    },
    template: `
        <ngl-header-cell *ngFor="let cell of cells" [cell]="cell"></ngl-header-cell>
    `
})
export class HeaderComponent implements OnInit {

    @Input() cells: HeaderCell[] = [];

    constructor() { }

    ngOnInit() {
        console.log('header cells', this.cells);
    }
}
