import { Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ATM from './components/ATM';
import Queue from './components/Queue';

import useAtm from './hooks/useAtm';

const App = () => {
  const { atms, queue } = useAtm();

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <Row>
        <Col md={8} className="d-flex align-items-start flex-wrap mb-3">
          <Row>
            {atms.map((atm) => (
              <Col md={4} key={atm.id}>
                <ATM atm={atm} />
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={4}>
          <Queue queue={queue} />
        </Col>
      </Row>
    </div>
  );
};

export default App;
