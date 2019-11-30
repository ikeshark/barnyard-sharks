import React from 'react';

import SetList from './SetList';

const MediaItem = ({ item }) => {
  if (item.type === 'photo') {
    return <img className="block mx-auto mb-1" src={item.src} alt="" />
  }
}

const addBtnStyles = `
  absolute top-0 right-0 mr-2
  h-12 w-12 p-1
  text-sm leading-none
  bg-tan shadow-slategray
  border border-black rounded-full
`;

const What = ({
  onChangeTab,
  tab,
  songs,
  authUser,
  setList,
  onMoveUp,
  onMoveDown,
  onDeleteSong,
  onAddSong,
  media,
  onDeleteMedia,
  onAddMedia
}) => (
  <div className="relative overflow-hidden" style={{ placeSelf: 'stretch', gridArea: 'what' }}>
    <h3 className="font-futura font-bold text-center text-2xl my-1">
      <button
        value="media"
        onClick={onChangeTab}
        className={tab === 'media' ? 'underline font-bold mr-5' : 'mr-5'}
      >
        MEDIA
      </button>
      <button
        value="setList"
        onClick={onChangeTab}
        className={tab === 'setList' ? 'underline font-bold' : ''}
      >
        SETLIST
      </button>
    </h3>
    {tab === 'setList' ? (
      <>
        <SetList
          songs={songs}
          authUser={authUser}
          setList={setList}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={onDeleteSong}
        />
        {authUser &&
          <button
            onClick={onAddSong}
            type="button"
            disabled={!authUser}
            className={addBtnStyles}
          >
            Add Song
          </button>
        }
      </>
    ) : (
      <div className="h-full overflow-y-scroll flex flex-col">
        {media.map(item => (
          <div
            className="relative mx-auto"
            style={{maxWidth: '500px'}}
            key={item[1].src}
          >
            <MediaItem item={item[1]} />
            <button
              value={item[0]}
              onClick={onDeleteMedia}
              className="absolute right-0 top-0 ml-2 text-xl px-2 border-2 border-white text-white"
            >
              &times;
            </button>
          </div>
        ))}
        {authUser &&
          <button
            onClick={onAddMedia}
            type="button"
            disabled={!authUser}
            className={addBtnStyles}
          >
            Add Media
          </button>
        }
      </div>
    )}
  </div>
)

export default What;
