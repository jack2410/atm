import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ATM from './components/ATM';
import Queue from './components/Queue';

import useAtm from './hooks/useAtm';

const App = () => {
  const { atms, queue } = useAtm();

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div>
        <div className="d-flex align-items-start flex-wrap mb-3">
          {atms.map((atm) => (
            <ATM key={atm.id} atm={atm} />
          ))}
        </div>

        <div className="w-100">
          <Queue queue={queue} />
        </div>
      </div>
    </div>
  );
};

export default App;
