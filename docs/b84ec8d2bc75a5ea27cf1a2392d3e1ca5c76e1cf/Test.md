# File: src/testing/Test.js (Commit: b84ec8d2bc75a5ea27cf1a2392d3e1ca5c76e1cf)

## Function: `insertionSort`

- **Description:** This function implements the Insertion Sort algorithm to sort an array of integers in ascending order.
- **Parameters:**
  - `ar`: An array of integers to be sorted.
  - `n`: The number of elements in the array `ar`.
- **Returns:** This function does not return any value. Instead, it modifies the input array `ar` to contain the sorted elements.

The function works by iterating through the array from the second element (index 1) and comparing each element with the ones already sorted (to the left). If the current element is greater than the previous one, it swaps them until the current element is in the correct position. This process continues until the end of the array is reached.

---

## Function: `main`

- **Description:** The `main` function is the entry point of the program. It takes the number of elements and their values as input, calls the `insertionSort` function to sort the array, and then prints the sorted array.
- **Parameters:**
  - `n`: The number of elements in the array.
- **Returns:** The function returns 0 upon successful execution.

The function first takes the number of elements as input, then creates an array of that size. It then reads the elements one by one and stores them in the array. After that, it calls the `insertionSort` function to sort the array and finally prints the sorted array.