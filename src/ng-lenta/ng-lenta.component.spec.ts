import { NgLentaComponent } from './ng-lenta.component';
import { ComponentFixture, TestBed, fakeAsync, tick, async, flushMicrotasks } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { LentaState } from './model/lenta-state';
import { LentaOptions, LentaColumn, LentaColumns } from '..';
import { BodyComponent } from './body/body.component';
import { BodyCellComponent } from './body/cell/body-cell.component';
import { BodyRowComponent } from './body/row/body-row.component';
import { HeaderComponent } from './header/header.component';
import { HeaderCellComponent } from './header/cell/header-cell.component';
import { FooterComponent } from './footer/footer.component';
import { BodyCellTemplateDirective } from './body/cell/body-cell-template.directive';
import { BodyRowTemplateDirective } from './body/row/body-row-template.directive';
import { PagingComponent } from './footer/paging/paging.component';

describe('NgLentaComponent', () => {

    let lenta: NgLentaComponent;
    let cmp: NgLentaTestCmp;
    let fixture: ComponentFixture<NgLentaTestCmp>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NgLentaTestCmp,
                NgLentaComponent,
                NgLentaComponent,
                BodyComponent,
                BodyRowComponent,
                BodyCellComponent,
                HeaderComponent,
                HeaderCellComponent,
                FooterComponent,
                BodyCellTemplateDirective,
                BodyRowTemplateDirective,
                PagingComponent
            ],
            providers: [
                LentaOptions,
                LentaState,
            ]
        });

        fixture = TestBed.createComponent(NgLentaTestCmp);
        cmp = fixture.componentInstance;
        lenta = fixture.componentInstance.lenta;
    }));

    it('should set state rows from input rows', fakeAsync(() => {
        fixture.detectChanges();
        expect(lenta.state.rows.length).toEqual(2);

        cmp.rows = [];
        fixture.detectChanges();
        expect(lenta.state.rows.length).toEqual(0);

        cmp.rows = [{ id: 'a', name: 'row 1' }];
        fixture.detectChanges();
        expect(lenta.state.rows.length).toEqual(1);
    }));
});

@Component({
    selector: 'ng-lenta-test-cmp',
    template: `
        <ng-lenta [rows]="rows" [columns]="columns" [options]="options"></ng-lenta>
    `
})
export class NgLentaTestCmp {
    @ViewChild(NgLentaComponent) lenta: NgLentaComponent = <any>undefined;

    rows = [
        { id: 'a', name: 'row 1' },
        { id: 'b', name: 'row 2' }
    ];

    options = new LentaOptions({
        clientSide: true
    });

    columns: LentaColumn[] = LentaColumns.create([
        { prop: 'id', name: 'Id' },
        { prop: 'name', name: 'Name' },
    ]);
}

