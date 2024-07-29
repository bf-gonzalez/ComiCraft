import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return 'data vacio';
        }
        if (Array.isArray(data)) {
          return data.map(({ password, confirmPassword, ...user }) => user);
        }
        const { password, confirmPassword, ...user } = data;
        return user;
      }),
    );
  }
}
