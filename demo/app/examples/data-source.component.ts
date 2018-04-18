import { Component, OnInit } from '@angular/core';
import { DataService, Person } from '../shared/data.service';
import { Column } from '../../../src/ng-lenta/public-types';

@Component({
    selector: 'data-source',
    template: `
        <ng-lenta [rows]="people" [columns]="columns"></ng-lenta>
    `
})

export class DataSourceExample implements OnInit {

    people: Person[] = [];
    columns: Column[] = [
        { prop: 'name' },
        { prop: 'email' },
        { prop: 'company' },
        { prop: 'gender' },
    ]

    constructor(private dataService: DataService) { }

    ngOnInit() { 
        this.dataService.getPeople().subscribe((p) => this.people = p);
    }
}
