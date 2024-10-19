class Calculator {
    add (a, b){
        return a + b;
    }

    subtract (a, b) {
        return a - b;
    }

    multiply (a, b){
        return a * b;
    }

    divide (a, b) {
        if (b == 0) {
            return "Error: Division by zero is not allowed";
        } else {
            return a / b;
        }
    }
}

module.exports = Calculator


// module.exports = class {
//     add(a, b) {
//       return a + b;
//     }
  
//     multiply(a, b) {
//       return a * b;
//     }
  
//     divide(a, b) {
//       return a / b;
//     }
//   };
  