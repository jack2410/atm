import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { QUEUE_NAME } from '../utils/constants';

@Processor(QUEUE_NAME)
export class ATMConsumer {
  @Process()
  readOperationJob(job: Job<unknown>) {
    console.log(job.data);
  }
}
