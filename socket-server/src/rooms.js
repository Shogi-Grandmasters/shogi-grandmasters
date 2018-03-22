const shogiBoard = [
  ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
  [" ", "R", " ", " ", " ", " ", " ", "B", " "],
  ["P", "P", "P", "P", "P", "P", "P", "P", "P"],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
  [" ", "b", " ", " ", " ", " ", " ", "r", " "],
  ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
];

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
      room.set("waiting", true);
      this.store.set(roomId, room);
    }
    return room;
  }
}
