import { Injectable } from '@nestjs/common';

import data from '../data';

@Injectable()
export class AtmService {
  getAtm() {
    return data.getAtms();
  }

  addAtm() {
    data.addAtm();
    return data.getAtms();
  }
}
