import { useState, useRef, useEffect } from 'react';

import { ATM, Person } from '../types/ATM';
import { INTERVAL_API_CALLING } from '../utils/constants';
import { getAtms, addAtm, removeAtm, getQueue } from '../services/api';

const useAtm = () => {
  const [atms, setAtms] = useState<ATM[]>([]);
  const [queue, setQueue] = useState<Person[]>([]);

  const interval = useRef<any>(null);

  useEffect(() => {
    interval.current = setInterval(getData, INTERVAL_API_CALLING);

    return () => clearInterval(interval.current);
  }, []);

  const getData = async () => {
    try {
      const [atmRes, queueRes] = await Promise.all([getAtms(), getQueue()]);
      setAtms(atmRes.data);
      setQueue(queueRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addData = async () => {
    try {
      await addAtm();
    } catch (err) {
      console.error(err);
    }
  };

  const removeData = async (id: string) => {
    try {
      await removeAtm(id);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    atms,
    queue,
    addData,
    removeData,
  };
};

export default useAtm;
