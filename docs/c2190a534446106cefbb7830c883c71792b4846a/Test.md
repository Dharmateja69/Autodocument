# File: src/testing/Test.js (Commit: c2190a534446106cefbb7830c883c71792b4846a)

## Function: `insertionSort`

- **Description:** This function implements an insertion sort algorithm for sorting an array of integers. The algorithm iterates through the array, taking each element and inserting it in the correct position in the sorted portion of the array.
- **Parameters:**
  - `ar`: The array to be sorted.
  - `n`: The number of elements in the array.
- **Returns:** Nothing. The function modifies the `ar` array in-place.

---

## Function: `main`

- **Description:** The `main` function takes the number of elements and the elements themselves as input from the user, calls the `insertionSort` function to sort the array, and then prints the sorted array.
- **Parameters:**
  - `n`: The number of elements in the array.
  - `a`: The array of integers to be sorted.
- **Returns:** The function returns 0 to indicate successful execution.

---

## Additional Information:

- The `insertionSort` function works by comparing each element with the elements before it in the array, and swapping them if necessary until the element is in the correct position. This process is repeated for each element in the array.
- The `main` function demonstrates the step-by-step iterations of the array during the sorting process, showing the comparisons and swaps that occur.