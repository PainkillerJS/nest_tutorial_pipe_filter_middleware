import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import any = jasmine.any;
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
	examplePost(@Body(new FreezePipe()) body: any) {
		body.test = 1;
	}
}
