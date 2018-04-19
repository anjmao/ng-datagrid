import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({ selector: '[ngl-cell]' })
export class BodyCellTemplateDirective {
    @Input('ngl-cell') column: string; 
    constructor(public templateRef: TemplateRef<any>) { }
}

