
# VueMfk

[![npm](https://img.shields.io/npm/v/vue-mfk.svg)](https://www.npmjs.com/package/vue-mfk) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A Vue.js Plugin for MFK Input and Favorites.
> Implemented using VuetifJS.com (Material Design)

## Installation

```bash
npm install --save vue-mfk
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import VueMfk from 'vue-mfk'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vue-mfk/dist/vue-mfk.css'

Vue.use(VueMfk)
```

### Browser

```html
<!-- Include after Vue -->
<!-- VuetifyJS files -->
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
<link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
<script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>
<!-- Lodash -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"></script>
<!-- Local files -->
<link rel="stylesheet" href="vue-mfk/dist/vue-mfk.css"></link>
<script src="vue-mfk/dist/vue-mfk.js"></script>

<!-- From CDN (TBD) -->
```
## API
### Services
|Service| Type | Descirption |
|--|--|--|
| ValidateMfk | function  | `impornt {ValidateMfk} from 'vue-mfk'` <br> Call to function returns a promise. Promise gets `resolved` when MFK is valid, and gets `rejected` with error message when MFK is invalid. |
### Components
#### mfk-input
| Option | Type(s) | Default | Description |
|--|--|--|--|
| value | String | *Required*| '-' separated MFK value
| validate | Boolean | true | Specifies either MFK should be automatically validated on input
| disabled | Boolean | false | Specified either entire MFK input should be disabled
| disabledFields | Array | false | Zero based array of int to specify which MFK input elements should be disabled. Example, to disable IAcct `:disabled-fields="[5]"`|
| errorMessage | String | *NULL* | Display custom error message. Supports two-way binding with `.sync` modifier ( `:error-message.sync="myErrorField"` )<br>Default *NULL* value will be ignored, and regular MFK validation errors will be shown if applicable. |
### mfk-favorite
| Option | Type(s) | Default | Description |
|--|--|--|--|
| value | String | *Required* | '-' separated MFK value |
| favorites | Array | *Required* | Array of favorite MFKs.<br>Example: `[{ alias: "My Fave MFK", mfk: "260-43-5064-40100-00000000-6026-520-20100-00-0000" }]` |
| disabled | Boolean | false | Specifies either field is disabled |
## Development

### Launch visual tests

```bash
npm run dev
```

### Launch Karma with coverage

```bash
npm run dev:coverage
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```


## Publishing

The `prepublish` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## License

[MIT](http://opensource.org/licenses/MIT)
