import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

// interface StrictModeDroppableProps extends Omit<DroppableProps, 'children'> {
//     children: (provided: DroppableProvided) => ReactNode;
// }

const StrictModeDroppable = ({ children, ...props }) => {

    // console.log({children, props});
    
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) return null;
    return <Droppable droppableId={props.droppableId} {...props}>{children}</Droppable>;
};

export default StrictModeDroppable;
