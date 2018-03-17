const shogiBoard = JSON.stringify([
  ["L", "H", "S", "G", "K", "G", "S", "H", "L"],
  [" ", "R", " ", " ", " ", " ", " ", "B", " "],
  ["P", "P", "P", "P", "P", "P", "P", "P", "P"],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
  [" ", "b", " ", " ", " ", " ", " ", "r", " "],
  ["l", "h", "s", "g", "k", "g", "s", "h", "l"]
]);

export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = new Map();
  }

  findOrCreate(roomId, board = shogiBoard) {
    let room = this.store.get(roomId);
    if (!room) {
      room = new Map();
      room.set("id", roomId);
      room.set("board", board);
      this.store.set(roomId, room);
    }
    return room;
  }
}
