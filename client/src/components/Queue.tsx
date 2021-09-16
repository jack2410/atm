import { FC } from 'react';

import { Person } from '../types/ATM';
import manImage from '../assets/images/man.png';

interface Props {
  queue: Person[];
}

const Queue: FC<Props> = ({ queue }: Props) => {
  return (
    <>
      <span className="fw-bold">Queue</span>
      <div className="d-flex queue">
        {!!queue.length ? (
          <>
            {queue.map((person) => (
              <div className="d-flex flex-column queue-item">
                <img className="man-image" src={manImage} alt="waiting-man" />
                <span>{person.id}</span>
                <span>Transactions: {person.transactions.length}</span>
              </div>
            ))}
          </>
        ) : (
          <span className="fw-bold">No waiting clients in queue.</span>
        )}
      </div>
    </>
  );
};

export default Queue;
