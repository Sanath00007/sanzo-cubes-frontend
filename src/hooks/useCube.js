import { useEffect, useState } from "react";
import api from "../services/api";

export default function useCube() {

    const [cube, setCube] = useState(null);

    const loadCube = async () => {
        const response = await api.get("/state");
        setCube(response.data);
    };

    useEffect(() => {
        const initialize = async () => {
            const response = await api.get("/state");
            setCube(response.data);
        };

        void initialize();
    }, []);

    return {
        cube,
        loadCube
    };
}