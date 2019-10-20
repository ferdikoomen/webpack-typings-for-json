import locale1 from './locale1.json';
import locale2 from './locale2.json';
import settings from './settings.json';

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

console.log(settings.server);
console.log(settings.username);
console.log(settings.debug);
console.log(settings.theme.fontColor);
console.log(settings.theme.fonts.styleHeader);
console.log(settings.theme.fonts.styleBody);

console.log('Done!');
