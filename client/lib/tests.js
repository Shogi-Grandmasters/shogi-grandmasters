import GameTile from "./GameTile.js";
import { isCheckOrMate, validDropLocations } from "./boardHelpers.js";

export const test = () => {
  let testBoard, testKings, testHands, testTile, result;
  const passed = () => console.log("<<<Test Passed>>>");
  const failed = data => console.log("***Test Failed***", data);

  testBoard = [
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
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Pawn", "white", [6, 8]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should not find check or checkmate on a new board");
  if (!result[0] && !result[1]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["L", "N", "S", " ", "K", " ", "S", "N", "L"],
    [" ", " ", " ", " ", " ", " ", " ", "B", " "],
    ["P", "P", "P", " ", " ", " ", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", " ", "p", "p", "p", "p"],
    [" ", "b", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Rook", "white", [7, 4]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should correctly recoginze the king can move out of check");
  if (result[0] && !result[1]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["L", "N", "S", "G", "K", "G", " ", "N", "L"],
    [" ", "R", " ", "P", "R", "S", " ", "B", " "],
    ["P", "P", "P", "n", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", "b", " ", " ", " ", " ", " ", "r", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Knight", "white", [2, 3]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should correctly recoginze the capture to get out of check");
  if (result[0] && !result[1]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: [], black: ["B"] };
  testTile = new GameTile("Rook", "white", [7, 4]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should know that a dropped piece will get out of check");
  if (result[0] && !result[1]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", " ", "P", " ", " ", " "],
    [" ", " ", " ", "P", "K", "P", " ", " ", " "],
    [" ", " ", " ", "P", " ", "P", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]
  ];
  testKings = { white: [8, 4], black: [5, 4] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Rook", "white", [7, 4]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log(
    "should know moving away from a dynamic piece will not get out of check"
  );
  if (result[0] && result[1]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "l", "r", "l", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Rook", "white", [5, 4]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should correctly recoginze checkmate");
  if (result[0] && result[1]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", "g", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Gold", "white", [1, 4]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log(
    "should recognize the king cannot put himself in check to get out of check"
  );
  if (result[0] && result[1]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    ["L", "N", "S", "G", "K", "G", " ", "N", "L"],
    [" ", "R", " ", " ", " ", "S", " ", "B", " "],
    ["P", " ", "b", "P", " ", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "P", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "p", " ", " ", " ", " ", " ", " "],
    ["p", "p", " ", "p", " ", "p", "p", "p", "p"],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: [], black: [] };
  testTile = new GameTile("Bishop", "white", [2, 2]);
  result = isCheckOrMate(
    {
      board: testBoard,
      kings: testKings,
      white: testHands.white,
      black: testHands.black
    },
    testTile
  );
  console.log("should correctly recoginze fool's mate");
  if (result[0] && result[1]) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", "R", "K", "R", " ", " ", " "],
    [" ", " ", " ", "P", " ", "P", " ", " ", " "],
    [" ", " ", " ", " ", "s", " ", " ", " ", " "],
    [" ", " ", " ", " ", "r", " ", " ", " ", " "],
    [" ", " ", " ", " ", "n", " ", " ", " ", " "],
    [" ", " ", " ", " ", "g", " ", " ", " ", " "],
    ["p", "p", "p", "p", "l", "p", "p", "p", "p"],
    [" ", " ", " ", " ", "g", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: ["p"], black: [] };
  testTile = new GameTile("Pawn", "white", [10, 10]);
  result = validDropLocations(testBoard, testKings, testTile);
  console.log("should not try to drop pawn causing checkmate");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "k", " ", " ", " ", " "]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: ["p"], black: [] };
  testTile = new GameTile("Pawn", "white", [10, 10]);
  result = validDropLocations(testBoard, testKings, testTile);
  console.log("should not try to drop pawn in column with another pawn");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "k", "l", "l", "l", "l"]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: ["p"], black: [] };
  testTile = new GameTile("Pawn", "white", [10, 10]);
  result = validDropLocations(testBoard, testKings, testTile);
  console.log("should not try to drop pawn in last row");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }

  testBoard = [
    [" ", " ", " ", " ", "K", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "b", "l", "l", "l", "l"],
    ["l", "l", "l", "l", "k", "l", "l", "l", "l"]
  ];
  testKings = { white: [8, 4], black: [8, 4] };
  testHands = { white: ["n"], black: [] };
  testTile = new GameTile("Knight", "white", [10, 10]);
  result = validDropLocations(testBoard, testKings, testTile);
  console.log("should not try to drop knight in last 2 rows");
  if (result.length === 0) {
    passed();
  } else {
    failed(result);
  }
};
