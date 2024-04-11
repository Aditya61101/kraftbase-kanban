import { useEffect, useState } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';


const StrictModeDroppable = ({ children, droppableId }: DroppableProps) => {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) return null;
    return <Droppable droppableId={droppableId}>{children}</Droppable>;
};

export default StrictModeDroppable;

// import { useEffect, useState } from "react";
// import { Droppable } from "react-beautiful-dnd";

// const StrictModeDroppable = ({ children, ...props }) => {
//     const [enabled, setEnabled] = useState(false);
//     useEffect(() => {
//         const animation = requestAnimationFrame(() => setEnabled(true));

//         return () => {
//             cancelAnimationFrame(animation);
//             setEnabled(false);
//         };
//     }, []);

//     if (!enabled) return null;
//     return <Droppable droppableId={props.droppableId} {...props}>{children}</Droppable>;
// };

// export default StrictModeDroppable;