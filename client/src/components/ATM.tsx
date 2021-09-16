import { FC } from 'react';
import { Card, CardBody, CardFooter } from 'reactstrap';

import atmImage from '../assets/images/atm.png';
import manImage from '../assets/images/man.png';
import { ATM as ATMType, ATMStatus } from '../types/ATM';

interface Props {
  atm: ATMType;
}

const ATM: FC<Props> = ({ atm }: Props) => {
  const { id, status, queue } = atm;
  const isBusy = status === ATMStatus.Busy;

  return (
    <Card className="d-flex flex-column align-items-center">
      <CardBody className="d-flex flex-column align-items-center">
        <img className="atm-image" src={atmImage} alt="atm-machine" />
        <p
          className={`fw-bold fs-2 ${isBusy ? 'text-danger' : 'text-success'}`}
        >
          {atm.status}
        </p>
      </CardBody>
      {!!queue?.length && (
        <CardFooter className="w-100 px-3 pt-3">
          {queue.map((person) => (
            <div key={person.id} className="d-flex align-items-start mb-2">
              <img className="man-image" src={manImage} alt="waiting-man" />
              <div className="mx-2">
                <span className="fw-bold">{person.id}</span>
                <p>Pending transactions: {person.transactions.length}</p>
              </div>
            </div>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export default ATM;
