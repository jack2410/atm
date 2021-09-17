// import { isMainThread, parentPort } from 'worker_threads';
const { isMainThread, parentPort } = require('worker_threads')

if (isMainThread) {
    throw new Error('Its not a worker');
}

const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

const processTransaction = async (data) => {
    let i = 0
    for(const transaction of data.transactions) {
        i++
        await sleep(1000)
        parentPort.postMessage(data.transactions.length - i)
    }
    return true
};

parentPort.on('message', async (data) => {
    const result = await processTransaction(data);
    parentPort.postMessage(-1);
});