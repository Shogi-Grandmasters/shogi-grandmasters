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
      roomId !== "home" && room.set("board", board);
      this.store.set(roomId, room);
    }
    return room;
  }
}
