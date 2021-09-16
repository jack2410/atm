import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { AtmService } from './atm-service';
import { AtmControllerController } from './atm-controller/atm-controller.controller';
import { ATMProducerService } from './atm.producer.service';
import { ATMConsumer } from './atm.consumer';

import { QUEUE_NAME } from '../utils/constants';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
  ],
  providers: [AtmService, ATMProducerService, ATMConsumer],
  controllers: [AtmControllerController],
})
export class AtmModule {}
