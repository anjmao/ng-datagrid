import 'core-js/client/shim';
import 'reflect-metadata';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
import 'tslib';

if (process.env.ENV === 'build') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
