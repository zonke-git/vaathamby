export function maskEmail(email) {


  if (!email) {
    return '';
  }
  
  const [local, domain] = email.split('@');

  // Mask local part
  const visibleLocal = local.slice(0, 2);
  const maskedLocal = visibleLocal + '*'.repeat(Math.max(local.length - 2, 0));

  // Mask domain part
  const domainParts = domain.split('.');
  const visibleDomain = domainParts[0].slice(0, 2);
  const maskedDomain =
    visibleDomain + '*'.repeat(Math.max(domainParts[0].length - 2, 0));
  const domainSuffix = domainParts.slice(1).join('.');

  return `${maskedLocal}@${maskedDomain}.${domainSuffix}`;
}
