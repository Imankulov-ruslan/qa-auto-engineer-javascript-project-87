import { readFileSync } from 'fs';
import path from 'path'
import { genDiffTree } from "./services/index.js";
import { formatter } from "./formatter/index.js";
import { parser } from "./parser/index.js";

const readFile = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
const getFileExtname = (filepath) => path.extname(filepath).replace('.', '');


export default (filepath1, filepath2, formatName = 'stylish') => {
  const extname1 = getFileExtname(filepath1);
  const extname2 = getFileExtname(filepath2);

  const fileData1 = readFile(filepath1);
  const fileData2 = readFile(filepath2);

  const parsedFileData1 = parser(fileData1, extname1);
  const parsedFileData2 = parser(fileData2, extname2);
  const diffTree = genDiffTree(parsedFileData1, parsedFileData2);
  return formatter(formatName)(diffTree);
};