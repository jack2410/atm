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
      <div className="queue">
        {!!queue.length ? (
          <>
            {queue.map((person) => (
              <div
                key={person.id}
                className="d-flex flex-column p-2 m-2 queue-item"
              >
                <img className="man-image" src={manImage} alt="waiting-man" />
                <span className="break-word">Name: {person.name}</span>
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
