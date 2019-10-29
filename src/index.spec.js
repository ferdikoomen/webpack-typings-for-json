'use strict';

const fs = require('fs');
const path = require('path');

test('is generated correctly', () => {
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

    expect(locale1Content).toContain('readonly alignLeft: string; // Align left');
    expect(locale1Content).toContain('readonly alignCenter: string; // Align centre');
    expect(locale1Content).toContain('readonly alignRight: string; // Align right');
    expect(locale1Content).toContain('readonly justify: string; // Justify');
    expect(locale1Content).toContain('readonly bulletList: string; // Bullet list');
    expect(locale1Content).toContain('readonly numberedList: string; // Numbered list');
    expect(locale1Content).toContain('readonly decreaseIndent: string; // Decrease indent');
    expect(locale1Content).toContain('readonly increaseIndent: string; // Increase indent');

    expect(locale2Content).toContain('readonly firstName: string; // John');
    expect(locale2Content).toContain('readonly lastName: string; // Doe');
    expect(locale2Content).toContain('readonly street: string; // Main Street');
    expect(locale2Content).toContain('readonly number: string; // 123');
    expect(locale2Content).toContain('readonly city: string; // Anytown');
    expect(locale2Content).toContain('readonly name: string; // First Level');
    expect(locale2Content).toContain('readonly name: string; // Second Level');
    expect(locale2Content).toContain('readonly name: string; // Third Level');
    expect(locale2Content).toContain('readonly firstName: string; // Jane');
    expect(locale2Content).toContain('readonly lastName: string; // Doe');
    expect(locale2Content).toContain('readonly relation: string; // Partner');
    expect(locale2Content).toContain('readonly firstName: string; // Nicolas');
    expect(locale2Content).toContain('readonly lastName: string; // Doe');
    expect(locale2Content).toContain('readonly relation: string; // Father');

    expect(locale3Content).toContain('readonly camelCaseKey1: string; // Lorem Ipsum');
    expect(locale3Content).toContain('readonly camelCaseKey2: string; // {0} Lorem Ipsum');
    expect(locale3Content).toContain('readonly camelCaseKey3: string; // {0} Lorem Ipsum {1}');
    expect(locale3Content).toContain("readonly '{0}': string; // Prefix");
    expect(locale3Content).toContain("readonly '{1}': string; // Postfix");
    expect(locale3Content).toContain('readonly title: string; // Catalog of links');
    expect(locale3Content).toContain("readonly '-special-key-1': string; // Special Key 1");
    expect(locale3Content).toContain("readonly '0special-key-2': string; // Special Key 2");
    expect(locale3Content).toContain("readonly '$special-key-3': string; // Special Key 3");
    expect(locale3Content).toContain("readonly '#special-key-4': string; // Special Key 4");
    expect(locale3Content).toContain("readonly '&special-key-5': string; // Special Key 5");
    expect(locale3Content).toContain('readonly title: string; // Swagger UI');
    expect(locale3Content).toContain(
        'readonly desc: string; // Simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset. Find out how Swagger can help you.'
    );
    expect(locale3Content).toContain('readonly link: string; // https://swagger.io/tools/swagger-ui/');
    expect(locale3Content).toContain('readonly title: string; // GitHub profile');
    expect(locale3Content).toContain('readonly desc: string; // Freelance Developer from Amsterdam');
    expect(locale3Content).toContain('readonly link: string; // https://github.com/ferdikoomen');

    expect(settingsContent).toContain('readonly server: string; // https://github.com');
    expect(settingsContent).toContain('readonly username: string; // John Doe');
    expect(settingsContent).toContain('readonly debug: boolean; // false');
    expect(settingsContent).toContain('readonly fontColor: string; // #FF0000');
    expect(settingsContent).toContain('readonly fontSize: number; // 10');
    expect(settingsContent).toContain('readonly styleHeader: string; // { font-family: monospace; font-size: 20px; }');
    expect(settingsContent).toContain('readonly styleBody: string; // { font-family: monospace; font-size: 12px; }');

    expect(bundleContent).toContain('"alignLeft":"align-left"');
    expect(bundleContent).toContain('"alignCenter":"align-center"');
    expect(bundleContent).toContain('"alignRight":"align-right"');
    expect(bundleContent).toContain('"justify":"justify"');
    expect(bundleContent).toContain('"bulletList":"bullet-list"');
    expect(bundleContent).toContain('"numberedList":"numbered-list"');
    expect(bundleContent).toContain('"decreaseIndent":"decrease-indent"');
    expect(bundleContent).toContain('"increaseIndent":"increase-indent"');

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
});
