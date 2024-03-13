const fs = require('node:fs/promises');

async function readData(file = 'clothes.json') {
  const data = await fs.readFile(file, 'utf8');
  let parsedData = '';

  try {
    parsedData = JSON.parse(data);
  } catch(error) {
      console.log(error);

      return {};
  }

  return parsedData;
}

async function writeData(data, file = 'clothes.json') {
  await fs.writeFile(file, JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;