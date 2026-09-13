'use strict';

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    data.status = 'pending';
  },

  beforeUpdate(event) {
    const { data, options } = event.params;
    const isAdminRequest = options?.ctx?.state?.user?.roles !== undefined;
    if (!isAdminRequest && data.status) {
      delete data.status;
    }
  },
};
