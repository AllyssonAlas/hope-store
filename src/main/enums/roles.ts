/* eslint-disable no-unused-vars */
export enum roles {
  admin,
  costumer,
};

export const rolesList = Object.keys(roles).filter(key => isNaN(Number(key)));
