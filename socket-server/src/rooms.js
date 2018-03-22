import { initialBoard } from './lib/constants';

export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = new Map();
  }

  findOrCreate(roomId, board = initialBoard) {
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
