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
    role: string } | undefined;
}
