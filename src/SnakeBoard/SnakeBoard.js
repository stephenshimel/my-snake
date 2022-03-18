import React, { useEffect, useRef, useState } from "react";
import { GameBorad } from "./SnakeBoard.style";

const SnakeBoard = () => {
	const [speed, setSpeed] = useState(1);
	const [tileCount, setTileCount] = useState(20);
	const [tileSize, setTileSize] = useState(20);

	//init going up
	const [xVelocity, setXVelocity] = useState(0);
	const [yVelocity, setYVelocity] = useState(-1);
	const [snake, setSnake] = useState([
		[10, 10],
		[10, 11],
		[11, 11],
		[12, 11],
	]);

	const canvasRef = useRef();
	const ctxRef = useRef();

	const drawGame = () => {
		setInterval(() => {
			clearScreen();
			updateSnake();
		}, 1000 / speed);
	};

	// each time snake array updates, re-draw it on canvas
	useEffect(() => {
		drawSnake();
		console.log("re-draw", snake);
	}, [snake]);

	const clearScreen = () => {
		ctxRef.current.fillStyle = "black";
		ctxRef.current.fillRect(0, 0, 400, 400);
	};

	const updateSnake = () => {
		const copy = [...snake];

		copy.unshift([copy[0][0] + xVelocity, copy[0][1] + yVelocity]);
		copy.pop();
		setSnake((snake) => {
			const copy = [...snake];
			copy.unshift([copy[0][0] + xVelocity, copy[0][1] + yVelocity]);
			copy.pop();
			return copy;
		}); //? why diff from removing pre =>
	};

	const drawSnake = () => {
		for (let [x, y] of snake) {
			drawDot(x, y);
		}
	};

	const drawDot = (x, y) => {
		if (ctxRef.current) {
			ctxRef.current.fillStyle = "orange";
			ctxRef.current.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
		}
	};

	const keyDown = (event) => {
		// left
		if (event.keyCode === 37) {
			setXVelocity(-1);
			setYVelocity(0);
		}
		// top
		else if (event.keyCode === 38) {
			setXVelocity(0);
			setYVelocity(-1);
		}
		// right
		else if (event.keyCode === 39) {
			setXVelocity(1);
			setYVelocity(0);
		}
		// down
		else if (event.keyCode === 40) {
			setXVelocity(0);
			setYVelocity(1);
		}
		// useState is asynchronizes so can't use is right after changing its value. solution is to put it in an useEffect
	};

	// ! put addEventListener into componentDidMount so that it won't be binded repetively
	useEffect(() => {
		ctxRef.current = canvasRef.current.getContext("2d");
		drawGame();
		document.addEventListener("keydown", (event) => keyDown(event));
	}, []);

	return (
		<GameBorad>
			<canvas id="game" width="400" height="400" ref={canvasRef} />
		</GameBorad>
	);
};

export default SnakeBoard;
