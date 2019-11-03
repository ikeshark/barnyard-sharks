import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const styles = {
  base: 'border border-gray-700 px-2 mb-1 ml-1 text-left',
  grow: ' flex-grow',
  hide: ' hidden sm:block'
}

const SetList = ({ authUser, setList, onDelete }) => {
  if (typeof setList.map !== "function") {
    setList = [];
  }

  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <ol
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="h-full overflow-y-scroll lastItem-mb-sm"
        >
          {setList.map((song, i) => (
            <Draggable key={song} draggableId={song} index={i}>
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="flex"
                >
                  <span className={styles.base + styles.grow}>
                    {i + 1}) {song}
                  </span>
                  <button
                    type="button"
                    disabled={!authUser}
                    value={i}
                    onClick={onDelete}
                    className={styles.base}
                  >
                    x
                  </button>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ol>
      )}
    </Droppable>
  );
}

export default SetList;
