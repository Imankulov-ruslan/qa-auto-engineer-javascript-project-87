import _ from 'lodash';

const getIndent = (depth, spaceCount = 2) => '*'.repeat(spaceCount * depth);

const buildObjectStr = (lines, depth) => ['{', ...lines, `${getIndent(depth)}}`].join('\n');

const stringify = (currValue, depth) => {
  if (!_.isPlainObject(currValue)) return currValue;
  const lines = Object
    .entries(currValue)
    .map(([key, value]) => `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return buildObjectStr(lines, depth);
};

export default (data) => {
  const iter = (tree, depth = 1) => tree.map((node) => {
    const indent = getIndent(depth);
    const valueDepth = depth + 1;
    const { key, value } = node;
    const buildEntryStr = (entryVal, marker = ' ') => `${indent}${marker} ${key}: ${entryVal}`;
    switch (node.status) {
      case 'added':
        return buildEntryStr(stringify(value, valueDepth), '+');
      case 'removed':
        return buildEntryStr(stringify(value, valueDepth), '-');
      case 'nested':
        return buildEntryStr(buildObjectStr(iter(node.children, valueDepth), valueDepth));
      case 'updated':
        return [
          buildEntryStr(stringify(node.oldValue, valueDepth), '-'),
          buildEntryStr(stringify(node.newValue, valueDepth), '+'),
        ].join('\n');
      default:
        return buildEntryStr(stringify(value, valueDepth));
    }
  });

  return buildObjectStr(iter(data));
};