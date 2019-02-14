
 #include <iostream>
#include<climits>
#include <algorithm>
using namespace std;

uint32_t graph[1024], vertex[1024];

uint32_t* getOffsetGraph(){
  return &graph[0];
}

uint32_t* getOffsetVertex(){
  return &vertex[0];
}


void assignValue(uint32_t* vertexOffset,int length);

void consoleLog(double value);

int TSP( int s,int n,int vertexSize)
{
    int min_path = INT_MAX;
    do {
        int current_pathweight = 0;
        
        int k = s;
        
        for (int i = 0; i < vertexSize-1; i++) {
            current_pathweight = current_pathweight + graph[k*n+vertex[i]];
            k = vertex[i];
        }
        
        current_pathweight =current_pathweight + graph[k*n+s];
        
        if(min_path > current_pathweight)
        {
            min_path=current_pathweight;
        }
        
        
    } while (next_permutation(vertex, vertex+vertexSize));
    
    return min_path;
}
