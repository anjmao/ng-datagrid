import { Component, OnInit } from '@angular/core';
import { DataService, Person } from '../shared/data.service';
import { Column } from '../../../src/ng-lenta/public-types';

@Component({
    selector: 'data-source',
    template: `
        <ng-lenta [rows]="people" [columns]="columns">
            <ng-template ngl-cell="email" let-row="row">
                <b>{{row.email}}</b>
            </ng-template>
            <ng-template ngl-cell="isActive" let-row="row">
                <i *ngIf="row.isActive" class="mdi mdi-check mdi-18px text-success" aria-hidden="true"></i>
            </ng-template>
        </ng-lenta>
    `
})

export class DataSourceExample implements OnInit {

    people: Person[] = [];
    columns: Column[] = [
        { prop: 'name' },
        { prop: 'email' },
        { prop: 'company' },
        { prop: 'isActive' }
    ]

    constructor(private dataService: DataService) { }

    ngOnInit() { 
        this.dataService.getPeople().subscribe((p) => this.people = p);
    }
}
