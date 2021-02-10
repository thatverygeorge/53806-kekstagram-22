import { createDescription } from './create-description.js';

const descriptions = new Array(25).fill(null).map(createDescription);

// eslint-disable-next-line no-console
console.log(descriptions);
