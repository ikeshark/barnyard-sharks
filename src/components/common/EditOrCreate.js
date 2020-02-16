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
  const onClick = isEdit ? handleEdit : handleCreate;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={isEdit ? !editValidation : !createValidation}
      style={{ gridArea: 'submit' }}
    >
      {isEdit ? 'save edits' : 'create'}
    </button>
  )
}

export default EditOrCreate;
