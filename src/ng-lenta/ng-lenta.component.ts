import { 
    Component,
    OnInit,
    OnChanges,
    Input,
    SimpleChanges,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    QueryList,
    ContentChildren,
    TemplateRef,
    ContentChild
} from '@angular/core';

import { LentaList, ViewTemplates } from './model/list';
import { Column } from './public-types';
import { BodyCellTemplateDirective } from './body/cell/body-cell-template.directive';
import { BodyRowTemplateDirective } from './body/row/body-row-template.directive';

@Component({
    selector: 'ng-lenta',
    providers: [LentaList],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./ng-lenta.component.scss'],
    host: {
        'class': 'ngl-table',
        'role': 'grid'
    },
    template: `
        <ngl-header>
            <ngl-header-cell *ngFor="let cell of list.headerCells"[cell]="cell"></ngl-header-cell>
        </ngl-header>
        <ngl-body>
            <ngl-body-row *ngFor="let row of list.rows" [row]="row"></ngl-body-row>
        </ngl-body>
        <ngl-footer></ngl-footer>
    `
})
export class NgLentaComponent implements OnInit, OnChanges {
    @Input() rows: any[] = [];
    @Input() columns: Column[] = [];
    @ContentChildren(BodyCellTemplateDirective) bodyCellTemplates: QueryList<BodyCellTemplateDirective>;
    @ContentChild(BodyRowTemplateDirective) bodyRowTemplate: BodyRowTemplateDirective;

    constructor(public list: LentaList) { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.columns) {
            this.setColumns(changes.columns.currentValue);
        }
        if (changes.rows) {
            if (this.bodyCellTemplates) {
                this.setRows(changes.rows.currentValue);
            }
        }
    }

    ngAfterContentInit() {
    }

    private setColumns(columns: Column[]) {
        this.list.setColumns(columns);
    }

    private setRows(rows: any[]) {
        const templates: ViewTemplates = {
            bodyCellTemplates: null,
            bodyRowTemplate: this.bodyRowTemplate ? this.bodyRowTemplate.templateRef : null
        };

        if (!templates.bodyRowTemplate) {
            const cellTemplatesRefMap = new Map<string, TemplateRef<any>>();
            this.bodyCellTemplates.forEach((t) => {
                cellTemplatesRefMap.set(t.column, t.templateRef);
            });
            templates.bodyCellTemplates = cellTemplatesRefMap;
        }

        this.list.setRows(rows, templates);
    }
}
