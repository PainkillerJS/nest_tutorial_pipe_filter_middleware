import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptors } from './interceptors/logging.interceptors';
import { AuthMiddleware } from './middlewares/auth.middlware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './request.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [
		AppService,
		RequestService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			scope: Scope.REQUEST,
			useClass: LoggingInterceptors,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes('*');
	}
}
