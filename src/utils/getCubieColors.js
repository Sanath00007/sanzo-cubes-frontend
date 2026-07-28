function color(letter) {
    switch (letter) {
        case 'W':
            return "#f5f5f5";
        case 'Y':
            return "#ffd400";
        case 'R':
            return "#e53935";
        case 'O':
            return "#ff7a00";
        case 'G':
            return "#1db954";
        case 'B':
            return "#1976d2";
        default:
            return "#111";
    }
}

export default function getCubieColors(x, y, z, cube) {

    const colors = {
        right: "#111",
        left: "#111",
        top: "#111",
        bottom: "#111",
        front: "#111",
        back: "#111"
    };

    // ---------- TOP ----------
    if (y === 1) {
        const row = z + 1;
        const col = x + 1;

        colors.top = color(cube.up[row][col]);
    }

    // ---------- BOTTOM ----------
    if (y === -1) {
        const row = 1 - z;
        const col = x + 1;

        colors.bottom = color(cube.down[row][col]);
    }

    // ---------- FRONT ----------
    if (z === 1) {
        const row = 1 - y;
        const col = x + 1;

        colors.front = color(cube.front[row][col]);
    }

    // ---------- BACK ----------
    if (z === -1) {
        const row = 1 - y;
        const col = 1 - x;

        colors.back = color(cube.back[row][col]);
    }

    // ---------- RIGHT ----------
    if (x === 1) {
        const row = 1 - y;
        const col = 1 - z;

        colors.right = color(cube.right[row][col]);
    }

    // ---------- LEFT ----------
    if (x === -1) {
        const row = 1 - y;
        const col = z + 1;

        colors.left = color(cube.left[row][col]);
    }

    return colors;
}