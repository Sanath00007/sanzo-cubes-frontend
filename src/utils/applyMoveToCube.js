function cloneFace(face) {
    return face.map(row => [...row]);
}

function cloneCube(cube) {
    return {
        front: cloneFace(cube.front),
        back: cloneFace(cube.back),
        left: cloneFace(cube.left),
        right: cloneFace(cube.right),
        up: cloneFace(cube.up),
        down: cloneFace(cube.down)
    };
}

function reverse(values) {
    return [...values].reverse();
}

function getRow(face, row) {
    return [...face[row]];
}

function setRow(face, row, values) {
    face[row] = [...values];
}

function getColumn(face, column) {
    return face.map(row => row[column]);
}

function setColumn(face, column, values) {
    face.forEach((row, index) => {
        row[column] = values[index];
    });
}

function rotateFaceClockwise(face) {
    const next = cloneFace(face);

    for (let row = 0; row < face.length; row++) {
        for (let column = 0; column < face[row].length; column++) {
            next[column][face.length - row - 1] = face[row][column];
        }
    }

    return next;
}

function moveR(cube) {
    const next = cloneCube(cube);
    next.right = rotateFaceClockwise(next.right);

    const temp = getColumn(next.up, 2);
    setColumn(next.up, 2, getColumn(next.front, 2));
    setColumn(next.front, 2, getColumn(next.down, 2));

    const backCol = reverse(getColumn(next.back, 0));
    setColumn(next.down, 2, backCol);

    setColumn(next.back, 0, reverse(temp));
    return next;
}

function moveL(cube) {
    const next = cloneCube(cube);
    next.left = rotateFaceClockwise(next.left);

    const temp = getColumn(next.up, 0);
    const backCol = reverse(getColumn(next.back, 2));
    setColumn(next.up, 0, backCol);

    const downCol = reverse(getColumn(next.down, 0));
    setColumn(next.back, 2, downCol);

    setColumn(next.down, 0, getColumn(next.front, 0));
    setColumn(next.front, 0, temp);
    return next;
}

function moveU(cube) {
    const next = cloneCube(cube);
    next.up = rotateFaceClockwise(next.up);

    const temp = getRow(next.front, 0);
    setRow(next.front, 0, getRow(next.right, 0));
    setRow(next.right, 0, getRow(next.back, 0));
    setRow(next.back, 0, getRow(next.left, 0));
    setRow(next.left, 0, temp);
    return next;
}

function moveD(cube) {
    const next = cloneCube(cube);
    next.down = rotateFaceClockwise(next.down);

    const temp = getRow(next.front, 2);
    setRow(next.front, 2, getRow(next.left, 2));
    setRow(next.left, 2, getRow(next.back, 2));
    setRow(next.back, 2, getRow(next.right, 2));
    setRow(next.right, 2, temp);
    return next;
}

function moveF(cube) {
    const next = cloneCube(cube);
    next.front = rotateFaceClockwise(next.front);

    const temp = getRow(next.up, 2);
    const leftCol = reverse(getColumn(next.left, 2));
    const downRow = getRow(next.down, 0);
    const rightCol = reverse(getColumn(next.right, 0));

    setRow(next.up, 2, leftCol);
    setColumn(next.left, 2, downRow);
    setRow(next.down, 0, rightCol);
    setColumn(next.right, 0, temp);
    return next;
}

function moveB(cube) {
    const next = cloneCube(cube);
    next.back = rotateFaceClockwise(next.back);

    const temp = getRow(next.up, 0);
    const rightCol = getColumn(next.right, 2);
    const downRow = reverse(getRow(next.down, 2));
    const leftCol = getColumn(next.left, 0);

    setRow(next.up, 0, rightCol);
    setColumn(next.right, 2, downRow);
    setRow(next.down, 2, leftCol);
    setColumn(next.left, 0, reverse(temp));
    return next;
}

const MOVE_APPLIERS = {
    R: moveR,
    R_PRIME: cube => moveR(moveR(moveR(cube))),
    R2: cube => moveR(moveR(cube)),

    L: moveL,
    L_PRIME: cube => moveL(moveL(moveL(cube))),
    L2: cube => moveL(moveL(cube)),

    U: moveU,
    U_PRIME: cube => moveU(moveU(moveU(cube))),
    U2: cube => moveU(moveU(cube)),

    D: moveD,
    D_PRIME: cube => moveD(moveD(moveD(cube))),
    D2: cube => moveD(moveD(cube)),

    F: moveF,
    F_PRIME: cube => moveF(moveF(moveF(cube))),
    F2: cube => moveF(moveF(cube)),

    B: moveB,
    B_PRIME: cube => moveB(moveB(moveB(cube))),
    B2: cube => moveB(moveB(cube))
};

export default function applyMoveToCube(cube, move) {
    const apply = MOVE_APPLIERS[move];

    if (!apply) {
        return cube;
    }

    return apply(cube);
}