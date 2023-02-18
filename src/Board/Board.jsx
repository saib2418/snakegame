import React, { useState, useEffect } from "react";
import "./Board.css";
import { randomIntFromInterval } from "../lib/utils";

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(value) {
    let node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}

class Cell {
  constructor(value) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}

const BOARD_SIZE = 10;

const Direction = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT",
};

const Board = () => {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [foodCell, setFoodcell] = useState(48);
  const [snakeCells, setSnakeCells] = useState(new Set([44]));
  const [snake, setSnake] = useState(new SinglyLinkedList(44));
  const [direction, setDirection] = useState(Direction.RIGHT);

  useEffect(() => {
    setInterval(() => {}, 1000);

    window.addEventListener("keydown", (e) => {
      const newDirection = getDirectionFromKey(e.key);
      const isValidDirection = newDirection !== "";
      if (isValidDirection) setDirection(newDirection);
    });
  }, []);

  const handleFoodConsumption = () => {
    const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;
    let nextFoodCell;
    while (true) {
      nextFoodCell = randomIntFromInterval(1, maxPossibleCellValue);
      if (snakeCells.has(nextFoodCell) || foodCell == nextFoodCell) continue;
      break;
    }
    setFoodcell(nextFoodCell);
  };
  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cellValue, cellIdx) => (
            <div
              key={cellIdx}
              className={`cell ${
                snakeCells.has(cellValue) ? "snake-cell" : ""
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

const createBoard = (BOARD_SIZE) => {
  let count = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(count++);
    }
    board.push(currentRow);
  }
  return board;
};
const getDirectionFromKey = (key) => {
  if (key == "ArrowUp") return Direction.UP;
  if (key == "ArrowRight") return Direction.RIGHT;
  if (key == "ArrowDown") return Direction.DOWN;
  if (key == "ArrowLeft") return Direction.LEFT;
  return "";
};

export default Board;
