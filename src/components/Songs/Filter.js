import React, { useState } from 'react';

const Filter = ({
  isOpen,
  filterByStatus,
  filterByVocals,
  onToggleFilter,
  statusFilter,
  vocalistFilter,
  sortType,
  onSort,
}) => {
  const [isStatus, setIsStatus] = useState(true);

  const flipState = () => {
    setIsStatus(!isStatus)
  }
  return (
    <div className={isOpen ? "filterWrapper" : "filterWrapper hideFilter"}>
      <div className="filterSelectorWrapper">
        <h3>FILTER</h3>
        <button id="status" onClick={flipState} className={isStatus ? "active" : ""}>
          Status
        </button>
        <button id="vocals" onClick={flipState} className={isStatus ? "" : "active"}>
          Vocals
        </button>
      </div>

      <div id="statusWrapper" className={isStatus ? "" : "hide"}>
        <button
          onClick={filterByStatus}
          className={statusFilter === "solid" ? "active" : ""}
          value="solid"
        >
          Solid
        </button>
        <button
          onClick={filterByStatus}
          className={statusFilter === "shakey" ? "active" : ""}
          value="shakey"
        >
          Shakey
        </button>
        <button
          onClick={filterByStatus}
          className={statusFilter === "inactive" ? "active" : ""}
          value="inactive"
        >
          Inactive
        </button>
        <button
          onClick={filterByStatus}
          className={statusFilter === "retired" ? "active" : ""}
          value="retired"
        >
          Retired
        </button>
      </div>
      <div id="vocalsWrapper" className={isStatus ? "hide" : ""}>
        <button
          onClick={filterByVocals}
          value="Preacher"
          className={vocalistFilter === "Preacher" ? "active" : ""}
        >
          Preacher
        </button>
        <button
          onClick={filterByVocals}
          value="Drummer"
          className={vocalistFilter === "Drummer" ? "active" : ""}
        >
          Drummer
        </button>
        <button
          onClick={filterByVocals}
          value="Shank"
          className={vocalistFilter === "Shank" ? "active" : ""}
        >
          Shank
        </button>
        <button
          onClick={filterByVocals}
          value="gang"
          className={vocalistFilter === "gang" ? "active" : ""}
        >
          Gang
        </button>
        <button
          onClick={filterByVocals}
          value="instrumental"
          className={vocalistFilter === "instrumental" ? "active" : ""}
        >
          Instrumental
        </button>
      </div>

      <div className="filterSort">
        <h3>Sort</h3>
        <button
          value="newest"
          onClick={onSort}
          className={sortType === "newest" ? "active" : ""}
        >
          New
        </button>
        <button
          value="oldest"
          onClick={onSort}
          className={sortType === "oldest" ? "active" : ""}
        >
          Old
        </button>
      </div>

      <button
        onClick={onToggleFilter}
        className={isOpen ? 'filterHide' : 'filterHide flipRotate'}
      >
        ^
      </button>
    </div>
  );
}
export default Filter;
