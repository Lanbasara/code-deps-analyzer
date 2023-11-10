const fs = require('fs');
const path = require('path');

function saveDependenciesToFile(dependencies, filePath) {
  const dependenciesObj = Object.fromEntries(dependencies);
  const json = JSON.stringify(dependenciesObj, null, 2);
  const directory = path.dirname(filePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(filePath, json);
  console.log(`Dependencies saved to ${filePath}`);
}

/**
 * Calculates the size of each node based on their code columns value.
 *
 * @param {Array} nodes - An array of nodes.
 * @param {number} baseValue - The base value for adjusting the size.
 * @param {number} scaleFactor - The scaling factor for adjusting the size.
 * @return {void} This function does not return a value.
 */
function calculateSize(nodes, baseValue = 0, scaleFactor = 100) {
  // 找到最大的 codeColums 值
  const maxCodeColums = Math.max(
    ...Array.from(nodes).map((node) => node[1].codeColums)
  );

  // 计算修正后的 size 数字
  nodes.forEach((node) => {
    const normalizedValue = node.codeColums / maxCodeColums; // 将 codeColums 值归一化到 0-1 范围
    const adjustedValue = normalizedValue * scaleFactor + baseValue; // 应用线性映射
    node.symbolSize = adjustedValue;
  });
}

module.exports = {
  saveDependenciesToFile,
  calculateSize,
};
