import { useSyncExternalStore } from "react";

let snapshot = {
    move: null,
    progress: 0,
    active: false,
    id: 0
};

const listeners = new Set();

function emit() {
    listeners.forEach(listener => listener());
}

function setSnapshot(nextSnapshot) {
    snapshot = nextSnapshot;
    emit();
}

export function clearMoveAnimation() {
    setSnapshot({
        move: null,
        progress: 0,
        active: false,
        id: snapshot.id
    });
}

export function getMoveAnimationSnapshot() {
    return snapshot;
}

export function subscribeMoveAnimation(listener) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

export function playMoveAnimation(move, durationMs = 260) {
    if (!move) {
        return Promise.resolve();
    }

    const nextId = snapshot.id + 1;
    const startedAt = performance.now();

    return new Promise(resolve => {
        setSnapshot({
            move,
            progress: 0,
            active: true,
            id: nextId
        });

        const frame = (now) => {
            const progress = Math.min((now - startedAt) / durationMs, 1);

            setSnapshot({
                move,
                progress,
                active: true,
                id: nextId
            });

            if (progress < 1) {
                requestAnimationFrame(frame);
                return;
            }

            resolve();
        };

        requestAnimationFrame(frame);
    });
}

export function useMoveAnimationSnapshot() {
    return useSyncExternalStore(
        subscribeMoveAnimation,
        getMoveAnimationSnapshot,
        getMoveAnimationSnapshot
    );
}