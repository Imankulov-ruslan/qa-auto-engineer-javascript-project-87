import _ from 'lodash'

const stringify = (val) => {
  if (_.isPlainObject(val)) return '[complex value]'
  if (_.isString(val)) return `'${val}'`
}

export default (tree) => {
  const iter = (node, path) => node
    .filter(({ status }) => status !== 'original')
    .map(({
      key, status, value, oldValue, newValue, children,
    }) => {
      const keys = [...path, key];
      const propertyName = keys.join('.');
      switch (status) {
        case 'added':
          return `Property '${propertyName}' was added with value: ${stringify(value)}`;
        case 'removed':
          return `Property '${propertyName}' was removed`;
        case 'updated':
          return `Property '${propertyName}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        case 'nested':
          return `${iter(children, keys)}`;
        default:
          throw new Error(`Wrong type ${status}`);
      }
    }).join('\n');
  return iter(tree, []);
};