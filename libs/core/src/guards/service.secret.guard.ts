// microservice/auth/guards/service-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ServiceSecretGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToRpc().getContext(); // switchToRpc for microservices
    const metadata = request.getArgs()[1]?.headers;

    if (
      !metadata ||
      metadata['x-service-auth'] !== process.env.SERVICE_SECRET
    ) {
      throw new UnauthorizedException('Invalid service credentials');
    }

    return true;
  }
}
