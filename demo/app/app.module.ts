import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LayoutHeaderComponent } from './layout/header.component';
import { LayoutSidenavComponent } from './layout/sidenav-component';
import { DataService } from './shared/data.service';
import { ClientSide } from './examples/client-side';
import { NgLentaModule } from 'ng-lenta';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/client-side',
        pathMatch: 'full'
    },
    {
        path: 'client-side',
        component: ClientSide,
        data: { title: 'Client side' }
    }
];

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(
            appRoutes,
            {
                useHash: true
            }
        ),
        NgLentaModule
    ],
    providers: [
        DataService,
    ],
    declarations: [
        AppComponent,
        LayoutHeaderComponent,
        LayoutSidenavComponent,
        ClientSide
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

