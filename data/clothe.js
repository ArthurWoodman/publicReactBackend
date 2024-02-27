const fs = require('node:fs/promises');

const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData.clothes) {
    throw new NotFoundError('Could not find any clothes.');
  }
  return storedData.clothes;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.clothes || storedData.clothes.length === 0) {
    throw new NotFoundError('Could not find any clothes.');
  }

  const clothe = storedData.clothes.find((cl) => cl.id === id);
  if (!clothe) {
    throw new NotFoundError('Could not find a clothe for id ' + id);
  }

  return clothe;
}

async function add(data) {
  const storedData = await readData();
  storedData.clothes.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.clothes || storedData.clothes.length === 0) {
    throw new NotFoundError('Could not find any clothes.');
  }

  const index = storedData.clothes.findIndex((cl) => cl.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find a clothe for id ' + id);
  }

  storedData.clothes[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.clothes.filter((cl) => cl.id !== id);
  await writeData({clothes: updatedData});
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
