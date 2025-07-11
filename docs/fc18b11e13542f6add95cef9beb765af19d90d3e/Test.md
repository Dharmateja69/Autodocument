# File: src/testing/Test.js (Commit: fc18b11e13542f6add95cef9beb765af19d90d3e)

## Function: mergeSort

- **Description:** This function implements the Merge Sort algorithm, which is a divide-and-conquer algorithm for sorting a list. It works by recursively dividing the input array into two halves until the base case (array size of 0 or 1) is reached, then merges the sorted halves back together.

- **Parameters:** None (This function takes an array as an argument)

- **Returns:** A sorted version of the input array

---

### Example usage:

```python
if __name__ == '__main__':
    arr = [12, 11, 13, 5, 6, 7]
    print("Given array is", arr)

    mergeSort(arr)

    print("Sorted array is: ", arr)
```

In this example, the `mergeSort` function is called with an array `[12, 11, 13, 5, 6, 7]`, and the sorted array `[5, 6, 7, 11, 12, 13]` is printed.