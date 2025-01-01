import genDiffTree from "./services/index.js";
import formatter from "./formatter/index.js";

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
    const extname1 = getFileExtname(filepath1);
    const extname2 = getFileExtname(filepath2);
  
    const fileData1 = readFile(filepath1);
    const fileData2 = readFile(filepath2);
  
    const parsedFileData1 = parser(fileData1, extname1);
    const parsedFileData2 = parser(fileData2, extname2);
  
    const diffTree = genDiffTree(parsedFileData1, parsedFileData2);
    return formatter(formatName)(diffTree);
  };
  
  export default genDiff;