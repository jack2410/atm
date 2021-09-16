import { Module } from '@nestjs/common';
import { AtmService } from './atm-service';
import { AtmControllerController } from './atm-controller/atm-controller.controller';

@Module({
  providers: [AtmService],
  controllers: [AtmControllerController]
})
export class AtmModule {}
