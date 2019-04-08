import React from 'react';

const Filter = ({
  isOpen,
  filterByStatus,
  filterByVocals,
  onToggleFilter,
  statusFilter,
  vocalistFilter,
  sortType,
  onSort,
  }) => (
    <div className={isOpen ? 'filterWrapper' : 'filterWrapper hide'}>
      <div>
        <h3>Filter By Status</h3>
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

      <div>
        <h3>Filter By Vocals</h3>
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
        <h3>Sort By Date</h3>
        <button
          value="newest"
          onClick={onSort}
          className={sortType === "newest" ? "active" : ""}
        >
          Newest
        </button>
        <button
          value="oldest"
          onClick={onSort}
          className={sortType === "oldest" ? "active" : ""}
        >
          Oldest
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

export default Filter;
