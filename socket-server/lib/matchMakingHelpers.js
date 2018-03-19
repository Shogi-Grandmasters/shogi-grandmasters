immp

export class matchQueue {
  constructor() {
    this.storage = [];
  }

  enqueue(match) {
    this.storage.unshift(match);
  }

  dequeue() {
    if (this.storage.length > 0) {
      return this.storage.pop();
    }
  }

  pluck(match) {
    for (let i = 0; i < this.storage.length; i ++) {
      if (match.id === this.storage[i].id) {
        return this.storage.splice(i, 1);
      }
    }
    return null;
  }

  list() {
    return this.storage;
  }

  size() {
    return this.storage.length;
  }
}



module.exports = {
  matchQueue,
}


//upon
