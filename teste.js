function arraySum(numbers) {
  // Write your code here
  let array = []
  for(let i = 1; i <= numbers;i++){
  array.push(i)

      if(i === numbers){
          let sumArray = 0;
  
          for(let j = 0; j < array.length; j++){
  
              sumArray += array[j]

              if(j === array.length - 1){
              return sumArray
              }
          }
      }
  }
 
}

console.log(arraySum(5))