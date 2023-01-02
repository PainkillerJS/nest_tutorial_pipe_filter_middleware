import type {
	CallHandler,
	ExecutionContext,
	NestInterceptor,
} from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';

import { tap } from 'rxjs';

import { RequestService } from '../request.service';

@Injectable()
export class LoggingInterceptors implements NestInterceptor {
	private readonly logger = new Logger(LoggingInterceptors.name);

	constructor(private readonly requestService: RequestService) {}

	intercept(context: ExecutionContext, next: CallHandler<any>) {
		const req = context.switchToHttp().getRequest();
		const userAgent = req.get('user-agent') || '';

		const { ip, method, path: url } = userAgent;

		this.logger.log(
			`${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${
				context.getHandler().name
			} invoked...`,
		);
		const now = Date.now();

		this.logger.log('userId:', this.requestService.getUserId());

		return next.handle().pipe(
			tap((res) => {
				const response = context.switchToHttp().getResponse();

				const { statusCode } = response;
				const contentLength = response.get('content-length');

				this.logger.log(
					`${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}: ${
						Date.now() - now
					}ms`,
				);
				this.logger.debug('Response: ', res);
			}),
		);
	}
}
