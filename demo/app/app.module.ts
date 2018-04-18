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
import { DataSourceExample } from './examples/data-source.component';
import { NgLentaModule } from 'ng-lenta';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/data-sources',
        pathMatch: 'full'
    },
    {
        path: 'data-sources',
        component: DataSourceExample,
        data: { title: 'Data source' }
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
        // {
        //     provide: NG_SELECT_DEFAULT_CONFIG,
        //     useValue: {
        //         notFoundText: 'Items not found',
        //         addTagText: 'Add item',
        //         typeToSearchText: 'Type to search',
        //         loadingText: 'Loading...',
        //         clearAllText: 'Clear all'
        //     }
        // }
    ],
    declarations: [
        AppComponent,
        LayoutHeaderComponent,
        LayoutSidenavComponent,
        DataSourceExample
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

