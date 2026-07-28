const NOTATION_TO_MOVE = {
    R: "R",
    "R'": "R_PRIME",
    R2: "R2",

    L: "L",
    "L'": "L_PRIME",
    L2: "L2",

    U: "U",
    "U'": "U_PRIME",
    U2: "U2",

    D: "D",
    "D'": "D_PRIME",
    D2: "D2",

    F: "F",
    "F'": "F_PRIME",
    F2: "F2",

    B: "B",
    "B'": "B_PRIME",
    B2: "B2"
};

export default function parseMoveSequence(sequence) {
    if (!sequence) {
        return [];
    }

    return sequence
        .trim()
        .split(/\s+/)
        .map(token => NOTATION_TO_MOVE[token])
        .filter(Boolean);
}