export interface PostalCodeApi {
  getAddress: (input: PostalCodeApi.Input) => Promise<PostalCodeApi.Output>;
}

export namespace PostalCodeApi {
  export type Input = {
    postalCode: string;
  };

  export type Output = {
    street: string;
    neighborhood: string;
    city: string;
    postalCode: string;
  } | null;
}
