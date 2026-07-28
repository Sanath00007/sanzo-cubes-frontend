export default function Controls({
    onMove,
    onReset,
    onScramble,
    disabled
}) {

    const moveLabels = {
        R: "R",
        R_PRIME: "R'",
        R2: "R2",
        L: "L",
        L_PRIME: "L'",
        L2: "L2",
        U: "U",
        U_PRIME: "U'",
        U2: "U2",
        D: "D",
        D_PRIME: "D'",
        D2: "D2",
        F: "F",
        F_PRIME: "F'",
        F2: "F2",
        B: "B",
        B_PRIME: "B'",
        B2: "B2"
    };

    const moves = [
        "R","R_PRIME","R2",
        "L","L_PRIME","L2",
        "U","U_PRIME","U2",
        "D","D_PRIME","D2",
        "F","F_PRIME","F2",
        "B","B_PRIME","B2"
    ];

    return (
        <div className="controls-grid">
            <div className="move-grid">
                {moves.map(m => (
                    <button
                        key={m}
                        onClick={() => onMove(m)}
                        className="control-button move-button"
                        disabled={disabled}
                    >
                        {moveLabels[m]}
                    </button>
                ))}
            </div>

            <div className="control-actions">
                <button onClick={onReset} className="control-button action-button" disabled={disabled}>
                    Reset
                </button>

                <button onClick={onScramble} className="control-button action-button accent-button" disabled={disabled}>
                    Scramble
                </button>
            </div>
        </div>
    );
}