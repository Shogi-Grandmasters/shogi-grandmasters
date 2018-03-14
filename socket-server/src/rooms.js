const startingText = func =>
  `function ${func}() {

}
`;

/**
 *
 *  Rooms store
 *
 */
export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = new Map();
  }

  findOrCreate(roomId, title) {
    let room = this.store.get(roomId);
    if (!room) {
      room = new Map();
      room.set("id", roomId);
      room.set("text", startingText(title));
      this.store.set(roomId, room);
    }
    return room;
  }
}
