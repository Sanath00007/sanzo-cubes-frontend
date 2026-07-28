import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import RubiksCube from "./components/RubiksCube";
import Controls from "./components/Controls";

import useCube from "./hooks/useCube";
import api from "./services/api";
import "./App.css";
import parseMoveSequence from "./utils/parseMoveSequence";
import applyMoveToCube from "./utils/applyMoveToCube";
import { clearMoveAnimation, playMoveAnimation } from "./hooks/useMovePlayback";
import formatMoveLabel from "./utils/formatMoveLabel";

export default function App() {

    const { cube, updateCube } = useCube();

    const [displayCube, setDisplayCube] = useState(null);
    const [animationCube, setAnimationCube] = useState(null);
    const [scrambleText, setScrambleText] = useState("");
    const [scrambleMoves, setScrambleMoves] = useState([]);
    const [solutionText, setSolutionText] = useState("");
    const [solutionMoves, setSolutionMoves] = useState([]);
    const [currentMove, setCurrentMove] = useState("-");
    const [moveHistory, setMoveHistory] = useState([]);
    const [lastStatus, setLastStatus] = useState("Idle");
    const [busy, setBusy] = useState(false);

    const activeCube = displayCube ?? cube;
    const activeStickerCube = animationCube ?? activeCube;

    async function playMoves(moves, startingCube = activeCube) {
        setBusy(true);

        let workingCube = startingCube;

        try {
            for (const move of moves) {
                setCurrentMove(move);
                setMoveHistory(prev => [move, ...prev].slice(0, 12));
                const nextCube = applyMoveToCube(workingCube, move);
                setAnimationCube(workingCube);
                await playMoveAnimation(move, 360);
                workingCube = nextCube;
                setDisplayCube(workingCube);
                clearMoveAnimation();
                setAnimationCube(null);
            }

            setCurrentMove("-");
        } finally {
            setBusy(false);
        }
    }

    async function move(moveName) {
        setBusy(true);
        setCurrentMove(moveName);

        try {
            const response = await api.post("/move", {
                move: moveName
            });

            setAnimationCube(activeCube);
            await playMoveAnimation(moveName, 360);
            setDisplayCube(response.data);
            setMoveHistory(prev => [moveName, ...prev].slice(0, 12));
            setLastStatus("Move complete");
            updateCube(response.data);
            clearMoveAnimation();
            setAnimationCube(null);
            setCurrentMove("-");
        } finally {
            setBusy(false);
        }
    }

    async function reset() {
        setBusy(true);

        try {
            const response = await api.post("/reset");
            setScrambleMoves([]);
            setDisplayCube(response.data);
            setAnimationCube(null);
            updateCube(response.data);
            setScrambleText("");
            setCurrentMove("-");
            setMoveHistory([]);
            setLastStatus("Reset to solved state");
        } finally {
            setBusy(false);
        }
    }

    async function scramble() {
        setBusy(true);

        try {
            const response = await api.post("/scramble");
            const moves = parseMoveSequence(response.data.scramble);
            const scrambleCube = response.data.cube;

            setScrambleText(response.data.scramble);
            setScrambleMoves(moves);
            await playMoves(moves);
            setDisplayCube(scrambleCube);
            setAnimationCube(null);
            updateCube(scrambleCube);
            setLastStatus("Scrambled");
        } finally {
            setBusy(false);
        }
    }

    async function solve() {
        setBusy(true);

        try {
            const response = await api.post("/solve");
            const moves = parseMoveSequence(response.data.solution);

            setSolutionText(response.data.solution);
            setSolutionMoves(moves);
            setLastStatus(`Solution loaded: ${moves.length} moves`);
        } finally {
            setBusy(false);
        }
    }

    const controlsDisabled = busy;

    return (
        <div className="app-shell">
            <aside className="sidebar left-sidebar">
                <div className="brand-block">
                    <div>
                        <p className="eyebrow">Scramble</p>
                        <h1>{scrambleText || "Ready to scramble"}</h1>
                    </div>
                </div>

                <div className="panel panel-surface input-panel">
                    <div className="panel-header">
                        <span>Scramble sequence</span>
                        <span>Live</span>
                    </div>

                    <div className="sequence-chipline">
                        {scrambleMoves.length ? scrambleMoves.map(move => (
                            <span key={move} className="chip chip-soft">{formatMoveLabel(move)}</span>
                        )) : <span className="sequence-empty">No scramble loaded yet.</span>}
                    </div>

                    <button className="primary-button blue-button" onClick={scramble} disabled={controlsDisabled}>
                        New Scramble
                    </button>
                </div>

                <div className="panel panel-surface input-panel">
                    <div className="panel-header">
                        <span>Solution sequence</span>
                        <span>{solutionMoves.length ? `${solutionMoves.length} moves` : "Idle"}</span>
                    </div>

                    <p className={solutionMoves.length ? "solution-text" : "solution-text solution-empty"}>
                        {solutionText || "Click Solve to load the solution moves."}
                    </p>

                    <div className="sequence-chipline">
                        {solutionMoves.length ? solutionMoves.map(move => (
                            <span key={move} className="chip chip-soft">{formatMoveLabel(move)}</span>
                        )) : <span className="sequence-empty">No solution loaded yet.</span>}
                    </div>

                    <button className="primary-button blue-button" onClick={solve} disabled={controlsDisabled}>
                        Solve
                    </button>
                </div>

                <div className="panel panel-surface">
                    <div className="panel-header">
                        <span>Manual Moves</span>
                        <span>6 faces</span>
                    </div>

                    <Controls
                        onMove={move}
                        onReset={reset}
                        onScramble={scramble}
                        disabled={controlsDisabled}
                    />
                </div>

                <div className="panel panel-surface">
                    <div className="panel-header">
                        <span>Cube Controls</span>
                        <span>{lastStatus}</span>
                    </div>

                    <div className="control-actions compact-actions">
                        <button onClick={reset} className="control-button action-button" disabled={controlsDisabled}>Reset</button>
                    </div>
                </div>
            </aside>

            <main className="scene-shell">
                <div className="scene-frame">
                    <div className="scene-header-row">
                        <div className="scene-title">Cube Simulator</div>
                        <div className="scene-badges">
                            <span className="scene-badge">Drag to rotate</span>
                            <span className="scene-badge">Scroll to zoom</span>
                        </div>
                    </div>

                    <Canvas shadows camera={{ position: [6, 6, 6], fov: 42 }}>
                        <color attach="background" args={["#0b1020"]} />

                        <fog attach="fog" args={["#0b1020", 10, 22]} />

                        <ambientLight intensity={1.35} />

                        <directionalLight
                            position={[6, 8, 6]}
                            intensity={2.4}
                            color="#ffffff"
                        />

                        <directionalLight
                            position={[-6, -3, -4]}
                            intensity={0.8}
                            color="#5aa7ff"
                        />

                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.15, 0]} receiveShadow>
                            <planeGeometry args={[24, 24]} />
                            <shadowMaterial transparent opacity={0.22} />
                        </mesh>

                        <RubiksCube cube={activeCube} stickerCube={activeStickerCube} />

                        <OrbitControls
                            enablePan={false}
                            minDistance={4.5}
                            maxDistance={14}
                            rotateSpeed={0.8}
                        />
                    </Canvas>

                    <div className="scene-footer">
                        <div className="footer-history">
                            <div className="panel-header footer-header">
                                <span>Move History</span>
                                <span>{moveHistory.length} moves</span>
                            </div>
                            <div className="sequence-chipline history-line">
                                {moveHistory.length ? moveHistory.map((move, index) => (
                                    <span key={`${move}-${index}`} className="chip chip-dark">{formatMoveLabel(move)}</span>
                                )) : <span className="sequence-empty">No moves yet.</span>}
                            </div>
                        </div>

                        <div className="footer-scramble">
                            <div className="panel-header footer-header">
                                <span>Current Move</span>
                                <span>{currentMove}</span>
                            </div>
                            <div className="current-move-card">{currentMove}</div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}