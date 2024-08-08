In Node.js, async and await provide a more readable and maintainable way to work with asynchronous code compared to traditional callback-based or promise-based approaches. They allow you to write asynchronous code that looks and behaves like synchronous code, which can make it easier to understand and maintain. <br/><br/>

# Basics of async and await:
1. `async` function: Declares an asynchronous function that returns a promise. The function can contain `await` expressions.
2. `await` expression: Pauses the execution of the `async` function until the promise is settled (either resolved or rejected), and returns the fulfilled value of the promise. It can only be used inside an `async` function.

## Example: Reading and Writing Files using `async`/`await`:

Here's an example of how to use `async`/`await` in Node.js to read from one file and write to another using the `fs.promises API` in `asyncReadWriteFile.js`.

### Steps:
1. Import `fs.promises`:
    - The `fs.promises` API provides promise-based methods for file operations.

2. Define `async` function `copyFile`:
    - The `copyFile` function is defined as an async function, which means it can use await inside it.

3. Read File using await `fs.readFile`:
    - The await keyword pauses the execution of the `copyFile` function until the promise returned by `fs.readFile` is resolved. The content of the file is then assigned to the data variable.

4. Write File using await `fs.writeFile`:
    - Similarly, await pauses the execution until the promise returned by `fs.writeFile` is resolved, writing the data to the destination file.

5. Error Handling with `try...catch`:
    - The `try...catch` block is used to handle any errors that occur during the file operations.



## Another Example: Fetching Data from an API

Here's an example using the `axios` library to fetch data from an API with `async`/`await`:

### Steps:

1. Import `axios`:
    - The `axios` library is used for making HTTP requests.

2. Define `async` function fetchData:
    - The `fetchData` function is an `async` function that fetches data from the given URL.

3. Fetch Data using `await axios.get`:
    - The `await` keyword pauses the execution of the `fetchData` function until the promise returned by `axios.get` is resolved. The response data is then logged to the console.

4. Error Handling with try...catch:
    - The `try...catch` block is used to handle any errors that occur during the API request.



## Explain Exponential Back Off

1. `axios` Library:
    - Included the axios library to make HTTP requests.

2. `wait` Function:
    - The `wait` function takes a timeout in milliseconds and returns a promise that resolves after the specified timeout using setTimeout.

3. `requestWithRetry` Function:
    - This is an `async` function that tries to make a request to the given URL.
    - It sets a maximum number of retries (`MAX_RETRIES`).
    - A `for` loop is used to attempt the request up to the maximum number of retries.
    - Inside the loop:
        - It attempts to make the request using `await request(url)`.
        - If the request fails (`catch` block), it calculates an exponential backoff timeout `(Math.pow(2, i))` and waits for that duration using the `wait` function before retrying.
        - Multiplied the backoff timeout by 100 (`Math.pow(2, i) * 100`) to make the backoff time more reasonable (100ms, 200ms, 400ms, etc.).
        - It logs the waiting time and retry attempt.

4. Error Handling:
    - Added an error message (throw new Error('Max retries reached')) after the loop to indicate that the maximum number of retries has been reached.

5. Execution:
    - The `requestWithRetry` function is called with a sample URL (`https://api.github.com/users/octocat`), and the result is logged to the console.
    - Added `.catch` to handle any errors after the maximum number of retries.


## Summary:

Using async/await in Node.js simplifies working with asynchronous code, making it more readable and maintainable. It allows you to write code that appears synchronous, while still handling asynchronous operations efficiently.