import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RmqContext, RpcException } from '@nestjs/microservices';

@Injectable()
export class ServiceSecretGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: RmqContext = context.switchToRpc().getContext();
    //const metadata = request.getArgs()[1]?.headers;
    const {
      properties: { headers },
    } = request.getMessage();

    if (!headers || headers['x-service-auth'] !== process.env.SERVICE_SECRET) {
      throw new RpcException('Invalid service credentials');
    }

    return true;
  }
}
