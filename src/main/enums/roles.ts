/* eslint-disable no-unused-vars */
export enum roles {
  admin,
  customer,
};

export const rolesList = Object.keys(roles).filter(key => isNaN(Number(key)));
