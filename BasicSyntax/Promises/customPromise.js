function asyncOperation() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // Simulate success or failure
        if (success) {
          resolve('Operation succeeded!');
        } else {
          reject('Operation failed.');
        }
      }, 1000); // Simulate an asynchronous operation with a 1-second delay
    });
  }
  
  // Using the custom promise
  asyncOperation()
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      console.log('Async operation completed.');
    });
  