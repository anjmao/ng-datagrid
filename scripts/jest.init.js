// angular 2+ common 
require('core-js/es6/reflect');
require('core-js/es7/reflect');

// temp memory leak fix https://github.com/thymikee/jest-preset-angular/pull/135
const htmlEl = window['HTMLElement'];
window['HTMLElement'] = undefined;
require('zone.js/dist/zone-node.js');
window['HTMLElement'] = htmlEl;

require('zone.js/dist/proxy.js');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('jest-zone-patch');
const getTestBed = require('@angular/core/testing').getTestBed;
const BrowserDynamicTestingModule = require('@angular/platform-browser-dynamic/testing').BrowserDynamicTestingModule;
const platformBrowserDynamicTesting = require('@angular/platform-browser-dynamic/testing').platformBrowserDynamicTesting;

getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);
