import { useCallback, useRef, useState } from "react";
import getMoveAnimationConfig from "../utils/getMoveAnimationConfig";

const ANIMATION_DURATION_MS = 260;
const DOUBLE_MOVE_DURATION_MS = 420;

export default function useMoveAnimation() {
    const [animation, setAnimation] = useState(null);
    const runningRef = useRef(false);

    const animateMove = useCallback((move) => {
        const config = getMoveAnimationConfig(move);

        if (!config || runningRef.current) {
            return Promise.resolve();
        }

        runningRef.current = true;

        const duration = config.turns === 2
            ? DOUBLE_MOVE_DURATION_MS
            : ANIMATION_DURATION_MS;

        return new Promise(resolve => {
            const startedAt = performance.now();

            const frame = (now) => {
                const progress = Math.min((now - startedAt) / duration, 1);

                setAnimation({
                    move,
                    progress
                });

                if (progress < 1) {
                    requestAnimationFrame(frame);
                    return;
                }

                runningRef.current = false;
                resolve();
            };

            requestAnimationFrame(frame);
        });
    }, []);

    const clearAnimation = useCallback(() => {
        setAnimation(null);
    }, []);

    return {
        animation,
        animateMove,
        clearAnimation,
        isAnimating: animation !== null
    };
}