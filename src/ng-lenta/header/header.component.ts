import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ngl-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'ngl-header',
        'role': 'row'
    },
    template: `
       <ng-content></ng-content>
    `
})
export class HeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}
