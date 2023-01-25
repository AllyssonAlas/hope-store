type UserData = {
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: string;
}

export class User {
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: string;

  constructor(userData: UserData) {
    this.name = userData.name;
    this.email = userData.email;
    this.cpf = userData.cpf;
    this.password = userData.password;
    this.role = userData.role;
  }
}
