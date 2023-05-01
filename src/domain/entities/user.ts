type UserData = {
  name: string;
  email: string;
  password: string;
  roleId: string;
}

export class User {
  name: string;
  email: string;
  password: string;
  roleId: string;

  constructor(userData: UserData) {
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.roleId = userData.roleId;
  }
}
