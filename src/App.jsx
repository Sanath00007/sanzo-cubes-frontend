import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import RubiksCube from "./components/RubiksCube";
import Controls from "./components/Controls";

import useCube from "./hooks/useCube";
import useMoveAnimation from "./hooks/useMoveAnimation";
import api from "./services/api";

export default function App() {

    const { cube, loadCube } = useCube();
    const { animation, animateMove, clearAnimation, isAnimating } = useMoveAnimation();

    const [solution, setSolution] = useState("");

    async function move(moveName) {
        await api.post("/move", {
            move: moveName
        });

        await animateMove(moveName);
        await loadCube();
        clearAnimation();
    }

    async function reset() {
        await api.post("/reset");
        setSolution("");
        await loadCube();
    }

    async function scramble() {
        await api.post("/scramble");
        setSolution("");
        await loadCube();
    }

    async function solve() {
        const response = await api.post("/solve");

        setSolution(response.data.solution);
    }

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex"
            }}
        >

            <div
                style={{
                    flex: 3
                }}
            >
                <Canvas camera={{ position: [6, 6, 6] }}>

                    <ambientLight intensity={2} />

                    <directionalLight
                        position={[5, 5, 5]}
                        intensity={2}
                    />

                    <RubiksCube cube={cube} animation={animation} />

                    <OrbitControls />

                </Canvas>
            </div>

            <div
                style={{
                    flex: 1,
                    padding: 20,
                    background: "#222",
                    color: "white",
                    overflowY: "auto"
                }}
            >

                <h2>Sanzo Cubes</h2>

                <Controls
                    onMove={move}
                    onReset={reset}
                    onScramble={scramble}
                    onSolve={solve}
                    disabled={isAnimating}
                />

                <hr />

                <h3>Solution</h3>

                <p>{solution}</p>

            </div>

        </div>
    );
}