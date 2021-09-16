import { nanoid } from 'nanoid';

const MIN_PERSON_TRANSACTIONS = 1;
const MAX_PERSON_TRANSACTIONS = 3;
const MIN_INTERVAL_NEW_PERSON = 2000;
const MAX_INTERVAL_NEW_PERSON = 4000;

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

class Data {
  atms: ATM[];
  queue: Person[];
  isLockATM: boolean;
  isLockQueue: boolean;
  intervalNewPerson: number;

  constructor(atms: ATM[], queue: Person[]) {
    this.atms = atms;
    this.queue = queue;
    this.isLockATM = false;
    this.isLockQueue = false;
    this.intervalNewPerson = this.randomMaxMin(
      MAX_INTERVAL_NEW_PERSON,
      MIN_INTERVAL_NEW_PERSON,
    );
  }

  lockATM() {
    this.isLockATM = true;
  }

  unlockATM() {
    this.isLockATM = false;
  }

  lockQueue() {
    this.isLockQueue = true;
  }

  unlockQueue() {
    this.isLockQueue = false;
  }

  getAtms() {
    return this.atms;
  }

  addAtm() {
    if (this.isLockATM) return;

    this.lockATM();

    const atm: ATM = {
      id: nanoid(),
      status: ATMStatus.Free,
      queue: [],
    };
    this.atms.push(atm);

    this.unlockATM();
  }

  addPersonToQueue() {
    if (this.isLockQueue) return;

    this.lockQueue();

    const person: Person = {
      id: nanoid(),
      transactions: this.generateTransactions(),
    };
    this.queue.push(person);

    this.unlockQueue();
  }

  addPersonInterval() {
    setInterval(this.addPersonToQueue.bind(this), this.intervalNewPerson);
  }

  generateTransactions() {
    const numberOfTransactions = this.randomMaxMin(
      MAX_PERSON_TRANSACTIONS,
      MIN_PERSON_TRANSACTIONS,
    );
    const transactions = Array(numberOfTransactions).fill({
      id: nanoid(),
    });

    return transactions;
  }

  randomMaxMin(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const initATMs = Array(3).fill({
  id: nanoid(),
  status: ATMStatus.Free,
  queue: [],
});

const initQueue = [];

const data = new Data(initATMs, initQueue);
// data.addPersonInterval();

export default data;
