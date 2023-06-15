type UserData = {
  name: string;
  email: string;
  password: string;
  role: string;
}

export class User {
  name: string;
  email: string;
  password: string;
  role: string;

  constructor(userData: UserData) {
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.role = userData.role;
  }
}
