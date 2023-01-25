export interface HasherGenerator {
  generate: (input: HasherGenerator.Input) => Promise<HasherGenerator.Output>;
}

export namespace HasherGenerator {
  export type Input = {
    plaintext: string;
  };

  export type Output = {
    ciphertext: string;
  };
}
