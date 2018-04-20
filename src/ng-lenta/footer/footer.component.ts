import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngl-footer',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'ngl-footer'
    }
})
export class FooterComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
