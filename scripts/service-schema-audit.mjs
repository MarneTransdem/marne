// Validate identity references in the JSON-LD actually emitted into the page.
export function auditServiceSchemas(schemas, canonicalUrl) {
  const services = schemas.filter(schema => schema['@type'] === 'Service');
  if (!services.length) return [];
  const errors = [];
  if (services.length !== 1) errors.push('expected one Service entity');
  for (const service of services) {
    if (typeof service.name !== 'string' || !service.name.trim()) errors.push('Service name is empty');
    const areas = Array.isArray(service.areaServed) ? service.areaServed : [service.areaServed];
    if (!areas.length || areas.some(area => typeof area === 'string' ? !area.trim() : typeof area?.name !== 'string' || !area.name.trim())) {
      errors.push('Service areaServed is empty');
    }
    if (service['@id'] !== `${canonicalUrl}#service` || service.url !== canonicalUrl || service.mainEntityOfPage !== canonicalUrl) {
      errors.push('Service identity does not match the canonical page');
    }
    const providerId = service.provider?.['@id'];
    if (!providerId || !schemas.some(schema => schema['@type'] === 'MovingCompany' && schema['@id'] === providerId)) {
      errors.push('Service provider does not resolve to the page MovingCompany');
    }
  }
  return errors;
}
