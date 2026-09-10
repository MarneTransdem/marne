// Google accepts a breadcrumb label on ListItem.name or on item.name.
// Traverse JSON-LD arrays and graphs so one valid trail cannot hide another invalid one.
export function auditBreadcrumbNames(value) {
  const errors = [];
  const hasName = name => typeof name === 'string' && name.trim().length > 0;
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(visit); return; }
    const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
    if (types.includes('BreadcrumbList')) {
      if (!Array.isArray(node.itemListElement) || node.itemListElement.length === 0) {
        errors.push('BreadcrumbList: missing itemListElement');
      } else {
        node.itemListElement.forEach((item, index) => {
          if (!hasName(item?.name) && !hasName(item?.item?.name)) {
            errors.push(`BreadcrumbList item ${index + 1}: missing name or item.name`);
          }
        });
      }
    }
    Object.values(node).forEach(visit);
  }
  visit(value);
  return errors;
}
