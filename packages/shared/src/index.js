export { SITE, NAV_ITEMS, ALLOWED_ORIGINS } from './site.js';

/**
 * Shape of a contact-form submission. Shared so the web form and the api
 * validator agree on field names. Validation itself lives in the api (zod).
 */
export const CONTACT_FIELDS = ['name', 'email', 'message'];
