import locale1, { LocaleKey } from './locale1.json';
import locale2 from './locale2.json';
import locale3 from './locale3.json';
import settings from './settings.json';

function testLocaleKey(localKey: LocaleKey): void {
    console.log('localKey:', localKey);
}

console.log(locale1.alignLeft);
console.log(locale1.alignRight);
console.log(locale1.alignCenter);
console.log(locale1.justify);
console.log(locale1.bulletList);
console.log(locale1.numberedList);
console.log(locale1.decreaseIndent);
console.log(locale1.increaseIndent);

console.log(locale2.firstName);
console.log(locale2.lastName);
console.log(locale2.address.street);
console.log(locale2.address.number);
console.log(locale2.address.city);
console.log(locale2.relationships.family[0].firstName);
console.log(locale2.relationships.family[0].lastName);
console.log(locale2.relationships.family[0].relation);
console.log(locale2.relationships.family[1].firstName);
console.log(locale2.relationships.family[1].lastName);
console.log(locale2.relationships.family[1].relation);

console.log(locale3.group1.camelCaseKey1);
console.log(locale3.group1.camelCaseKey2);
console.log(locale3.group1.camelCaseKey3);
console.log(Object.keys(locale3.group1));
console.log(Object.keys(locale3.group2));
console.log(locale3.group1['{0}']);
console.log(locale3.group1['{1}']);
console.log(locale3.group2['-special-key-1']);
console.log(locale3.group2['0special-key-2']);
console.log(locale3.group2['$special-key-3']);
console.log(locale3.group2['#special-key-4']);
console.log(locale3.group2['&special-key-5']);
console.log(locale3.group2.data['0'].title);
console.log(locale3.group2.data['0'].desc);
console.log(locale3.group2.data['0'].link);
console.log(locale3.group2.data['1'].title);
console.log(locale3.group2.data['1'].desc);
console.log(locale3.group2.data['1'].link);

console.log(settings.server);
console.log(settings.username);
console.log(settings.debug);
console.log(settings.theme.fontColor);
console.log(settings.theme.fonts.styleHeader);
console.log(settings.theme.fonts.styleBody);

testLocaleKey(locale1.alignLeft);
testLocaleKey(locale1.alignRight);
testLocaleKey(locale1.alignCenter);
testLocaleKey(locale1.justify);
testLocaleKey(locale1.bulletList);
testLocaleKey(locale1.numberedList);
testLocaleKey(locale1.decreaseIndent);
testLocaleKey(locale1.increaseIndent);

console.log('Done!');
