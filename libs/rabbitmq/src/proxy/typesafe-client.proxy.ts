import { ClientProxy } from '@nestjs/microservices';

export abstract class TypeSafeClientProxy<
  PatternMap extends Record<string, any> = Record<never, Function>,
> extends ClientProxy {
  constructor(private readonly client: ClientProxy) {
    super();
  }

  send<K extends keyof PatternMap>(pattern: K, data: PatternMap[K]['request']) {
    return this.client.send<
      PatternMap[K]['response'],
      PatternMap[K]['request']
    >(pattern as string, data);
  }

  emit<K extends keyof PatternMap>(pattern: K, data: PatternMap[K]['request']) {
    return this.client.emit<
      PatternMap[K]['response'],
      PatternMap[K]['request']
    >(pattern as string, data);
  }
}
