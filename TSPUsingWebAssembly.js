const fs = require('fs');
const config = require('./config').config;
const size = config.size;
const source = config.source;

console.time('WebAssemblyTime');
const buf = fs.readFileSync('./wasm/program.wasm');
const env = {
  consoleLog: function consoleLog (value) {
    //console.log(value);
  }
}
var wasmModule = new WebAssembly.Module(buf);
WebAssembly.instantiate(wasmModule, {
  env:env
}).then(result => {
  callTsp(result);
  console.timeEnd('WebAssemblyTime');
}).catch(e => {
      console.log(e);
});

function callTsp(result){
  let graphOffset = result.exports.getOffsetGraph();
  let vertexOffset = result.exports.getOffsetvertex();

  let vertex = new Int32Array(result.exports.memory.buffer, vertexOffset, size-1);
  let graph = new Int32Array(result.exports.memory.buffer, graphOffset, size*size);
  
  let j=0;
  for(let i=0;i<size;i++){
    if(i!=source){
      vertex[j]=i;
      j++;
    }
  }
  for(let i=0;i<size*size;i++){
    graph[i]=i;
  }
  console.log("WebAssembly Output : "+result.exports.TSP(source,size,size));
}
    