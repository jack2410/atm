import { Controller, Get, Post } from '@nestjs/common';
import { AtmService } from '../atm-service';

@Controller('atms')
export class AtmControllerController {
  constructor(private readonly service: AtmService) {}
  @Get()
  getAtm() {
    return this.service.getAtm();
  }

  @Post()
  addAtm() {
    return this.service.addAtm();
  }
}
