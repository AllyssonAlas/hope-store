export interface HasherGenerator {
  generate: (input: HasherGenerator.Input) => Promise<void>;
}

export namespace HasherGenerator {
  export type Input = {
    plaintext: string;
  };

}
