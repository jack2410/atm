import { Injectable } from '@nestjs/common';

import data from '../utils/data';
import { ATMProducerService } from './atm.producer.service';
import { JOB_TYPES } from '../utils/constants';

@Injectable()
export class AtmService {
  constructor(private readonly atmProcedureService: ATMProducerService) {}

  getAtms() {
    return data.getAtms();
  }

  getQueue() {
    return data.getQueue();
  }

  async addAtm() {
    await this.atmProcedureService.sendToQueue(JOB_TYPES.ADD_ATM);
  }
}
