import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './guards/auth.guard';
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
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes('*');
	}
}
