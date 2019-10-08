import test1 from './test1.json';
import test2 from './test2.json';

console.log(test1.alignLeft);
console.log(test1.alignRight);
console.log(test1.alignCenter);
console.log(test1.justify);
console.log(test1.bulletList);
console.log(test1.numberedList);
console.log(test1.decreaseIndent);
console.log(test1.increaseIndent);

console.log(test2.firstName);
console.log(test2.lastName);
console.log(test2.address.street);
console.log(test2.address.number);
console.log(test2.address.city);
console.log(test2.relationships.family[0].firstName);
console.log(test2.relationships.family[0].lastName);
console.log(test2.relationships.family[0].relation);
console.log(test2.relationships.family[1].firstName);
console.log(test2.relationships.family[1].lastName);
console.log(test2.relationships.family[1].relation);

console.log('Done!');
