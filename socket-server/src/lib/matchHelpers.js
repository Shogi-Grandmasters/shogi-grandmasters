export class Queue {
  constructor() {
    this.storage = [];
  }

  enqueue(match) {
    this.storage.push(match);
  }

  dequeue() {
    if (this.storage.length > 0) {
      return this.storage.shift();
    }
  }

  pluck(userId) {
    for (let i = 0; i < this.storage.length; i++) {
      if (userId === this.storage[i][0]) {
        return this.storage.splice(i, 1)[0];
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
  openMatches.forEach(match => {
    let spread = Math.abs(match.player1.rating - challenger.rating);
    if (spread < bestFit[1]) {
      bestFit = [match.id, spread];
    }
  });
  return bestFit[0];
};

export const findOpponent = (queue, player2) => {
  const players = queue.list();
  for (let player1 of players) {
    let spread = Math.abs(player1[1] - player2[1]);
    if (spread <= 500) {
      return player1;
    }
  }
};
