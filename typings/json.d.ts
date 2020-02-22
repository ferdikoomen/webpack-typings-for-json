/**
 * In your project your are using JSON modules, so you can import JSON files
 * using the following standard imports:
 *
 * <code>
 * import Locale from '../locale/en.js';
 *
 * console.log(Locale.myResourceKey);
 * </code>
 *
 * ...However since we are using Typescript we want to have type definitions for
 * the imported modules. For this we are using the 'webpack-typings-for-json' loader.
 * This loader will generate the .d.ts definition files next to our JSON files.
 * However, when we do a clean build we are missing these files, so we need to
 * register a generic module so the Typescript compiler will not complain about
 * any missing modules.
 */
declare module '*.json' {

    declare const keys: {
        readonly [key: string]: string;
    };

    export type LocaleKey = string;

    export default keys;
}
