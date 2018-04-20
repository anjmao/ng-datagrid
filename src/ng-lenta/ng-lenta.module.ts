import { NgModule } from '@angular/core';
import { NgLentaComponent } from './ng-lenta.component';
import { CommonModule } from '@angular/common';
import { BodyRowComponent } from './body/row/body-row.component';
import { BodyCellComponent } from './body/cell/body-cell.component';
import { HeaderComponent } from './header/header.component';
import { HeaderCellComponent } from './header/cell/header-cell.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { BodyCellTemplateDirective } from './body/cell/body-cell-template.directive';
import { BodyRowTemplateDirective } from './body/row/body-row-template.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        NgLentaComponent,
        BodyCellTemplateDirective,
        BodyRowTemplateDirective
    ],
    declarations: [
        NgLentaComponent,
        BodyComponent,
        BodyRowComponent,
        BodyCellComponent,
        HeaderComponent,
        HeaderCellComponent,
        FooterComponent,
        BodyCellTemplateDirective,
        BodyRowTemplateDirective
    ],
    providers: [],
})
export class NgLentaModule { }
