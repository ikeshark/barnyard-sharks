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
    <button
      className={className}
      onClick={isEdit ? handleEdit : handleCreate}
      disabled={isEdit ? !editValidation : !createValidation}
      style={{ gridArea: 'submit' }}
    >
      {isEdit ? 'save edits' : 'create'}
    </button>
  )
}

export default EditOrCreate;
