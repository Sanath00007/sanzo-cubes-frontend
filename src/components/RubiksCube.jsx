import Cubie from "./Cubie";

import getCubieColors from "../utils/getCubieColors";

function stickerColor(letter) {

    switch(letter){

        case 'W': return "white";
        case 'Y': return "yellow";
        case 'R': return "red";
        case 'O': return "orange";
        case 'G': return "green";
        case 'B': return "blue";

        default:
            return "#111";
    }

}

export default function RubiksCube({ cube }) {
if(!cube) return null;
  const cubies = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {

        const colors = getCubieColors(x, y, z, cube);

        cubies.push(
          <Cubie
            key={`${x}${y}${z}`}
            position={[x, y, z]}
            colors={colors}
          />
        );

      }
    }
  }

  return cubies;
}