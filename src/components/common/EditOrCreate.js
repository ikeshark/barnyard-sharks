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
          style={{ gridArea: 'submit' }}
        >
          save edits
        </button>
        :
        <button
          className={`button ${className}`}
          onClick={handleCreate}
          disabled={!createValidation}
          style={{ gridArea: 'submit' }}
        >
          create new {title}
        </button>
      }
    </>
  )
}

export default EditOrCreate;
