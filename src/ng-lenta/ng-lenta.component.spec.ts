import { NgLentaComponent } from './ng-lenta.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LentaState } from './model/state';
import { LentaOptions } from '..';

describe('NgLentaComponent', () => {

    let cmp: NgLentaComponent;
    let fixture: ComponentFixture<NgLentaComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NgLentaComponent],
            providers: [
                LentaOptions,
                LentaState, 
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ],
        });

        fixture = TestBed.createComponent(NgLentaComponent);
        cmp = fixture.componentInstance;
    });

    it('should be defined', () => {
        expect(cmp).toBeDefined();
    });
});
