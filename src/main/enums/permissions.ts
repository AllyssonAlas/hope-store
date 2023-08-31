/* eslint-disable no-unused-vars */
export enum permissions {
  create_product,
  create_order,
};

export const permissionsList = [
  { name: 'create_product', roles: ['admin'] },
  { name: 'create_order', roles: ['admin', 'customer'] },
];
