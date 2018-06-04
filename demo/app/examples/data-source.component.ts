import { Component, OnInit } from '@angular/core';
import { DataService, Person } from '../shared/data.service';
import { delay } from 'rxjs/operators';
import { NgLentaApi } from 'ng-lenta';

@Component({
    selector: 'data-source',
    template: `
        <div class="mb-5">
            <button class="btn btn-link" (click)="showAllRows()">Show all rows</button>
            <button class="btn btn-link" (click)="changeRows()">Slice rows(0-5)</button>
            <button class="btn btn-link" (click)="clearRows()">Clear rows</button>
            <button class="btn btn-link" (click)="firstPage()">First page</button>
            <button class="btn btn-link" (click)="secondPage()">Second page</button>
            <button class="btn btn-link" (click)="nextPage()">Next page</button>
            <button class="btn btn-link" (click)="previousPage()">Previous page</button>
        </div>
        <ng-lenta [api]="peopleList">
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
    peopleList = new NgLentaApi()
    .setColumns([
        { prop: 'name', name: 'Name' },
        { prop: 'email', name: 'Email', size: { flex: '2'} },
        { prop: 'company', name: 'Company' },
        { prop: 'age', name: 'Age' },
        { prop: 'isActive', name: 'Active', size: { width: '80px'} }
    ])
    .setOptions({
        clientSide: true
    });

    allPeople: Person[] = [];
    people: Person[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getPeople().pipe(delay(500)).subscribe((p) => {
            this.allPeople = [...p, ...p, ...p, ...p, ...p, ...p];
            this.people = this.allPeople;
            this.peopleList.setRows(this.people);
        });

        this.peopleList.pageChange$.subscribe((page) => {
            console.log('Page ' + page);
        });
    }

    secondPage() {
        this.peopleList.setPage(2);
    }

    firstPage() {
        this.peopleList.setPage(1);
    }

    nextPage() {
        this.peopleList.setNextPage();
    }

    previousPage() {
        this.peopleList.setPreviousPage();
    }

    showAllRows() {
        this.people = [...this.allPeople];
        this.peopleList.setRows(this.people);
    }

    changeRows() {
        this.people = [...this.allPeople.slice(0, 5)];
        this.peopleList.setRows(this.people);
    }

    clearRows() {
        this.people = [];
        this.peopleList.setRows(this.people);
    }
}
