import { Component, OnInit } from '@angular/core';
import { DataService, Person } from '../shared/data.service';
import { LentaColumn, LentaOptions, LentaColumns } from 'ng-lenta';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'data-source',
    template: `
        <div class="mb-5">
        <button (click)="showAllRows()">Show all rows</button>
            <button (click)="changeRows()">Slice rows(0-5)</button>
            <button (click)="clearRows()">Clear rows</button>
        </div>
        <ng-lenta [rows]="people" [columns]="columns" [options]="options">
            <ng-template ngl-cell="email" let-row="row">
                <b>{{row.email}}</b>
            </ng-template>
            <ng-template ngl-cell="isActive" let-row="row">
                <i *ngIf="row.isActive" class="mdi mdi-check mdi-18px text-success"></i>
                <i *ngIf="!row.isActive" class="mdi mdi-close mdi-18px text-danger"></i>
            </ng-template>
        </ng-lenta>
    `
})
export class DataSourceExample implements OnInit {

    allPeople: Person[] = [];
    people: Person[] = [];
    columns: LentaColumn[] = LentaColumns.create([
        { prop: 'name', name: 'Name' },
        { prop: 'email', name: 'Email', size: { flex: '2'} },
        { prop: 'company', name: 'Company' },
        { prop: 'age', name: 'Age' },
        { prop: 'isActive', name: 'Active', size: { width: '80px'} }
    ]);
    
    page = 1;
    totalCount = 0;
    options = new LentaOptions({
        clientSide: true
    });

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getPeople().pipe(delay(500)).subscribe((p) => {
            this.totalCount = p.length;
            this.allPeople = [...p, ...p, ...p, ...p, ...p, ...p];
            this.people = this.allPeople;
        });
    }

    showAllRows() {
        this.people = [...this.allPeople];
    }

    changeRows() {
        this.people = [...this.allPeople.slice(0, 5)];
    }

    clearRows() {
        this.people = [];
    }
}
