import { capitais, weights, hospitais } from "./capitais";

class Solution {
  static menorDistancia(start_location) {
    let menoresDistancias = [];
    for (let i = 0; i < hospitais.length; i++) {
      menoresDistancias.push(this.question(start_location, hospitais[i].capital));
    }

    let distanciaHospitais = [];
    for (let i = 0; i < hospitais.length; i++) {
      distanciaHospitais = [
        ...distanciaHospitais,
        { ...hospitais[i], distancia: menoresDistancias[i] },
      ];
    }

    console.log(distanciaHospitais);
    let menor = Math.min(...menoresDistancias);
    const resposta = distanciaHospitais.filter((e) => e.distancia === menor);
    console.log("Esse é o menor", resposta);
    return resposta[0];
  }

  static question(start_location, destination) {
    let visited = new Map();
    let maxHeap = new MaxHeap();
    maxHeap.insert([start_location, 0]);
    let distance = new Map();

    while (maxHeap.heapSize) {
      let [node, weight] = maxHeap.remove();

      weight = -weight;
      if (visited.has(node)) {
        continue;
      }

      visited.set(node, true);
      distance.set(node, weight);

      capitais.forEach((node1) => {
        let weight1 = 0;
        if (weights[node + ":" + node1]) {
          weight1 = weights[node + ":" + node1];
        } else if (weights[node1 + ":" + node]) {
          weight1 = weights[node1 + ":" + node];
        }
        maxHeap.insert([node1, -(weight + weight1)]);
      });
    }

    let answer = Infinity;
    for (const key of distance.keys()) {
      if (key === destination) {
        answer = Math.min(answer, distance.get(key));
      }
    }

    return answer;
  }
}

class MaxHeap {
  constructor() {
    this.heapList = [0];
    this.heapSize = 0;
  }

  insert = (value) => {
    this.heapList.push(value);
    this.heapSize += 1;

    this.shiftUp(this.heapSize);
  };

  shiftUp = (childPosition) => {
    while (Math.floor(childPosition / 2) > 0) {
      let parent = Math.floor(childPosition / 2);

      if (this.heapList[parent][1] < this.heapList[childPosition][1]) {
        let temp = this.heapList[childPosition];
        this.heapList[childPosition] = this.heapList[parent];
        this.heapList[parent] = temp;
      }

      childPosition = parent;
    }
  };

  remove = () => {
    const maxValue = this.heapList[1];

    this.heapList[1] = this.heapList[this.heapSize];
    this.heapSize -= 1;

    this.heapList.pop();

    this.shiftDown(1);
    return maxValue;
  };

  shiftDown = (parentPosition) => {
    while (parentPosition * 2 <= this.heapSize) {
      const maxChildPosition = this.findMaxChild(parentPosition);

      if (
        this.heapList[parentPosition][1] < this.heapList[maxChildPosition][1]
      ) {
        const temp = this.heapList[maxChildPosition];
        this.heapList[maxChildPosition] = this.heapList[parentPosition];
        this.heapList[parentPosition] = temp;
      }

      parentPosition = maxChildPosition;
    }
  };

  findMaxChild = (parentPosition) => {
    const rightChild = parentPosition * 2 + 1;
    const leftChild = parentPosition * 2;

    if (rightChild > this.heapSize) {
      return leftChild;
    } else {
      if (this.heapList[rightChild][1] > this.heapList[leftChild][1]) {
        return rightChild;
      } else {
        return leftChild;
      }
    }
  };

  build = (arrayList) => {
    const len = arrayList.length;
    this.heapSize = len;
    this.heapList = [0, ...arrayList];

    let position = Math.floor(len / 2);

    while (position > 0) {
      this.shiftDown(position);
      position -= 1;
    }
  };
}

export default Solution;
