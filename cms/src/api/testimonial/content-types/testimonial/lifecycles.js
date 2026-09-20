'use strict';

/**
 * See cms/src/api/comment/content-types/comment/lifecycles.js for the full
 * explanation — same content type shape, same fix. No beforeUpdate hook:
 * the Public role never gets `update` on Testimonial, so the permissions
 * system alone blocks self-approval, and a status-stripping beforeUpdate
 * hook has no reliable way to tell an admin edit apart from a public one.
 */

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    data.status = 'pending';
  },
};
