# Webpack typings for JSON loader

[![NPM][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Coverage][coverage-image]][coverage-url]
[![Quality][quality-image]][quality-url]
[![Code Climate][climate-image]][climate-url]
[![Downloads][downloads-image]][downloads-url]

> Webpack loader that generates TypeScript typings for JSON files

## Installation

```
npm install webpack-typings-for-json --save-dev
```

**webpack.config.js**

```javascript
module.exports = {
    module: {
        rules: [{
            test: /\.json$/,
            type: 'javascript/auto',
            use: [{
                loader: 'webpack-typings-for-json'
            }]
        }]
    }
};
```

## Example (i18n)

Let's say our project uses a JSON based localization setup, like [i18next](https://www.i18next.com/)
and we have the following file: `./src/locale/en.js` in your project, containing the following
(simple) resource strings:

```json
{
    "align-left": "Align left",
    "align-center": "Align centre",
    "align-right": "Align right",
    "justify": "Justify",
    "bullet-list": "Bullet list",
    "numbered-list": "Numbered list",
    "decrease-indent": "Decrease indent",
    "increase-indent": "Increase indent"
}
```

When we add the `webpack-typings-for-json` loader, this will generate a TypeScript
definition file `./src/locale/en.d.ts` with the following content:

```typescript
declare const locale = {
    alignLeft: 'align-left',
    alignCenter: 'align-center',
    alignRight: 'align-right',
    justify: 'justify',
    bulletList: 'bullet-list',
    numberedList: 'numbered-list',
    decreaseIndent: 'decrease-indent',
    increaseIndent: 'increase-indent',
} as const;

export type LocaleKey = string;

export default locale;
```

In your Typescript file you will now be able to import this localization
file and get type hints with the available properties. The values for
these properties are the keys of the original json:

```typescript
import locale from './en.json';

console.log(locale.alignLeft); // "align-left"
console.log(locale.alignRight); // "align-right"
console.log(locale.alignCenter); // "align-center"
console.log(locale.justify); // "justify"
```

In your (React) component you can import this localization file and use
the properties as input for the translation function / library to fetch the
right string. This means: **No more hard coded keys. And if someone changes
the JSON, you will get compile time warnings!**

```typescript jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import locale from './en.json';

export const MyComponent = () => {
    const { t } = useTranslation();
    return (
        <div>
           <span>{t(locale.alignLeft)}</span>
           <span>{t(locale.alignRight)}</span>
           <span>{t(locale.alignCenter)}</span>
           <span>{t(locale.justify)}</span>
        </div>
    );
};
```

## Example (properties)

Some projects use a JSON file as a 'configuration' or 'settings' file that specifies build
properties. For instance: A location to a server, some theme settings, etc. We normally embed
these properties during build time (using Webpack), but they are never typed... You can use
this same loader to generate typings for this JSON file and use the values, as if you
are using a normal Typescript object.

Let's say you have the following settings file `./src/settings.json`:

```json
{
    "server": "https://github.com",
    "username": "John Doe",
    "theme": {
        "color": "#FF0000",
        "fonts": {
            "header": "{ font-family: monospace; font-size: 20px; }",
            "body": "{ font-family: monospace; font-size: 12px; }"
        }
    }
}
```

When we add the `webpack-typings-for-json` loader, then we can specify
the option to include the values, rather then the keys in the output
object:

**webpack.config.js**

```javascript
module.exports = {
    module: {
        rules: [{
            test: /\.json$/,
            type: 'javascript/auto',
            use: [{
                loader: 'webpack-typings-for-json',
                options: {
                    exportValues: true
                }
            }]
        }]
    }
};
```

this will generate a TypeScript definition file `./src/settings.json.d.ts` with
the following content, as you can see this is just a normal Typescript interface
that matches the JSON we are importing:

```typescript
const locale = {
    server: 'https://github.com',
    username: 'John Doe',
    theme: {
        color: '#FF0000',
        fonts: {
            header: '{ font-family: monospace; font-size: 20px; }',
            body: '{ font-family: monospace; font-size: 12px; }',
        },
    },
} as const;

export type LocaleKey = string;

export default locale;
```

In your Typescript file you will now be able to import this settings
file and get type hints with the available properties. The values for
these properties are directly coming from the imported json

```typescript
import settings from './settings.json';

console.log(settings.server); // https://github.com
console.log(settings.username); // John Doe
console.log(settings.theme.color); // #FF0000
console.log(settings.theme.fonts.header); // { font-family: monospace; font-size: 20px; }
console.log(settings.theme.fonts.body); // { font-family: monospace; font-size: 12px; }
```

## Known issues

As the loader generates typing files, it is wise to tell webpack to ignore them.
The fix is luckily very simple. Webpack ships with a "WatchIgnorePlugin" out of the box.
Simply add this to your webpack plugins:

```javascript
plugins: [
    new webpack.WatchIgnorePlugin([
        /json\.d\.ts$/
    ]),
    ...
]
```

You might see project warnings when you have not yet build the project. This happens
because Typescript cannot import JSON files (since they are not official modules).
In order to fix this you can add a type definition to your project:

**./typings/json.d.ts**
```typescript
declare module '*.json' {

    declare const keys: {
        readonly [key: string]: string;
    };

    export type LocaleKey = string;

    export default keys;
}
```

**tsconfig.json**
```json
{
    ...
    "files": [
        "./typings/json.d.ts"
    ],
    ...
}
```

[npm-url]: https://npmjs.org/package/webpack-typings-for-json
[npm-image]: https://img.shields.io/npm/v/webpack-typings-for-json.svg
[license-image]: http://img.shields.io/npm/l/webpack-typings-for-json.svg
[license-url]: LICENSE
[travis-url]: https://travis-ci.org/ferdikoomen/webpack-typings-for-json
[travis-image]: https://img.shields.io/travis/ferdikoomen/webpack-typings-for-json.svg
[deps-url]: https://david-dm.org/ferdikoomen/webpack-typings-for-json
[deps-image]: https://img.shields.io/david/ferdikoomen/webpack-typings-for-json.svg
[coverage-url]: https://codecov.io/gh/ferdikoomen/webpack-typings-for-json
[coverage-image]: https://img.shields.io/codecov/c/github/ferdikoomen/webpack-typings-for-json.svg
[quality-url]: https://lgtm.com/projects/g/ferdikoomen/webpack-typings-for-json
[quality-image]: https://img.shields.io/lgtm/grade/javascript/g/ferdikoomen/webpack-typings-for-json.svg
[climate-url]: https://codeclimate.com/github/ferdikoomen/webpack-typings-for-json
[climate-image]: https://img.shields.io/codeclimate/maintainability/ferdikoomen/webpack-typings-for-json.svg
[downloads-image]: http://img.shields.io/npm/dm/webpack-typings-for-json.svg
[downloads-url]: http://npm-stat.com/charts.html?package=webpack-typings-for-json.svg
