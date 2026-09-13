'use strict';

/**
 * Lifecycle hooks for the Comment content type.
 *
 * Public visitors submit comments via the public API (see permissions setup
 * in SETUP.md). We never trust a client-supplied `status` value: every new
 * comment is forced to 'pending' here, so moderation can only happen from
 * the Strapi Admin panel (Content Manager -> Comment -> filter by status).
 */

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    data.status = 'pending';
  },

  // Prevents a crafted PUT request from self-approving a comment.
  // Admin-panel updates go through a different, authenticated context
  // (ctx.state.user with an Administrator role), which this check allows.
  beforeUpdate(event) {
    const { data, options } = event.params;
    const isAdminRequest = options?.ctx?.state?.user?.roles !== undefined;
    if (!isAdminRequest && data.status) {
      delete data.status;
    }
  },
};
