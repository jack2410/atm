import { Row, Col, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ATM from './components/ATM';
import Queue from './components/Queue';

import useAtm from './hooks/useAtm';

const App = () => {
  const { atms, queue, addData, removeData } = useAtm();

  return (
    <div className="vh-100 pt-5 d-flex flex-column align-items-center">
      <Row className="wrapper">
        <Col md={12} className="mb-2">
          <Row>
            <Col md={3}>
              <Button color="primary" size="sm" onClick={addData}>
                Add new ATM
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={8} className="d-flex align-items-start flex-wrap mb-3 atms">
          <Row className="w-100">
            {atms.map((atm) => (
              <Col md={4} key={atm.id} className="mb-3">
                <ATM atm={atm} removeAtm={removeData} />
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
