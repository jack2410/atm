import { Injectable } from '@nestjs/common';
import { Worker } from "worker_threads";
import { MAX_PERSON_TRANSACTIONS, MIN_PERSON_TRANSACTIONS } from '../utils/constants';
import { nanoid } from 'nanoid';
const faker = require('faker');

export type ATM = {
  id: string
  name: string
  worker: Worker | null
  person: Person | null
  isBusy: boolean
  isDeleting: boolean
  remainingInProcessTnxCount: number
  processedPersons: Person[]
}

export type Transaction = {
  id: string;
};

export type Person = {
  id: string;
  name: string;
  transactions: Transaction[];
};

@Injectable()
export class AtmService {
  atms: ATM[]
  persons: Person[]
  isProcessing: boolean
  constructor(
    
  ) {
    this.atms = []
    this.persons = []
    this.isProcessing = false
    this.addPersonInterval()
    this.initAtm()
    this.startProcessingTransaction()
  }

  initAtm() {
    this.addAtm()
    this.addAtm()
    this.addAtm()
  }

  getAtms() {
    return this.atms
  }

  async getQueue() {
    return this.persons
  }

  getAvailableAtm() {
    return this.atms.find(e => !e.person)
  }

  getFirstPerson() {
    return this.persons.length ? this.persons.shift(): null
  }

  initAllAtms() {
    this.atms.map(atm => {
      if (!atm.isBusy) {
        this.startProcessing(atm)
      }
    })
  }

  startProcessingTransaction() {
    if (this.isProcessing) {
      return
    }
    this.isProcessing = true
    this.initAllAtms()
  }

  startProcessing(atm: ATM) {
    const person = this.getFirstPerson()
    if (!person || atm.isDeleting) {
      atm.isBusy = false
      atm.remainingInProcessTnxCount = 0
      if (atm.isDeleting) {
        this.atms = this.atms.filter(e => e.id !== atm.id)
      }
      return
    }

    atm.isBusy = true
    const workerDoneCb = (transactionCount: number) => {
      if(transactionCount != -1) {
        atm.remainingInProcessTnxCount = transactionCount
      }
      else {
        atm.person = null
        atm.processedPersons = [...atm.processedPersons, person]
        cleanUp()
      }
    }

    const cleanUp = () => {
      atm.worker.removeAllListeners('message');
      this.startProcessing(atm)
    }

    atm.worker.on('message', workerDoneCb)
    atm.person = person
    atm.remainingInProcessTnxCount = person.transactions.length
    atm.worker.postMessage(person)
  }

  stopProcessingTransaction() {

  }


  addAtm() {
    const worker = new Worker('./src/myWorker.js')
    const id = nanoid()
    const newAtm: ATM = {
      id,
      worker,
      person: null,
      isBusy: false,
      remainingInProcessTnxCount: 0,
      isDeleting: false,
      processedPersons: [],
      name: faker.address.state()
    }
    this.atms = [...this.atms, newAtm]
    if (this.isProcessing) {
      this.startProcessing(newAtm)
    }
  }

  async removeAtm(id: string) {
    const atm = this.atms.find(e => e.id === id)
    if (atm) {
      atm.isDeleting = true
    }
  }

  addPersonInterval() {
    setInterval(() => {
      this.addPersonToQueue()
    }, 2000);
  }

  addPersonToQueue() {
    const person: Person = {
      id: nanoid(),
      name: faker.name.findName(),
      transactions: this.generateTransactions(),
    };
    this.persons.push(person);
    if (this.isProcessing) {
      this.initAllAtms()
    }
  }

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
