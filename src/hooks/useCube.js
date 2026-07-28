import { useEffect, useState } from "react";
import api from "../services/api";

export default function useCube() {

    const [cube, setCube] = useState(null);
    const [cubeReady, setCubeReady] = useState(false);

    const loadCube = async () => {
        const response = await api.get("/state");
        setCube(response.data);
    };

    useEffect(() => {
        const initialize = async () => {
            const response = await api.get("/state");
            setCube(response.data);
            setCubeReady(true);
        };

        void initialize();
    }, []);

    const updateCube = (nextCube) => {
        setCube(nextCube);
    };

    return {
        cube,
        cubeReady,
        loadCube,
        updateCube
    };
}