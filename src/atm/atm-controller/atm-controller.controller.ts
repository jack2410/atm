import { Controller, Get } from '@nestjs/common';
import { AtmService } from '../atm-service';

@Controller('atm')
export class AtmControllerController {
  constructor(private readonly service: AtmService) {}
  @Get()
  getAtm() {
    return this.service.getAtm();
  }
}
