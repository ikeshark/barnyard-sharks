import React, { useState } from 'react';

import SharkSelect from '../common/SharkSelect';

const Filter = ({
  isOpen,
  filterByStatus,
  filterByVocals,
  onToggleFilter,
  statusFilter,
  vocalistFilter,
  sharksFilter,
  handleSharksFilter,
  handleCoverFilter,
  isCover,
  sortType,
  onSort,
  sharks,
}) => {
  const [filterView, setFilterView] = useState('status');

  const flipState = e => {
    setFilterView(e.target.value)
  }

  const getName = uid => {
    if (sharks.active) {
      return sharks.active[uid].name;
    }
  }

  return (
    <div className={isOpen ? "filterWrapper" : "filterWrapper hideFilter"}>
      <div className="filterSelectorWrapper">
        <h3>FILTER</h3>
        <button
          id="status"
          onClick={flipState}
          className={filterView === 'status' ? "active" : ""}
          value="status"
        >
          Status
        </button>
        <button
          id="vocals"
          onClick={flipState}
          className={filterView === 'vocals' ? "active" : ""}
          value="vocals"
        >
          Vocals
        </button>
        <button
          id="covers"
          onClick={flipState}
          className={filterView === 'sharks' ? "active" : ""}
          value="sharks"
        >
          Sharks
        </button>
      </div>

      <div id="statusWrapper" className={filterView === 'status' ? "" : "hide"}>
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

      <div id="sharksWrapper" className={filterView === 'sharks' ? "sharkSort" : "hide"}>
        <h3>Who is <i>not</i> here?</h3>
        <SharkSelect
          sharks={sharks}
          handleChange={handleSharksFilter}
          checkedCondition={sharksFilter}
        />
      </div>

      <div id="vocalsWrapper" className={filterView === 'vocals' ? "" : "hide"}>
        <button
          onClick={filterByVocals}
          value="05x2qzOXABfcDkMGTClzDZxzBBt2"
          className={vocalistFilter === "05x2qzOXABfcDkMGTClzDZxzBBt2" ? "active" : ""}
        >
          {getName('05x2qzOXABfcDkMGTClzDZxzBBt2')}
        </button>
        <button
          onClick={filterByVocals}
          value="r6hSiQpBaNfqiPgKatywDJCDRL13"
          className={vocalistFilter === "r6hSiQpBaNfqiPgKatywDJCDRL13" ? "active" : ""}
        >
          {getName('r6hSiQpBaNfqiPgKatywDJCDRL13')}
        </button>
        <button
          onClick={filterByVocals}
          value="fUek7qwanvg3Sp8BJlp0NLswllO2"
          className={vocalistFilter === "fUek7qwanvg3Sp8BJlp0NLswllO2" ? "active" : ""}
        >
          {getName('fUek7qwanvg3Sp8BJlp0NLswllO2')}
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
        <h3>HIDE</h3>
        <button id="covers" onClick={handleCoverFilter} className={isCover ? "" : "active"}>
          Covers
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
