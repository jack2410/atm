import { Injectable } from '@nestjs/common';

@Injectable()
export class AtmService {
  getAtm() {
    return 'Atm';
  }
}
