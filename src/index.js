import { writeFileSync } from 'fs';
import { getExports, getExportTypes, getSource } from './utils';
import Handlebars from 'handlebars/runtime';
import $export from './templates/export.hbs';
import $exportEntry from './templates/export-entry.hbs';

const template = Handlebars.template($export);
const templateEntry = Handlebars.template($exportEntry);
Handlebars.registerPartial('entry', templateEntry);
Handlebars.registerHelper('object', function (context, options) {
    return typeof context === 'object' ? options.fn(this) : options.inverse(this);
});

/**
 * The 'webpack-typings-for-json' loader writes out Typescript definition files
 * for each imported JSON file. We can then use these definition files to use
 * the keys in our code and get type checking for these files. A handy use case
 * is usage for i18n keys inside a JSON file.
 *
 * @param source The content of the loaded JSON file.
 */
module.exports = function (source) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = this.getOptions();
    const locals = JSON.parse(source);
    const exportValues = options && options.exportValues === true;
    const exportType = options && options.exportType === true;
    const exports = getExports(locals, exportValues);
    const exportTypes = getExportTypes(exports);

    // Get the path for the definition file, this is relative to the currently loaded json file... easy!
    const definitionFile = this.resourcePath.replace(/\.json$/g, '.json.d.ts');
    const definitionFileContent = template({
        exports,
        exportType,
        exportTypes,
    });

    // Write the definition file, we do not use Webpack's emitFile() method, since
    // that would then track this output file as a dependency. We don't want this,
    // since these files are placed inside the source folder!
    writeFileSync(definitionFile, definitionFileContent);

    // Here comes the Webpack magic: Lets say we have the following i18n code example:
    //
    // import i18n from 'i18next';
    // import Locale from '../../locale/en.json';
    //
    // console.log(i18n.t(Locale.someKey));
    // console.log(i18n.t(Locale.anotherKey));
    //
    // As you can see, we import a resource file as a variable with the name 'locale'.
    // Normally this variable will then contain the loaded JSON, since Webpack will bundle
    // and expose the JSON. As a result 'locale.someKey' will contain the actual value of that key.
    // However this is not what we want, we want to return the key name! So, when we request
    // the content of 'locale.someKey' it should return the string 'some-key'.
    // Luckily this is easy, instead of returning the JSON, we return a new javascript object
    // that contains 'key:key' objects instead of 'key:value'. We already created this object
    // in the step above! So, we can just stringify that and we are in business.

    return getSource(exports);
};
