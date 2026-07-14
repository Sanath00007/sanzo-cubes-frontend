import api from "../services/api";

export default function Controls({ loadCube, setSolution }) {

    async function move(moveName) {
        await api.post("/move", {
            move: moveName
        });

        await loadCube();
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
                    onClick={()=>move(m)}
                    style={{margin:5}}
                >
                    {m}
                </button>
            ))}

            <hr/>

            <button onClick={reset}>Reset</button>

            <button onClick={scramble}>Scramble</button>

            <button onClick={solve}>Solve</button>

        </div>
    );
}