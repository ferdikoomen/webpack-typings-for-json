'use strict';

const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const handlebars = require('handlebars');

/**
 * Convert prop name to "camelCase" and support special cases
 * like prop names with special characters like "{0}"
 * @param key
 * @returns {string}
 */
function toPropName(key) {
    if (/^[a-z][a-z0-9\-_]+/gi.test(key)) {
        return camelCase(key);
    }
    return `'${key}'`;
}

/**
 * The keys in the resource file should all be in "snake-case", however we want to
 * use "camelCase" variable names in our code. So let's create a nice object that
 * contains a mapping between the original "snake-case" key and our "camelCase" variant.
 * The result is an object that looks like this:
 *
 * {
 *    someKey: 'some-key',
 *    anotherKey: 'another-key',
 *    nestedKey: {
 *       someKey: 'child-key.some-key',
 *       anotherKey: 'child-key.another-key'
 *    }
 *    ...
 * }
 */
function getExports(obj, exportValues, parentKey) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
        const prop = toPropName(key);
        const path = parentKey ? `${parentKey}.${key}` : key;
        if (Array.isArray(value)) {
            result[prop] = [];
            for (let i = 0; i < value.length; i++) {
                result[prop][i] = getExports(value[i], exportValues, `${path}[${i}]`);
            }
        } else if (typeof value === 'object') {
            result[prop] = getExports(value, exportValues, path);
        } else if (exportValues) {
            result[prop] = value;
        } else {
            result[prop] = path;
        }
    });
    return result;
}

function getExportTypes(obj) {
    const result = [];
    Object.values(obj).forEach((value) => {
        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                result.push(...getExportTypes(value[i]));
            }
        } else if (typeof value === 'object') {
            result.push(...getExportTypes(value));
        } else {
            result.push(value);
        }
    });
    return result.filter((value, index) => {
        return result.indexOf(value) === index;
    });
}

/**
 * Read and compile the handlebar template
 * @param name Name of the template
 */
function readTemplate(name) {
    const templatePath = path.resolve(__dirname, name);
    const templateContent = fs.readFileSync(templatePath, 'utf8').toString();
    return handlebars.compile(templateContent, {
        strict: true,
        noEscape: true,
        knownHelpersOnly: true,
        knownHelpers: {
            object: true,
        },
    });
}

/**
 * Get the modified source (output of this loader)
 * @param exports Modified new exports
 */
function getSource(exports) {
    return `module.exports = ${JSON.stringify(exports)};`;
}

module.exports = {
    readTemplate,
    getExports,
    getExportTypes,
    getSource,
};
