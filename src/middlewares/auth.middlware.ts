import { Injectable, Logger } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import type { NestMiddleware } from '@nestjs/common';
import { RequestService } from '../request.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	private readonly logger = new Logger(AuthMiddleware.name);

	constructor(private readonly requestService: RequestService) {}

	use(req: Request, res: Response, next: NextFunction) {
		this.logger.log(AuthMiddleware.name);

		// Auth response
		const userId = '123';
		this.requestService.setUserId(userId);

		next();
	}
}
