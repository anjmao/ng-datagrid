[![npm version](https://badge.fury.io/js/ng-lenta.svg)](https://badge.fury.io/js/ng-lenta)
[![Build Status][travis-badge]][travis-badge-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![gzip bundle size](http://img.badgesize.io/https://unpkg.com/ng-lenta@latest/bundles/ng-lenta.umd.min.js?compression=gzip&style=flat-square)][ng-lenta-url]

[travis-badge]: https://travis-ci.org/ng-lenta.svg?branch=master
[travis-badge-url]: https://travis-ci.org/ng-lenta
[coveralls-image]: https://coveralls.io/repos/github/ng-lenta/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/ng-lenta?branch=master
[ng-lenta-url]: https://unpkg.com/@ng-lenta@latest

# Angular ng-lenta - data table
See [Demos](https://anjmao.github.io/ng-lenta) or try in [Stackblitz](https://stackblitz.com/edit/ng-lenta?file=app%2Fapp.component.ts)

Table of contents
=================

  * [Features](#features)
  * [Getting started](#getting-started)
  * [API](#api)
  * [Change detection](#change-detection)
  * [Custom styles](#custom-styles)
    * [Validation state](#validation-state)
  * [Contributing](#contributing)
  * [Development](#development)
  * [Inspiration](#inspiration)

## Features
- [] TODO

## Getting started
### Step 1: Install `ng-lenta`:

#### NPM
```shell
npm install --save @ng-lenta
```
#### YARN
```shell
yarn add @ng-lenta
```
### Step 2: Import the NgSelectModule and angular FormsModule module:
```js
import { NgLentaModule } from '@ng-lenta';

@NgModule({
  declarations: [AppComponent],
  imports: [NgLentaModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Step 3: Include a theme: 
To allow customization and theming, `ng-lenta` bundle includes only generic styles that are necessary for correct layout and positioning. To get full look of the control, include one of the themes in your application. If you're using the Angular CLI, you can add this to your `styles.scss` or include it in `angular-cli.json`.

```scss
@import "~@ng-lenta/themes/default.theme.css";
// ... or 
@import "~@ng-lenta/themes/material.theme.css";

```


### Step 4 (Optional): Configuration 
You can also set global configuration and localization messages by providing custom NG_SELECT_DEFAULT_CONFIG
```js
    providers: [
        {
            provide: NG_LENTA_DEFAULT_CONFIG,
            useValue: {
                notFoundText: 'Custom not found'
            }
        }
    ]
```
### SystemJS
If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, `map` needs to tell the System loader where to look for `ng-lenta`:
```js
map: {
  '@ng-lenta': 'node_modules/ng-lenta/bundles/ng-lenta.umd.js',
}
```

## API
### Inputs
| Input  | Type | Default | Required | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| [todo] | `todo`  | `false` | no | Allows to create custom todo. |


### Outputs

| Output  | Description |
| ------------- | ------------- |
| (todo)  | Fired todo |


### Methods
 Name  | Description |
| ------------- | ------------- |
| todo  | Opens todo |


## Change Detection
ng-lenta component implements `OnPush` change detection which means the dirty checking checks for immutable 
data types. That means if you do object mutations like:

```javascript
this.items.push({id: 1, name: 'New item'})
``` 

Component will not detect a change. Instead you need to do:

```javascript
this.items.push({id: 1, name: 'New item'})
this.items = [...this.items];
```

This will cause the component to detect the change and update. Some might have concerns that
this is a pricey operation, however, it is much more performant than running `ngDoCheck` and
constantly diffing the array.

## Custom styles
If you are not happy with default styles you can easily override them with increased selector specificity or creating your own theme. E.g.

```html
<ng-lenta class="custom"></ng-lenta>
```

```css
.ng-lenta.custom {
    border:0px;
    min-height: 0px;
    border-radius: 0;
}
.ng-lenta.custom .ng-lenta-container  {            
    min-height: 0px;
    border-radius: 0;
}
```


## Contributing

Contributions are welcome. You can start by looking at [issues](https://github.com/ng-lenta/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) with label *Help wanted*  or creating new Issue with proposal or bug report.
Note that we are using https://conventionalcommits.org/ commits format.

## Development

Perform the _clone-to-launch_ steps with these terminal commands.

### Run demo page in watch mode
```
git clone https://github.com/ng-lenta
cd ng-lenta
yarn
yarn run start
```
### Testing
```
yarn run test
or
yarn run test:watch
```

### Release

To release to npm just run `./release.sh`, of course if you have permissions ;)

