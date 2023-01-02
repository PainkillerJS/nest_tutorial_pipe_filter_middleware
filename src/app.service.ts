import { Injectable, Logger } from '@nestjs/common';

import { RequestService } from './request.service';

@Injectable()
export class AppService {
	private readonly logger = new Logger(AppService.name);

	constructor(private readonly requestService: RequestService) {}

	getHello(): string {
		const userId = this.requestService.getUserId();
		this.logger.log('get user id:', userId);

		return 'Hello World!';
	}
}
