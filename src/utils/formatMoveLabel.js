const MOVE_LABELS = {
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

export default function formatMoveLabel(move) {
    return MOVE_LABELS[move] || move;
}