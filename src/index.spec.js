'use strict';

const fs = require('fs');
const path = require('path');

test('is generated correctly', () => {
    const bundlePath = path.resolve(process.cwd(), './test/dist/bundle.js');
    const test1Path = path.resolve(process.cwd(), './test/test1.json.d.ts');
    const test2Path = path.resolve(process.cwd(), './test/test2.json.d.ts');

    const bundleExists = fs.existsSync(bundlePath);
    const test1Exists = fs.existsSync(test1Path);
    const test2Exists = fs.existsSync(test2Path);

    const bundleStats = fs.statSync(bundlePath);
    const test1Stats = fs.statSync(test1Path);
    const test2Stats = fs.statSync(test2Path);

    const bundleContent = fs.readFileSync(bundlePath).toString();
    const test1Content = fs.readFileSync(test1Path).toString();
    const test2Content = fs.readFileSync(test2Path).toString();

    expect(bundleExists).toBeTruthy();
    expect(test1Exists).toBeTruthy();
    expect(test2Exists).toBeTruthy();

    expect(bundleStats.size).toBeGreaterThan(0);
    expect(test1Stats.size).toBeGreaterThan(0);
    expect(test2Stats.size).toBeGreaterThan(0);

    expect(test1Content).toContain('readonly alignLeft: string; // Align left');
    expect(test1Content).toContain('readonly alignCenter: string; // Align centre');
    expect(test1Content).toContain('readonly alignRight: string; // Align right');
    expect(test1Content).toContain('readonly justify: string; // Justify');
    expect(test1Content).toContain('readonly bulletList: string; // Bullet list');
    expect(test1Content).toContain('readonly numberedList: string; // Numbered list');
    expect(test1Content).toContain('readonly decreaseIndent: string; // Decrease indent');
    expect(test1Content).toContain('readonly increaseIndent: string; // Increase indent');

    expect(test2Content).toContain('readonly firstName: string; // John');
    expect(test2Content).toContain('readonly lastName: string; // Doe');
    expect(test2Content).toContain('readonly street: string; // Main Street');
    expect(test2Content).toContain('readonly number: string; // 123');
    expect(test2Content).toContain('readonly city: string; // Anytown');
    expect(test2Content).toContain('readonly name: string; // First Level');
    expect(test2Content).toContain('readonly name: string; // Second Level');
    expect(test2Content).toContain('readonly name: string; // Third Level');
    expect(test2Content).toContain('readonly firstName: string; // Jane');
    expect(test2Content).toContain('readonly lastName: string; // Doe');
    expect(test2Content).toContain('readonly relation: string; // Partner');
    expect(test2Content).toContain('readonly firstName: string; // Nicolas');
    expect(test2Content).toContain('readonly lastName: string; // Doe');
    expect(test2Content).toContain('readonly relation: string; // Father');

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
});
