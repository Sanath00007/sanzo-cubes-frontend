export default function Controls({
    onMove,
    onReset,
    onScramble,
    onSolve,
    disabled
}) {

    const moves = [
        "R","R_PRIME","R2",
        "L","L_PRIME","L2",
        "U","U_PRIME","U2",
        "D","D_PRIME","D2",
        "F","F_PRIME","F2",
        "B","B_PRIME","B2"
    ];

    return (
        <div style={{padding:20}}>

            {moves.map(m=>(
                <button
                    key={m}
                    onClick={() => onMove(m)}
                    style={{margin:5}}
                    disabled={disabled}
                >
                    {m}
                </button>
            ))}

            <hr/>

            <button onClick={onReset} disabled={disabled}>Reset</button>

            <button onClick={onScramble} disabled={disabled}>Scramble</button>

            <button onClick={onSolve} disabled={disabled}>Solve</button>

        </div>
    );
}