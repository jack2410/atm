import { FC } from 'react';
import { Card, CardBody, CardFooter } from 'reactstrap';

import atmImage from '../assets/images/atm.png';
import manImage from '../assets/images/man.png';
import cancelImage from '../assets/images/cancel.png';
import { ATM as ATMType, ATMStatus } from '../types/ATM';

interface Props {
  atm: ATMType;
  removeAtm: Function;
}

const ATM: FC<Props> = ({ atm, removeAtm }: Props) => {
  const { id, status, queue } = atm;
  const isBusy = status === ATMStatus.Busy;

  return (
    <Card className="d-flex flex-column align-items-center">
      <CardBody className="d-flex flex-column align-items-center">
        <div className="w-100 d-flex justify-content-end mb-2">
          <img
            className="cancel-image cursor-pointer"
            src={cancelImage}
            alt="cancelBtn"
            onClick={() => removeAtm(id)}
          />
        </div>
        <img className="atm-image" src={atmImage} alt="atm-machine" />
        <p
          className={`fw-bold fs-2 ${isBusy ? 'text-danger' : 'text-success'}`}
        >
          {atm.status}
        </p>
        <h4
          className={``}
        >
          {atm.name}
        </h4>
      </CardBody>
      {!!queue?.length && (
        <CardFooter className="w-100 px-3 pt-3">
          {queue.map((person) => (
            <div key={person.id} className="d-flex align-items-start mb-2">
              <img className="man-image" src={manImage} alt="waiting-man" />
              <div className="mx-2 overflow-hidden">
                <span className="fw-bold">{person.name}</span>
                <p>Pending transactions: {atm.remainingInProcessTnxCount}</p>
              </div>
            </div>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export default ATM;
