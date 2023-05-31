// Ф-ція для формування вложеностей для батькіського елементу
function buildNestedResult(rows, parentId = 0) {
  const result = [];

  for (const row of rows) {
    if (row.parent_id === parentId) {
      const children = buildNestedResult(rows, row.id);
      row.subCategories = children;
      result.push(row);
    }
  }
  return result;
}

module.exports = { buildNestedResult };
