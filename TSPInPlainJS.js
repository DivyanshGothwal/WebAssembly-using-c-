
const config = require('./config').config;
const size = config.size;
const source = config.source;
const graph=[];
const vertex=[];
console.time('JSTime');
for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
      if(j===i){
        graph[(i*size)+j]=0;
      }
      else{
        graph[(i*size)+j]=(i*size)+j;
      }
    }
  }
for(let i=0,j=0;i<size;i++){
    if(i!=source){
      vertex[j]=i;
      j++;
    }
}

function getAllPermutations(arr) {
    let allPermuatations = [];
    for (let i = 0; i < arr.length; i = i + 1) {
        let rest = getAllPermutations(arr.slice(0, i).concat(arr.slice(i + 1)));
        if(!rest.length) {
            allPermuatations.push([arr[i]])
        } else {
            for(let j = 0; j < rest.length; j = j + 1) {
                allPermuatations.push([arr[i]].concat(rest[j]))
            }
        }
    }
    return allPermuatations;
}

function TspForJS(s,size){
    let minWeigth = Number.MAX_SAFE_INTEGER;
    getAllPermutations(vertex).forEach(eachEle=>{
        let current_pathweight = 0;
        let k = s;
        for (var i = 0; i < size-1; i++) {
            current_pathweight = current_pathweight + graph[k*size+eachEle[i]];
            k = eachEle[i];
        }
        current_pathweight =current_pathweight + graph[k*size+s];
        if(minWeigth > current_pathweight){
            minWeigth=current_pathweight;
        }
    });
    return minWeigth;
}
console.log("JavaScript Output : "+TspForJS(source,size));
console.timeEnd('JSTime');