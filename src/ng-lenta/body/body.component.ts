import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngl-body',
    host: {
        class: 'ngl-body'
    },
    template: '<ng-content></ng-content>'
})
export class BodyComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
