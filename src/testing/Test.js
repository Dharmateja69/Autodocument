// def mergeSort(arr):
//     # Base case: if the array has 0 or 1 element, it's already sorted
// if len(arr) > 1:
//     mid = len(arr) // 2  # Find the middle point to divide the array into two halves.
// leftHalf = arr[:mid]  # Dividing the array elements into two halves.
//     rightHalf = arr[mid:]  # Dividing the array elements into two halves.

//         mergeSort(leftHalf)  # Sort the first half recursively.
//             mergeSort(rightHalf)  # Sort the second half recursively.

//                 i = j = k = 0  # Initialize pointers for leftHalf, rightHalf, and the main array

//         # Merge the two halves into the main array
// while i < len(leftHalf) and j < len(rightHalf):
// if leftHalf[i] < rightHalf[j]:
//     arr[k] = leftHalf[i]
// i += 1
//             else:
// arr[k] = rightHalf[j]
// j += 1
// k += 1

//         # Copy any remaining elements from the left half
// while i < len(leftHalf):
//     arr[k] = leftHalf[i]
// i += 1
// k += 1

//         # Copy any remaining elements from the right half
// while j < len(rightHalf):
//     arr[k] = rightHalf[j]
// j += 1
// k += 1

// # Example usage:
// if __name__ == '__main__':
//     arr = [12, 11, 13, 5, 6, 7]
// print("Given array is", arr)

// mergeSort(arr)

// print("Sorted array is: ", arr)

