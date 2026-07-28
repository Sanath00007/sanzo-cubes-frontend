import { useMemo } from "react";
import getCubieColors from "../utils/getCubieColors";
import getMoveAnimationConfig from "../utils/getMoveAnimationConfig";

function rotatePoint([x, y, z], axis, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    if (axis === "x") {
        return [
            x,
            y * cos - z * sin,
            y * sin + z * cos
        ];
    }

    if (axis === "y") {
        return [
            x * cos + z * sin,
            y,
            -x * sin + z * cos
        ];
    }

    return [
        x * cos - y * sin,
        x * sin + y * cos,
        z
    ];
}

function rotateVector(axis, angle) {
    if (axis === "x") {
        return [angle, 0, 0];
    }

    if (axis === "y") {
        return [0, angle, 0];
    }

    return [0, 0, angle];
}

export default function useVisualCube(cube, animation) {
    return useMemo(() => {
        if (!cube) {
            return [];
        }

        const animationConfig = animation ? getMoveAnimationConfig(animation.move) : null;
        const angle = animationConfig
            ? animation.progress * animationConfig.direction * animationConfig.turns * (Math.PI / 2)
            : 0;

        const newCubies = [];

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    const onAnimatedLayer = animationConfig && (
                        (animationConfig.axis === "x" && x === animationConfig.layer) ||
                        (animationConfig.axis === "y" && y === animationConfig.layer) ||
                        (animationConfig.axis === "z" && z === animationConfig.layer)
                    );

                    const basePosition = [x, y, z];
                    const position = onAnimatedLayer
                        ? rotatePoint(basePosition, animationConfig.axis, angle)
                        : basePosition;

                    newCubies.push({
                        id: `${x}_${y}_${z}`,
                        position,
                        rotation: onAnimatedLayer ? rotateVector(animationConfig.axis, angle) : [0, 0, 0],
                        colors: getCubieColors(x, y, z, cube)
                    });
                }
            }
        }

        return newCubies;
    }, [cube, animation]);

}