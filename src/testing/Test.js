// #include<stdio.h>

// // Function to perform insertion sort
// void insertionSort(int ar[], int n)
// {
//     // Outer loop goes from 0 to n-2 (we'll be inserting elements from index 1 onwards)
//     for (int i = 0; i < n - 1; i++)
//     {
//         int j = i;
//    // Keep swapping the current element with the previous one until it's in the right place
//         while (j > 0 && ar[j - 1] > ar[j])
//         {
//             // Swap arr[j] and arr[j - 1]
//             int t = ar[j - 1];
//             ar[j - 1] = ar[j];
//             ar[j] = t;

//             j--; // move left
//         }
//     }
//     // Print the sorted array
//     printf("After the sorting:\n");
//     for (int i = 0; i < n; i++)
//     {
//         printf("%d ", ar[i]);
//     }
// }

// int main()
// {
//     int n;

//     // Take the number of elements
//     scanf("%d", &n);
//      int a[n];
//       // Take input elements
//     for (int i = 0; i < n; i++)
//     {
//         scanf("%d", &a[i]);
//     }
//     // Call the sorting function
//     insertionSort(a, n);
//     return 0;
