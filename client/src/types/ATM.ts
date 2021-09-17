export enum ATMStatus {
  Busy = 'Busy',
  Free = 'Free',
}

export type ATM = {
  id: string;
  remainingInProcessTnxCount: number;
  status: ATMStatus;
  queue: Person[];
  name: string;
  processedPersons: Person[];
};

export type Transaction = {
  id: string;
};

export type Person = {
  id: string;
  transactions: Transaction[];
  name: string;
};
