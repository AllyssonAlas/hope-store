export interface PostalCode {
  getAddress: (input: PostalCode.Input) => Promise<PostalCode.Output>;
}

export namespace PostalCode {
  export type Input = {
    postalCode: string;
  };

  export type Output = {
    street: string;
    neighborhood: string;
    city: string;
    postalCode: string;
    state: string;
  } | null;
}
