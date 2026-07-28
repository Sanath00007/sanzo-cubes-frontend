import Cubie from "./Cubie";
import useVisualCube from "../hooks/useVisualCube";

export default function RubiksCube({ cube, animation }) {

    const cubies = useVisualCube(cube, animation);

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