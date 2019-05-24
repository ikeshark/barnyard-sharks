import React from 'react';

const EditOrCreate = ({
  isEdit,

  className,
  title,

  handleCreate,
  handleEdit,

  createValidation,
  editValidation,
}) => {

  return (
    <>
      {isEdit ?
        <button
          className={`button ${className}`}
          onClick={handleEdit}
          disabled={!editValidation}
        >
          save edits
        </button>
        :
        <button
          className={`button ${className}`}
          onClick={handleCreate}
          disabled={!createValidation}
        >
          create new {title}
        </button>
      }
    </>
  )
}

export default EditOrCreate;
