const fs = require('fs');
const officegen = require('officegen');

function generateDocx(outputPath, data) {
  const docx = officegen('docx');

  const table = [
    [
      { val: 'Name', opts: { cellColWidth: 4261, b: true, shd: { fill: 'a9c4e4' }, align: 'center', vAlign: 'center', sz: '24', border: true } },
      { val: 'Value', opts: { cellColWidth: 4261, b: true, shd: { fill: 'a9c4e4' }, align: 'center', vAlign: 'center', sz: '24', border: true } }
    ],
    ...data.map(item => [
      { val: item.name, opts: { cellColWidth: 4261, align: 'left', vAlign: 'center', sz: '24', border: true } },
      { val: item.value, opts: { cellColWidth: 4261, align: 'left', vAlign: 'center', sz: '24', border: true } }
    ])
  ];

  const tableStyle = {
    tableColWidth: 4261,
    tableSize: 24,
    tableAlign: 'left',
    tableFontFamily: 'Arial'
  };

  const tableRef = docx.createTable(table, tableStyle);

  const outputStream = fs.createWriteStream(outputPath);
  docx.generate(outputStream);
}

module.exports = generateDocx;
