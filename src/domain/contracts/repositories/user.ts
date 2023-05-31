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
    roleId: string,
    password: string,
  } | null;
}

export interface SaveUserRepository {
  save: (input: SaveUserRepository.Input) => Promise<SaveUserRepository.Output>;
}

export namespace SaveUserRepository {
  export type Input = {
    name: string,
    email: string,
    password: string,
    roleId: string,
  };

  export type Output = void
}
