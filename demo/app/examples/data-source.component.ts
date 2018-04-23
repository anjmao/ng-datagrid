import { Component, OnInit } from '@angular/core';
import { DataService, Person } from '../shared/data.service';
import { LentaColumn, LentaOptions } from '../../../src/ng-lenta/public-types';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'data-source',
    template: `
        <div class="mb-5">
            <button (click)="changeRows()">Change rows</button>
        </div>
        <ng-lenta [rows]="people" [columns]="columns" [options]="options">
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
    columns: LentaColumn[] = [
        { prop: 'name', name: 'Name' },
        { prop: 'email', name: 'Email' },
        { prop: 'company', name: 'Company' },
        { prop: 'isActive', name: 'Active' }
    ];
    page = 1;
    totalCount: number;
    options: LentaOptions = {
        clientSide: true,
        paging: {}
    }

    constructor(private dataService: DataService) { }

    ngOnInit() { 
        this.dataService.getPeople().pipe(delay(500)).subscribe((p) => {
            this.totalCount = p.length;
            this.people = [...p, ...p, ...p, ...p, ...p, ...p];
        });
    }

    changeRows() {
        this.people = [...this.people.slice(0, 5)];
    }
}
