export class Queue {
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

  pluck(userId) {
    for (let i = 0; i < this.storage.length; i ++) {
      if (userId === this.storage[i]) {
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

export const findMatch = (openMatches, challenger) => {
  let bestFit = [0, Infinity];
  openMatches.forEach((match) => {
    let spread = Math.abs(match.player1.rating - challenger.rating);
    if (spread < bestFit[1]) {
      bestFit = [match.id, spread];
    }
  });
  return bestFit[0];
}
