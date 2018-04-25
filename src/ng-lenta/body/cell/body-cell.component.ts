import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, ElementRef } from '@angular/core';
import { BodyCell, BodyRow } from '../../model/state';
import { AutoLayout } from '../../model/autolayout';

@Component({
    selector: 'ngl-body-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ngl-body-cell',
        'role': 'gridcell'
    },
    template: `
        <ng-template #defaultTemplate>
            {{cell?.value}}
        </ng-template>
    
        <ng-template
            [ngTemplateOutlet]="cell?.template || defaultTemplate"
            [ngTemplateOutletContext]="{ row: row.ref }">
        </ng-template>
    `
})
export class BodyCellComponent implements OnInit {

    @Input() cell: BodyCell | null = null;
    @Input() row: BodyRow | null = null;

    constructor(private _el: ElementRef, private _autoLayout: AutoLayout) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        if (this._autoLayout.enabled) {
            const e = (<HTMLElement>this._el.nativeElement);
            this._autoLayout.addCellInfo(<BodyCell>this.cell, { width: e.clientWidth });
        }
    }
}
