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

export interface HasherComparer {
  compare: (input: HasherComparer.Input) => Promise<HasherComparer.Output>;
}

export namespace HasherComparer {
  export type Input = {
    plaintext: string;
    digest: string;
  };

  export type Output = {
    isValid: boolean;
  };
}
