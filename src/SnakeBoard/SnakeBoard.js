import React, { useEffect, useRef, useState } from "react";
import { GameBorad } from "./SnakeBoard.style";

const SnakeBoard = () => {
	const [speed, setSpeed] = useState(7);
	const [tileCount, setTileCount] = useState(20);
	const [tileSize, setTileSize] = useState(20);
	const [headX, setHeadX] = useState(10);
	const [headY, setHeadY] = useState(10);
	const [direction, setDirection] = useState("up");

	const canvasRef = useRef();
	const ctxRef = useRef();
	const a = useRef();

	const drawGame = () => {
		clearScreen();
		drawSnake();
		setTimeout(drawGame, 1000 / speed);
	};

	const clearScreen = () => {
		ctxRef.current.fillStyle = "black";
		ctxRef.current.fillRect(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height
		);
	};

	const drawSnake = () => {
		ctxRef.current.fillStyle = "orange";
		ctxRef.current.fillRect(
			headX * tileSize,
			headY * tileSize,
			tileSize,
			tileSize
		);
	};

	const keyDown = (event) => {
		if (event.keyCode === 37) {
			a.current = "left";
		}
		if (event.keyCode === 38) {
			a.current = "up";
		}
		if (event.keyCode === 39) {
			a.current = "right";
		}
		if (event.keyCode === 40) {
			a.current = "down";
		}
		console.log(a.current);
	};

	useEffect(() => {
		ctxRef.current = canvasRef.current.getContext("2d");
		drawGame();
	});

	// bug: event triggered twice instead of one
	document.addEventListener("keydown", (event) => keyDown(event));

	return (
		<GameBorad>
			<canvas id="game" width="400" height="400" ref={canvasRef} />
		</GameBorad>
	);
};

export default SnakeBoard;
