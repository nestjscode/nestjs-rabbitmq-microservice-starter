export interface ServicePattern<
  TRequest = Record<string, any>,
  TResponse = Record<string, any>,
> {
  request: TRequest;
  response: TResponse;
}

export type RequestType<
  Contract,
  Pattern extends keyof Contract,
> = Contract[Pattern] extends { request: infer R } ? R : never;

export type ResponseType<
  Contract,
  Pattern extends keyof Contract,
> = Contract[Pattern] extends { response: infer R } ? R : never;
