import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { QUEUE_NAME } from '../utils/constants';

@Injectable()
export class ATMProducerService {
  constructor(@InjectQueue(QUEUE_NAME) private queue: Queue) {}

  async sendToQueue(type: string, data: object = {}) {
    await this.queue.add({ type, ...data });
  }
}
