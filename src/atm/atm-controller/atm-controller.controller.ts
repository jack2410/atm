import { Controller, Get, Post } from '@nestjs/common';
import { AtmService } from '../atm-service';

@Controller('atms')
export class AtmControllerController {
  constructor(private readonly service: AtmService) {}

  @Get()
  getAtms() {
    return this.service.getAtms();
  }

  @Get('queue')
  getQueue() {
    return this.service.getQueue();
  }

  @Post()
  async addAtm() {
    return await this.service.addAtm();
  }
}
