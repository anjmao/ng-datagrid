import { NgLentaComponent } from './ng-lenta.component';
import { ComponentFixture, TestBed, fakeAsync, async } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { LentaState } from './model/lenta-state';
import { LentaOptions } from './model/lenta-options';
import { BodyComponent } from './body/body.component';
import { BodyCellComponent } from './body/cell/body-cell.component';
import { BodyRowComponent } from './body/row/body-row.component';
import { HeaderComponent } from './header/header.component';
import { HeaderCellComponent } from './header/cell/header-cell.component';
import { FooterComponent } from './footer/footer.component';
import { BodyCellTemplateDirective } from './body/cell/body-cell-template.directive';
import { BodyRowTemplateDirective } from './body/row/body-row-template.directive';
import { PagingComponent } from './footer/paging/paging.component';
import { NgLentaApi } from './model/lenta-api';

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

    it('should set state options from input api', fakeAsync(() => {
        fixture.detectChanges();
        expect(cmp.lenta.options.paging).toEqual(expect.objectContaining({ pageSize: 10 }));

        cmp.lentaApi.setOptions({ paging: { pageSize: 20 } });
        fixture.detectChanges();
        expect(cmp.lenta.options.paging).toEqual(expect.objectContaining({ pageSize: 20 }));

        cmp.lentaApi.setOptions({ paging: { pageSize: 15 }, sorting: { enabled: false } });
        fixture.detectChanges();
        expect(cmp.lenta.options.paging).toEqual(expect.objectContaining({ pageSize: 15 }));
        expect(cmp.lenta.options.sorting).toEqual(expect.objectContaining({ enabled: false }));
    }));

    it('should set state columns from input api', fakeAsync(() => {
        fixture.detectChanges();
        expect(lenta.state.cols.length).toEqual(2);

        cmp.lentaApi.setColumns([
            { prop: 'new', name: 'New' }
        ]);
        fixture.detectChanges();
        expect(lenta.state.cols.length).toEqual(1);
    }));

    it('should set state rows from input api', fakeAsync(() => {
        fixture.detectChanges();
        expect(lenta.state.rows.length).toEqual(2);

        cmp.lentaApi.setRows([]);
        fixture.detectChanges();
        expect(lenta.state.rows.length).toEqual(0);

        cmp.lentaApi.setRows([{ id: 'a', name: 'row 1' }]);
        fixture.detectChanges();
        expect(lenta.state.rows.length).toEqual(1);
    }));
});

@Component({
    selector: 'ng-lenta-test-cmp',
    template: `
        <ng-lenta [api]="lentaApi"></ng-lenta>
    `
})
export class NgLentaTestCmp {
    @ViewChild(NgLentaComponent) lenta: NgLentaComponent = <any>undefined;

    lentaApi = new NgLentaApi();

    ngOnInit() {
        this.lentaApi
            .setRows([
                { id: 'a', name: 'row 1' },
                { id: 'b', name: 'row 2' }
            ])
            .setColumns([
                { prop: 'id', name: 'Id' },
                { prop: 'name', name: 'Name' }
            ])
            .setOptions({
                clientSide: true
            })
    }
}

