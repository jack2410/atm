import { Injectable } from '@nestjs/common';

import Data from './atm.data';
import { ATMProducerService } from './atm.producer.service';
import { JOB_TYPES } from '../utils/constants';

@Injectable()
export class AtmService {
  constructor(
    private readonly atmProducerService: ATMProducerService,
    private readonly data: Data,
  ) {}

  getAtms() {
    return this.data.getAtms();
  }

  getQueue() {
    return this.data.getQueue();
  }

  async addAtm() {
    await this.atmProducerService.sendToQueue(JOB_TYPES.ADD_ATM);
  }

  async removeAtm(id: string) {
    await this.atmProducerService.sendToQueue(JOB_TYPES.REMOVE_ATM, { id });
  }
}
