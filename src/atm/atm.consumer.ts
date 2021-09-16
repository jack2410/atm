import { Injectable } from '@nestjs/common';
import { Process, Processor, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';

import Data from './atm.data';
import { QUEUE_NAME, JOB_TYPES } from '../utils/constants';

@Processor(QUEUE_NAME)
@Injectable()
export class ATMConsumer {
  constructor(private readonly data: Data) {}

  @Process()
  readOperationJob(job: Job<{ type: string }>) {
    const { type } = job.data;
    switch (type) {
      case JOB_TYPES.ADD_ATM:
        this.data.addAtm();
        break;
      case JOB_TYPES.ADD_PERSON:
        this.data.addPersonToQueue();
        break;
      case JOB_TYPES.PROCESS_TRANSACTIONS:
        this.data.processTransactions();
        break;
      default:
        break;
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
      )}...`,
    );
  }
}
