import { NgModule } from '@angular/core';
import { NgLentaComponent } from './ng-lenta.component';
import { CommonModule } from '@angular/common';
import { BodyRowComponent } from './body/row/body-row.component';
import { BodyCellComponent } from './body/cell/body-cell.component';
import { HeaderComponent } from './header/header.component';
import { HeaderCellComponent } from './header/cell/header-cell.component';

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
        BodyCellComponent,
        HeaderComponent,
        HeaderCellComponent
    ],
    providers: [],
})
export class NgLentaModule { }
