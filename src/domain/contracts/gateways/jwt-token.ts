export interface JwtTokenGenerator {
  generate: (input: JwtTokenGenerator.Input) => Promise<void>;
}

export namespace JwtTokenGenerator {
  export type Input = {
    id: string
    role: string
    permissions: string[]
    expirationInMs: number
  };
}
