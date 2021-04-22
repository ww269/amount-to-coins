## Amount-To-Coins Calculator

>Amount-To-Coins calculator accepts an input from the user and calculates the minimum number of coins needed to make up the input amount, using UK Sterling denominations. 

### App Structure
___

The application consists of 2 files: 
- index.html
- js/main.js

Required libraries (delivered via CDNs):
- Bootstrap
- JQuery


### App Logic
___

### 1. Validation of Input

`validateInput()`

>The application accepts an input from and is checked for any illegal characters except for those allowed in the format. For example: **£12.34p**. 

### 2. Converting input into pennies

`convertToPennies()`

>The input is then converted into the lowest denomination (pennies).  Depending on the input format, the application checks for £ . and p to determine the correct denomination that makes up the strcuture of the input.

### 3. Convert to coins

`convertToCoins()`

> Determination what coins are needed are calculated by iterating through the available denominations against the value, using the built-in Math and remainder (%) functions until there are no remainders.  

>**!Important:** 
The array: `denoms[]` ensures the order of iteration from largest denomination to smallest so that the minimum number of coins are needed.

>The result is then stored in the `coinsNeeded{}`.


### 4. Render results

`renderResults()`

>The final step is then to render the result onto the user interface using the data from `coinsNeeded{}`

___

[wwong-cv.com/apps/amount-to-coins](http://wwong-cv.com/apps/amount-to-coins)
