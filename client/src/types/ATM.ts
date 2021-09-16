export enum ATMStatus {
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
