import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import RubiksCube from "./components/RubiksCube";
import Controls from "./components/Controls";

import useCube from "./hooks/useCube";

export default function App() {

    const { cube, loadCube } = useCube();

    const [solution, setSolution] = useState("");

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

                    <RubiksCube cube={cube} />

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
                    loadCube={loadCube}
                    setSolution={setSolution}
                />

                <hr />

                <h3>Solution</h3>

                <p>{solution}</p>

            </div>

        </div>
    );
}