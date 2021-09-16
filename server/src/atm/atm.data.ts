import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { ATMProducerService } from './atm.producer.service';

import {
  INIT_NUMBER_OF_ATMS,
  MIN_PERSON_TRANSACTIONS,
  MAX_PERSON_TRANSACTIONS,
  MIN_INTERVAL_NEW_PERSON,
  MAX_INTERVAL_NEW_PERSON,
  TIME_FOR_A_TRANSACTION,
  JOB_TYPES,
} from '../utils/constants';

enum ATMStatus {
  Busy = 'Busy',
  Free = 'Free',
}

export type ATM = {
  id: string;
  status: ATMStatus;
  queue: Person[];
};

export type Transaction = {
  id: string;
};

export type Person = {
  id: string;
  transactions: Transaction[];
};

@Injectable()
export default class Data {
  atms: ATM[];
  queue: Person[];
  removeATMIds: string[];
  isLock: boolean;
  intervalNewPerson: number;

  constructor(private readonly atmProducerService: ATMProducerService) {
    this.atms = initATMs;
    this.queue = initQueue;
    this.removeATMIds = [];
    this.isLock = false;
    this.intervalNewPerson = this.randomMaxMin(
      MAX_INTERVAL_NEW_PERSON,
      MIN_INTERVAL_NEW_PERSON,
    );

    this.addPersonInterval();
    this.processTransactionInterval();
  }

  lock() {
    this.isLock = true;
  }

  unlock() {
    this.isLock = false;
  }

  getAtms() {
    return this.atms.filter(Boolean);
  }

  getQueue() {
    return this.queue;
  }

  addAtm() {
    if (this.isLock) return;

    this.lock();

    const atm: ATM = {
      id: nanoid(),
      status: ATMStatus.Free,
      queue: [],
    };
    this.atms.push(atm);

    this.unlock();
  }

  removeAtm(id: string) {
    this.lock();

    if (!this.removeATMIds.includes(id)) {
      this.removeATMIds.push(id);
    }

    this.unlock();
  }

  addPersonToQueue() {
    if (this.isLock) return;

    this.lock();

    const person: Person = {
      id: nanoid(),
      transactions: this.generateTransactions(),
    };
    this.queue.push(person);

    this.unlock();
  }

  addPersonInterval() {
    const atmProducerService = this.atmProducerService;
    setInterval(() => {
      atmProducerService?.sendToQueue(JOB_TYPES.ADD_PERSON);
    }, this.intervalNewPerson);
  }

  processTransactions() {
    if (this.isLock) return;
    this.lock();

    try {
      this.atms = this.atms.map((atm) => {
        let queue = [...atm.queue];
        let status = atm.status;

        if (queue.length) {
          // revove the first transaction in atm's queue
          if (queue[0]?.transactions.length === 1) {
            queue = queue.slice(1);
          } else {
            queue[0] = {
              id: queue[0]?.id,
              transactions: queue[0]?.transactions.slice(1),
            };
          }
        }

        // if atm's queue is empty, add a person from queue
        // if queue is empty too, set status to Free
        if (!queue.length) {
          if (this.removeATMIds.includes(atm.id)) {
            this.removeATMIds = this.removeATMIds.filter(
              (item) => item !== atm.id,
            );
            return null;
          }
          if (this.queue?.length) {
            const nextPerson = this.queue[0];
            queue = [nextPerson];
            this.queue = this.queue.slice(1);
            status = ATMStatus.Busy;
          } else {
            status = ATMStatus.Free;
          }
        }

        return {
          id: atm.id,
          status,
          queue,
        };
      });

      this.atms = this.atms.filter(Boolean);
    } catch (err) {
      console.error(err);
    }

    this.unlock();
  }

  processTransactionInterval = () => {
    const atmProducerService = this.atmProducerService;
    setInterval(() => {
      atmProducerService?.sendToQueue(JOB_TYPES.PROCESS_TRANSACTIONS);
    }, TIME_FOR_A_TRANSACTION);
  };

  generateTransactions() {
    const numberOfTransactions = this.randomMaxMin(
      MAX_PERSON_TRANSACTIONS,
      MIN_PERSON_TRANSACTIONS,
    );
    const transactions = Array(numberOfTransactions)
      .fill(null)
      .map((_item) => ({
        id: nanoid(),
      }));

    return transactions;
  }

  randomMaxMin(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const initATMs = Array(INIT_NUMBER_OF_ATMS)
  .fill(null)
  .map((_item) => ({
    id: nanoid(),
    status: ATMStatus.Free,
    queue: [],
  }));

const initQueue = [];
