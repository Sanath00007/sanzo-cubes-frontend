import { useState } from "react";

export default function useAnimationQueue() {

    const [queue, setQueue] = useState([]);
    const [playing, setPlaying] = useState(false);

    function enqueue(moves) {

        setQueue(prev => [...prev, ...moves]);

    }

    function dequeue() {

        let nextMove = null;

        setQueue(prev => {

            if (prev.length === 0)
                return prev;

            nextMove = prev[0];

            return prev.slice(1);

        });

        return nextMove;

    }

    return {

        queue,

        playing,

        setPlaying,

        enqueue,

        dequeue

    };

}