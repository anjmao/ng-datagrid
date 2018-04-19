import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngl-footer',
    template: '<div>footer</div>',
    host: {
        'class': 'ngl-footer'
    }
})
export class FooterComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
