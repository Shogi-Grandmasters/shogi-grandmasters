import { initialBoard } from './lib/constants';

export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = new Map();
  }

  findOrCreate(roomId) {
    let room = this.store.get(roomId);
    if (!room) {
      room = new Map();
      room.set("id", roomId);
      this.store.set(roomId, room);
    }
    return room;
  }
}
