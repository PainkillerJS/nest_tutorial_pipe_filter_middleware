import {
	Body,
	Controller,
	Get,
	Post,
	UseFilters,
	UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';
import any = jasmine.any;
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { FreezePipe } from './pipes/freeze.pipe';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Post()
	// Как вариант
	@UseGuards(FreezePipe)
	@UseFilters(HttpExceptionFilter)
	examplePost(@Body(new FreezePipe()) body: any) {
		body.test = 1;
	}
}
