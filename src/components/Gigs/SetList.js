import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { AllSongs, Modal } from '../common';
import { getNameById, reorder } from '../../utils';

const styles = {
  base: 'border border-gray-700 px-2 mb-1 ml-1 text-left',
  grow: ' flex-grow',
  hide: ' hidden sm:block',
  modalInner: `
    h-full
    bg-white shadow-inset
    p-4 text-lg
    flex flex-col
  `,
}

const SetList = ({ songs, setList, storeSetList, authUser }) => {
  const [isEdit, toggleEdit] = useState(false);

  const handleExit = () => {
    toggleEdit(false);
  }
  const onPushToSetList = e => {
    const newSetList = [...setList, e.target.value];
    toggleEdit(false);
    storeSetList(newSetList);
  }
  const onDeleteSong = e => {
    const position = parseInt(e.target.value);
    setList.splice(position, 1);
    storeSetList(setList);
  }

  const addBtnStyles = `
    absolute top-0 right-0 mr-2
    h-12 w-12 p-1
    text-sm leading-none
    bg-tan shadow-slategray
    border border-black rounded-full
  `;

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newSetList = reorder(
      setList,
      result.source.index,
      result.destination.index
    );

    storeSetList(newSetList);
  }


  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
                        {i + 1}) {getNameById(song, songs)}
                      </span>
                      <button
                        type="button"
                        value={i}
                        onClick={onDeleteSong}
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
      </DragDropContext>

      <button
        onClick={() => toggleEdit(true)}
        type="button"
        className={addBtnStyles}
      >
        Add Song
      </button>

      {isEdit &&
        <Modal
          innerStyles="flex bg-tan shadow-inset w-full h-full"
          exit={handleExit}
        >
          <AllSongs
            onClick={onPushToSetList}
            setList={setList}
          />
        </Modal>
      }
    </>
  );
}

const mapStateToProps = state => {
  const { songs } = state.songs;
  const { sharks } = state.sharks;
  return { sharks, songs };
}

export default connect(mapStateToProps)(SetList);
