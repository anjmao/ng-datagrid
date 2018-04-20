import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngl-row]' })
export class BodyRowTemplateDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}
