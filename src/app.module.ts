import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtmModule } from './atm/atm.module';

import { QUEUE_NAME } from './utils/constants';

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
    AtmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
