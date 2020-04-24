'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const options = require('../webpack.config.js');

test('is generated correctly', (done) => {
    webpack(options, (err, stats) => {
        if (err) {
            return done(err);
        } else if (stats.hasErrors()) {
            return done(stats.toString());
        }

        const bundlePath = path.resolve(process.cwd(), './test/dist/bundle.js');
        const locale1Path = path.resolve(process.cwd(), './test/locale1.json.d.ts');
        const locale2Path = path.resolve(process.cwd(), './test/locale2.json.d.ts');
        const locale3Path = path.resolve(process.cwd(), './test/locale3.json.d.ts');
        const settings = path.resolve(process.cwd(), './test/settings.json.d.ts');

        const bundleExists = fs.existsSync(bundlePath);
        const locale1Exists = fs.existsSync(locale1Path);
        const locale2Exists = fs.existsSync(locale2Path);
        const locale3Exists = fs.existsSync(locale3Path);
        const settingsExists = fs.existsSync(settings);

        const bundleStats = fs.statSync(bundlePath);
        const locale1Stats = fs.statSync(locale1Path);
        const locale2Stats = fs.statSync(locale2Path);
        const locale3Stats = fs.statSync(locale3Path);
        const settingsStats = fs.statSync(settings);

        const bundleContent = fs.readFileSync(bundlePath).toString();
        const locale1Content = fs.readFileSync(locale1Path).toString();
        const locale2Content = fs.readFileSync(locale2Path).toString();
        const locale3Content = fs.readFileSync(locale3Path).toString();
        const settingsContent = fs.readFileSync(settings).toString();

        expect(bundleExists).toBeTruthy();
        expect(locale1Exists).toBeTruthy();
        expect(locale2Exists).toBeTruthy();
        expect(locale3Exists).toBeTruthy();
        expect(settingsExists).toBeTruthy();

        expect(bundleStats.size).toBeGreaterThan(0);
        expect(locale1Stats.size).toBeGreaterThan(0);
        expect(locale2Stats.size).toBeGreaterThan(0);
        expect(locale3Stats.size).toBeGreaterThan(0);
        expect(settingsStats.size).toBeGreaterThan(0);

        expect(locale1Content).toContain("alignLeft: 'align-left',");
        expect(locale1Content).toContain("alignCenter: 'align-center',");
        expect(locale1Content).toContain("alignRight: 'align-right',");
        expect(locale1Content).toContain("justify: 'justify',");
        expect(locale1Content).toContain("bulletList: 'bullet-list',");
        expect(locale1Content).toContain("numberedList: 'numbered-list',");
        expect(locale1Content).toContain("decreaseIndent: 'decrease-indent',");
        expect(locale1Content).toContain("increaseIndent: 'increase-indent',");

        expect(locale2Content).toContain("firstName: 'first-name',");
        expect(locale2Content).toContain("lastName: 'last-name',");
        expect(locale2Content).toContain("street: 'address.street',");
        expect(locale2Content).toContain("number: 'address.number',");
        expect(locale2Content).toContain("city: 'address.city',");
        expect(locale2Content).toContain("name: 'first-level.name',");
        expect(locale2Content).toContain("name: 'first-level.second-level.name',");
        expect(locale2Content).toContain("name: 'first-level.second-level.third-level.name',");
        expect(locale2Content).toContain("firstName: 'relationships.family[0].first-name',");
        expect(locale2Content).toContain("lastName: 'relationships.family[0].last-name',");
        expect(locale2Content).toContain("relation: 'relationships.family[0].relation',");
        expect(locale2Content).toContain("firstName: 'relationships.family[1].first-name',");
        expect(locale2Content).toContain("lastName: 'relationships.family[1].last-name',");
        expect(locale2Content).toContain("relation: 'relationships.family[1].relation',");

        expect(locale3Content).toContain("camelCaseKey1: 'group1.camelCaseKey1',");
        expect(locale3Content).toContain("camelCaseKey2: 'group1.camelCaseKey2',");
        expect(locale3Content).toContain("camelCaseKey3: 'group1.camelCaseKey3',");
        expect(locale3Content).toContain("'{0}': 'group1.{0}',");
        expect(locale3Content).toContain("'{1}': 'group1.{1}',");
        expect(locale3Content).toContain("title: 'group2.title',");
        expect(locale3Content).toContain("'-special-key-1': 'group2.-special-key-1',");
        expect(locale3Content).toContain("'0special-key-2': 'group2.0special-key-2',");
        expect(locale3Content).toContain("'$special-key-3': 'group2.$special-key-3',");
        expect(locale3Content).toContain("'#special-key-4': 'group2.#special-key-4',");
        expect(locale3Content).toContain("'&special-key-5': 'group2.&special-key-5',");
        expect(locale3Content).toContain("title: 'group2.data.0.title',");
        expect(locale3Content).toContain("desc: 'group2.data.0.desc',");
        expect(locale3Content).toContain("link: 'group2.data.0.link',");
        expect(locale3Content).toContain("title: 'group2.data.1.title',");
        expect(locale3Content).toContain("desc: 'group2.data.1.desc',");
        expect(locale3Content).toContain("link: 'group2.data.1.link',");

        expect(settingsContent).toContain("server: 'https://github.com',");
        expect(settingsContent).toContain("username: 'John Doe',");
        expect(settingsContent).toContain("debug: 'false',");
        expect(settingsContent).toContain("fontColor: '#FF0000',");
        expect(settingsContent).toContain("fontSize: '10',");
        expect(settingsContent).toContain("styleHeader: '{ font-family: monospace; font-size: 20px; }',");
        expect(settingsContent).toContain("styleBody: '{ font-family: monospace; font-size: 12px; }',");

        expect(bundleContent).toContain('"firstName":"first-name"');
        expect(bundleContent).toContain('"lastName":"last-name"');
        expect(bundleContent).toContain('"street":"address.street"');
        expect(bundleContent).toContain('"number":"address.number"');
        expect(bundleContent).toContain('"city":"address.city"');
        expect(bundleContent).toContain('"name":"first-level.name"');
        expect(bundleContent).toContain('"name":"first-level.second-level.name"');
        expect(bundleContent).toContain('"name":"first-level.second-level.third-level.name"');
        expect(bundleContent).toContain('"firstName":"relationships.family[0].first-name"');
        expect(bundleContent).toContain('"lastName":"relationships.family[0].last-name"');
        expect(bundleContent).toContain('"relation":"relationships.family[0].relation"');
        expect(bundleContent).toContain('"firstName":"relationships.family[1].first-name"');
        expect(bundleContent).toContain('"lastName":"relationships.family[1].last-name"');
        expect(bundleContent).toContain('"relation":"relationships.family[1].relation"');

        expect(bundleContent).toContain('"camelCaseKey1":"group1.camelCaseKey1"');
        expect(bundleContent).toContain('"camelCaseKey2":"group1.camelCaseKey2"');
        expect(bundleContent).toContain('"camelCaseKey3":"group1.camelCaseKey3"');
        expect(bundleContent).toContain('"\'{0}\'":"group1.{0}"');
        expect(bundleContent).toContain('"\'{1}\'":"group1.{1}"');
        expect(bundleContent).toContain('"title":"group2.title"');
        expect(bundleContent).toContain('"\'-special-key-1\'":"group2.-special-key-1"');
        expect(bundleContent).toContain('"\'0special-key-2\'":"group2.0special-key-2"');
        expect(bundleContent).toContain('"\'$special-key-3\'":"group2.$special-key-3"');
        expect(bundleContent).toContain('"\'#special-key-4\'":"group2.#special-key-4"');
        expect(bundleContent).toContain('"\'&special-key-5\'":"group2.&special-key-5"');
        expect(bundleContent).toContain('"title":"group2.data.0.title"');
        expect(bundleContent).toContain('"desc":"group2.data.0.desc"');
        expect(bundleContent).toContain('"link":"group2.data.0.link"');
        expect(bundleContent).toContain('"title":"group2.data.1.title"');
        expect(bundleContent).toContain('"desc":"group2.data.1.desc"');
        expect(bundleContent).toContain('"link":"group2.data.1.link"');

        expect(bundleContent).toContain('"server":"https://github.com"');
        expect(bundleContent).toContain('"username":"John Doe"');
        expect(bundleContent).toContain('"debug":false');
        expect(bundleContent).toContain('"fontColor":"#FF0000"');
        expect(bundleContent).toContain('"fontSize":10');
        expect(bundleContent).toContain('"styleHeader":"{ font-family: monospace; font-size: 20px; }"');
        expect(bundleContent).toContain('"styleBody":"{ font-family: monospace; font-size: 12px; }"');

        done();
    });
});
