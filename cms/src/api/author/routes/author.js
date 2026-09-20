'use strict';

/**
 * author router — the standard core CRUD routes (find, findOne, create,
 * update, delete) for this content type. Without this file (and its
 * controller/service pair), Strapi has no REST endpoint to register, so
 * the content type never appears in Settings -> Users & Permissions ->
 * Roles for you to grant access to.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::author.author');
