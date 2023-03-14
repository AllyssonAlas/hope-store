export interface LoadUserRepository {
  load: (input: LoadUserRepository.Input) => Promise<LoadUserRepository.Output>;
}

export namespace LoadUserRepository {
  export type Input = {
    email: string;
  };

  export type Output = {
    id: string,
    name: string,
    email: string,
    cpf: string,
    role: string,
  } | null;
}

export interface SaveUserRepository {
  save: (input: SaveUserRepository.Input) => Promise<void>;
}

export namespace SaveUserRepository {
  export type Input = {
    name: string,
    email: string,
    cpf: string,
    password: string,
    role: string,
  };
}
