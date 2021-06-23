'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const doctrine = require('doctrine');

/**
 * Get comment blocks from target file
 *
 * @param {string} filePath - file path
 * @return {array} comment blocks
 */
function getCommentBlocks(filePath) {
  const fileExtension = path.extname(filePath);
  assert([ '.js' ].includes(fileExtension), `Unkonw file extension ${fileExtension}`);
  const commentReg = /\/\*\*\n(\s|\S)*?\*\//igm;
  const fileString = fs.readFileSync(filePath).toString('utf-8');
  return fileString.match(commentReg) || [];
}

/**
 * Get comment info from comment block
 *
 * @param {string} commentBlock - comment block string
 * @return {object} - jsdoc comment
 */
function getComment(commentBlock) {
  return doctrine.parse(commentBlock, { unwrap: true });
}

module.exports = filePath => {
  const blocks = getCommentBlocks(filePath);
  // Ignore comments with deprecated tag
  const filterdBlock = blocks.filter(block => block.includes('#swagger-api') && !block.includes('@deprecated'));
  return filterdBlock.map(block => getComment(block));
};
