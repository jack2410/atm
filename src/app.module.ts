import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtmModule } from './atm/atm.module';

@Module({
  imports: [AtmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
