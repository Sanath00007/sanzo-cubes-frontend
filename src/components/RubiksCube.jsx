import Cubie from "./Cubie";
import useVisualCube from "../hooks/useVisualCube";
import { useMoveAnimationSnapshot } from "../hooks/useMovePlayback";

export default function RubiksCube({ cube, stickerCube }) {

    const animation = useMoveAnimationSnapshot();

    const cubies = useVisualCube(
        cube,
        animation.active ? animation : null,
        stickerCube ?? cube
    );

    return (

        <>

            {cubies.map(cubie => (

                <Cubie

                    key={cubie.id}

                    id={cubie.id}

                    position={cubie.position}

                    rotation={cubie.rotation}

                    colors={cubie.colors}

                />

            ))}

        </>

    );

}