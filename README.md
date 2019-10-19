# Webpack typings for JSON loader

[![NPM](https://badgen.net/npm/v/webpack-typings-for-json)](https://www.npmjs.com/package/webpack-typings-for-json)
[![License](https://badgen.net/npm/license/webpack-typings-for-json)](https://www.npmjs.com/package/webpack-typings-for-json)
[![Dependencies](https://badgen.net/david/dep/ferdikoomen/webpack-typings-for-json)](https://david-dm.org/ferdikoomen/webpack-typings-for-json)
[![Build Size](https://badgen.net/bundlephobia/minzip/webpack-typings-for-json)](https://bundlephobia.com/result?p=webpack-typings-for-json)
[![Build Status](https://badgen.net/travis/ferdikoomen/webpack-typings-for-json/master)](https://travis-ci.org/ferdikoomen/webpack-typings-for-json)
[![Quality](https://badgen.net/lgtm/grade/javascript/g/ferdikoomen/webpack-typings-for-json)](https://lgtm.com/projects/g/ferdikoomen/webpack-typings-for-json)

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

## Example

Let's say our project uses a JSON based localization setup, like [i18next](https://www.i18next.com/) 
and we have the following file: `~/src/locale/en.js` in your project, containing the following
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
definition file `~/src/locale/en.d.ts` with the following content:

```typescript
interface Keys {
    readonly alignLeft: string;
    readonly alignCenter: string;
    readonly alignRight: string;
    readonly justify: string;
    readonly bulletList: string;
    readonly numberedList: string;
    readonly decreaseIndent: string;
    readonly increaseIndent: string;
}
declare const locale: Keys;
export default locale;
```

```typescript
import locale from './en.json';

console.log(locale.alignLeft); // "align-left"
console.log(locale.alignRight); // "align-right"
console.log(locale.alignCenter); // "align-center"
console.log(locale.justify); // "justify"
```

In your (React) component you can import this localization file and use 
the keys as input for the translation function / library to fetch the
right string.

```typescript jsx
import * as React from 'react';
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
