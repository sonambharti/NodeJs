# Promises

Promises in Node.js (and JavaScript in general) are objects representing the eventual completion (or failure) of an asynchronous operation and its resulting value. They provide a cleaner, more manageable way to handle asynchronous operations compared to traditional callback-based approaches.

## Key Concepts of Promises:

1. States of a Promise:
    - Pending: The initial state, neither fulfilled nor rejected.
    - Fulfilled: The operation completed successfully.
    - Rejected: The operation failed.
2. Methods of a Promise:
    - `then`: Attaches callbacks for the fulfilled and rejected cases.
    - `catch`: Attaches a callback for only the rejected case.
    - `finally`: Attaches a callback that will be executed regardless of the promise's outcome (fulfilled or rejected).

## Example of Using Promises:
There are multiple ways to write Promises. Here are some ways, we have given in our examples.
1. Here is an example (firstPromise.js) of how Promises can be used in Node.js for an asynchronous operation, such as reading a file.
2. We can also create your own custom promises using the Promise constructor. Here’s an example in customPromise.js.

### Explanation for an asynchronous operation:

1. `fs.promises`:
    - The fs module's promises API provides promise-based methods for file operations.
2. `readFilePromise` Function:
    - This function returns a promise from fs.readFile that reads the content of example.txt.
3. Using `then`:
    - `then` attaches a callback to handle the successful reading of the file, where the file's content is logged.
4. Using `catch`:
    - `catch` attaches a callback to handle any errors that occur during the file reading operation.
5. Using `finally`:
    - `finally` attaches a callback that will execute regardless of the operation's outcome, indicating that the file read operation is complete.

### Explanation to Create a Custom Promise:

1. `asyncOperation` Function:
    - This function returns a new promise that simulates an asynchronous operation with `setTimeout`.
    - Inside the promise, it randomly decides to either resolve (succeed) or reject (fail) after a 1-second delay.
2. Using the Promise:
    - `then` attaches a callback to handle the successful resolution of the promise.
    - `catch` attaches a callback to handle the rejection of the promise.
    - `finally` attaches a callback that will execute regardless of the promise’s outcome, indicating the completion of the asynchronous operation.


