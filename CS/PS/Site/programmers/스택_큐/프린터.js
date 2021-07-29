class QueueElement { 
  constructor(element, prior) { 
    this.element = element;
    this.prior = prior;
  }
}

class PriorQueue { 
  constructor() { 
    this.queue = [];
  }
  enqueue(element, prior) { 
    let qElement = new QueueElement(element, prior);
    let isContain = false;

    for (let i = 0, j = this.queue.length; i < j;i++) { 
      if (this.queue[i].prior < qElement.prior ||
        this.queue[i].element < qElement.element) { 
        this.queue.splice(i, 0, qElement);
        isContain = true;
        break;
        }
    }
    if (!isContain)
      this.queue.push(qElement);
  }
}



function solution(priorities, location) {
  let pQueue = new PriorQueue();
  var answer = 0;
  priorities.forEach((v, idx) => { 
    pQueue.enqueue(idx + 1, v);
  })
  return answer;
}

console.log(solution([1, 1, 9, 1, 1, 1],5));
