const MOVE_CONFIG = {
    R: { axis: "x", layer: 1, direction: -1, turns: 1 },
    R_PRIME: { axis: "x", layer: 1, direction: 1, turns: 1 },
    R2: { axis: "x", layer: 1, direction: -1, turns: 2 },

    L: { axis: "x", layer: -1, direction: 1, turns: 1 },
    L_PRIME: { axis: "x", layer: -1, direction: -1, turns: 1 },
    L2: { axis: "x", layer: -1, direction: 1, turns: 2 },

    U: { axis: "y", layer: 1, direction: -1, turns: 1 },
    U_PRIME: { axis: "y", layer: 1, direction: 1, turns: 1 },
    U2: { axis: "y", layer: 1, direction: -1, turns: 2 },

    D: { axis: "y", layer: -1, direction: 1, turns: 1 },
    D_PRIME: { axis: "y", layer: -1, direction: -1, turns: 1 },
    D2: { axis: "y", layer: -1, direction: 1, turns: 2 },

    F: { axis: "z", layer: 1, direction: -1, turns: 1 },
    F_PRIME: { axis: "z", layer: 1, direction: 1, turns: 1 },
    F2: { axis: "z", layer: 1, direction: -1, turns: 2 },

    B: { axis: "z", layer: -1, direction: 1, turns: 1 },
    B_PRIME: { axis: "z", layer: -1, direction: -1, turns: 1 },
    B2: { axis: "z", layer: -1, direction: 1, turns: 2 }
};

export default function getMoveAnimationConfig(move) {
    return MOVE_CONFIG[move] || null;
}