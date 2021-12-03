// Using Merge Sort algorithm
  
function merge(arr,patterns, l, m, r)
{
    const  n1 = m - l + 1;
    const  n2 = r - m;
  
    // Create temp arrays
    const  leftRanks = new Array(n1); 
    const  rightRanks = new Array(n2);

	  const leftPatterns = new Array(n1);
	  const rightPatterns = new Array(n2);
  
    // Copy data to temp arrays
    for (let i = 0; i < n1; i++){
        leftRanks[i] = arr[l + i];
			  leftPatterns[i] = patterns[l+i];
		}
    for (let j = 0; j < n2; j++){
        rightRanks[j] = arr[m + 1 + j];
			  rightPatterns[j] = patterns[m+1+j];
		}
  
    // Merge the temp arrays back into arr[l..r]
  
    // Initial index of first subarray
    let i = 0;
  
    // Initial index of second subarray
    let j = 0;
  
    // Initial index of merged subarray
    let k = l;
  
    while (i < n1 && j < n2) {
        if (leftRanks[i] >= rightRanks[j]) {
            arr[k] = leftRanks[i];
					  patterns[k] = leftPatterns[i];
            i++;
        }
        else {
            arr[k] = rightRanks[j];
					  patterns[k] = rightPatterns[j];
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // left[], if there are any
    while (i < n1) {
        arr[k] = leftRanks[i];
			  patterns[k] = leftPatterns[i];
        i++;
        k++;
    }
  
    // Copy the remaining elements of
    // right[], if there are any
    while (j < n2) {
        arr[k] = rightRanks[j];
			  patterns[k] = rightPatterns[j];
        j++;
        k++;
    }
}
  

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */

function mergeSort(arr,patterns,l, r){
    if(l>=r){
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    mergeSort(arr,patterns,l,m);
    mergeSort(arr,patterns,m+1,r);
    merge(arr,patterns,l,m,r);
}

module.exports = mergeSort;
