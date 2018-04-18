import { NgModule } from '@angular/core';
import { NgLentaComponent } from './ng-lenta.component';
import { CommonModule } from '@angular/common';
import { BodyRowComponent } from './body/row/body-row.component';
import { BodyCellComponent } from './body/cell/body-cell.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        NgLentaComponent
    ],
    declarations: [
        NgLentaComponent,
        BodyRowComponent,
        BodyCellComponent
    ],
    providers: [],
})
export class NgLentaModule { }
