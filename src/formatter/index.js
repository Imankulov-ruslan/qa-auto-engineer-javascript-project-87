import stylish from './stylish.js';

export default (formatter) => {
  switch (formatter) {
    case 'stylish': return stylish;
    case 'plain': return plain;
    case 'json': return json;
    default: throw new Error(`Unknown formatter: ${formatter}.`);
  }
};