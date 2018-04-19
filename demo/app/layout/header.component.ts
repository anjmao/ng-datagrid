import { Component, Input, OnInit } from '@angular/core';
const defaultTheme = require('./../../../src/themes/default.theme.scss');

@Component({
    selector: 'layout-header',
    template: `
        <nav class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar bg-dark">
            <a class="navbar-brand" href="#">
                <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="32px" height="32px"/>
                ng-lenta@{{version}}
            </a>
            <button class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse">
                <div ngbDropdown class="d-inline-block">
                    <button class="btn btn-outline-light btn-sm" style="width: 130px;" ngbDropdownToggle>{{theme}}</button>
                    <div ngbDropdownMenu>
                        <button (click)="setTheme('Default theme')" class="dropdown-item btn-sm">Default theme</button>
                    </div>
                </div>

                <ul class="navbar-nav mr-auto">
                </ul>

                <!--<form class="form-inline my-2 my-lg-0">
                    <a class="github-button"
                       href="https://github.com/anjmao/ng-lenta"
                       data-icon="mark-github"
                       data-size="large"
                       data-show-count="true"
                       aria-label="Visit ng-lenta on GitHub">Github</a>
                </form>-->
            </div>
        </nav>
    `
})
export class LayoutHeaderComponent implements OnInit {
    theme = 'Default theme';
    @Input() version: string;

    ngOnInit() {
        defaultTheme.use();
    }

    setTheme(theme) {
        this.theme = theme;
        if (this.theme === 'Default theme') {
            defaultTheme.use();
        } else {
            defaultTheme.unuse();
        }
    }
}


