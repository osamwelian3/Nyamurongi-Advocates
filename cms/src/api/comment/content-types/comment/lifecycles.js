'use strict';

/**
 * Lifecycle hooks for the Comment content type.
 *
 * Public visitors submit comments via the public API (see permissions setup
 * in SETUP.md). We never trust a client-supplied `status` value: every new
 * comment is forced to 'pending' here, so moderation can only happen from
 * the Strapi Admin panel (Content Manager -> Comment -> filter by status).
 *
 * There is deliberately no beforeUpdate hook here. An earlier version tried
 * to also block status changes from non-admin requests, but Strapi's
 * Content Manager doesn't hand lifecycle hooks a reliable way to detect
 * "this is an authenticated admin edit" via event.params.options.ctx — so
 * that check was silently stripping status on every update, including
 * legitimate approvals from the Admin panel. It's also unnecessary: the
 * Public role is never granted `update` on Comment (see SETUP.md), so the
 * permissions system alone already blocks a visitor from self-approving
 * their own comment via the API.
 */

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    data.status = 'pending';
  },
};
