'use strict';

const fs = require('fs');
const path = require('path');

test('is generated correctly', () => {
    const bundlePath = path.resolve(process.cwd(), './test/dist/bundle.js');
    const locale1Path = path.resolve(process.cwd(), './test/locale1.json.d.ts');
    const locale2Path = path.resolve(process.cwd(), './test/locale2.json.d.ts');
    const settings = path.resolve(process.cwd(), './test/settings.json.d.ts');

    const bundleExists = fs.existsSync(bundlePath);
    const locale1Exists = fs.existsSync(locale1Path);
    const locale2Exists = fs.existsSync(locale2Path);
    const settingsExists = fs.existsSync(settings);

    const bundleStats = fs.statSync(bundlePath);
    const locale1Stats = fs.statSync(locale1Path);
    const locale2Stats = fs.statSync(locale2Path);
    const settingsStats = fs.statSync(settings);

    const bundleContent = fs.readFileSync(bundlePath).toString();
    const locale1Content = fs.readFileSync(locale1Path).toString();
    const locale2Content = fs.readFileSync(locale2Path).toString();
    const settingsContent = fs.readFileSync(settings).toString();

    expect(bundleExists).toBeTruthy();
    expect(locale1Exists).toBeTruthy();
    expect(locale2Exists).toBeTruthy();
    expect(settingsExists).toBeTruthy();

    expect(bundleStats.size).toBeGreaterThan(0);
    expect(locale1Stats.size).toBeGreaterThan(0);
    expect(locale2Stats.size).toBeGreaterThan(0);
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

    expect(bundleContent).toContain('"server":"https://github.com"');
    expect(bundleContent).toContain('"username":"John Doe"');
    expect(bundleContent).toContain('"debug":false');
    expect(bundleContent).toContain('"fontColor":"#FF0000"');
    expect(bundleContent).toContain('"fontSize":10');
    expect(bundleContent).toContain('"styleHeader":"{ font-family: monospace; font-size: 20px; }"');
    expect(bundleContent).toContain('"styleBody":"{ font-family: monospace; font-size: 12px; }"');
});
