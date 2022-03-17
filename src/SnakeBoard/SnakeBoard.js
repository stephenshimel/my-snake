import React, { useEffect, useRef } from "react";
import { GameBorad } from "./SnakeBoard.style";

const SnakeBoard = () => {
	const canvas1 = useRef();

	useEffect(() => {
		console.log(canvas1);
	});

	return (
		<GameBorad>
			<canvas id="game" width="400" height="400" ref={canvas1} />
		</GameBorad>
	);
};

export default SnakeBoard;
