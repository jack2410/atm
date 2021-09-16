import { Injectable } from '@nestjs/common';

import Data from './atm.data';
import { ATMProducerService } from './atm.producer.service';
import { JOB_TYPES } from '../utils/constants';

@Injectable()
export class AtmService {
  constructor(
    private readonly atmProcedureService: ATMProducerService,
    private readonly data: Data,
  ) {}

  getAtms() {
    return this.data.getAtms();
  }

  getQueue() {
    return this.data.getQueue();
  }

  async addAtm() {
    await this.atmProcedureService.sendToQueue(JOB_TYPES.ADD_ATM);
  }
}
