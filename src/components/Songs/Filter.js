import React, { useState } from 'react';

import SharkSelect from '../common/SharkSelect';

const Filter = ({
  isOpen,
  filterByStatus,
  filterByVocals,
  onToggleFilter,
  statusFilter,
  vocalsFilter,
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

  const className = (name, filter) => {
    if (filterView === name) {
      return 'active';
    } else if (filter) {
      return 'semiActive';
    } else return '';
  }

  return (
    <div className={isOpen ? "filterWrapper" : "filterWrapper hideFilter"}>
      <div className="filterSelectorWrapper">
        <h3>FILTER</h3>
        <nav>
          <button
            type="button"
            id="status"
            onClick={flipState}
            className={className('status', statusFilter)}
            value="status"
          >
            Status
          </button>
          <button
            type="button"
            id="vocals"
            onClick={flipState}
            className={className('vocals', vocalsFilter)}
            value="vocals"
          >
            Vox
          </button>
          <button
            type="button"
            id="covers"
            onClick={flipState}
            className={className('sharks', sharksFilter)}
            value="sharks"
          >
            Sharks
          </button>
        </nav>
        <div id="statusWrapper" className={filterView === 'status' ? "" : "hide"}>
          <button
            type="button"
            onClick={filterByStatus}
            className={statusFilter === "solid" ? "active" : ""}
            value="solid"
          >
            Solid
          </button>
          <button
            type="button"
            onClick={filterByStatus}
            className={statusFilter === "shakey" ? "active" : ""}
            value="shakey"
          >
            Shakey
          </button>
          <button
            type="button"
            onClick={filterByStatus}
            className={statusFilter === "inactive" ? "active" : ""}
            value="inactive"
          >
            Inactive
          </button>
          <button
            type="button"
            onClick={filterByStatus}
            className={statusFilter === "retired" ? "active" : ""}
            value="retired"
          >
            Retired
          </button>
          <button
            type="button"
            onClick={filterByStatus}
            className={statusFilter === "idea" ? "active" : ""}
            value="idea"
          >
            Ideas
          </button>
        </div>
        <div id="sharksWrapper" className={filterView === 'sharks' ? "sharkSort" : "hide"}>
          <h4>Who is <i>not</i> here?</h4>
          <SharkSelect
            sharks={sharks}
            handleChange={handleSharksFilter}
            checkedCondition={sharksFilter}
          />
        </div>
        <div id="vocalsWrapper" className={filterView === 'vocals' ? "" : "hide"}>
          <button
            type="button"
            onClick={filterByVocals}
            value="05x2qzOXABfcDkMGTClzDZxzBBt2"
            className={vocalsFilter === "05x2qzOXABfcDkMGTClzDZxzBBt2" ? "active" : ""}
          >
            {getName('05x2qzOXABfcDkMGTClzDZxzBBt2')}
          </button>
          <button
            type="button"
            onClick={filterByVocals}
            value="r6hSiQpBaNfqiPgKatywDJCDRL13"
            className={vocalsFilter === "r6hSiQpBaNfqiPgKatywDJCDRL13" ? "active" : ""}
          >
            {getName('r6hSiQpBaNfqiPgKatywDJCDRL13')}
          </button>
          <button
            type="button"
            onClick={filterByVocals}
            value="fUek7qwanvg3Sp8BJlp0NLswllO2"
            className={vocalsFilter === "fUek7qwanvg3Sp8BJlp0NLswllO2" ? "active" : ""}
          >
            {getName('fUek7qwanvg3Sp8BJlp0NLswllO2')}
          </button>
          <button
            type="button"
            onClick={filterByVocals}
            value="gang"
            className={vocalsFilter === "gang" ? "active" : ""}
          >
            Gang
          </button>
          <button
            type="button"
            onClick={filterByVocals}
            value="instrumental"
            className={vocalsFilter === "instrumental" ? "active" : ""}
          >
            Instrumental
          </button>
        </div>
      </div>
      <div className="filterSort">
        <h3>Sort</h3>
        <button
          type="button"
          value="newest"
          onClick={onSort}
          className={sortType === "newest" ? "active" : ""}
        >
          New
        </button>
        <button
          type="button"
          value="oldest"
          onClick={onSort}
          className={sortType === "oldest" ? "active" : ""}
        >
          Old
        </button>
        <h3>HIDE</h3>
        <button
          id="covers"
          onClick={handleCoverFilter}
          className={isCover ? "" : "active"}
          type="button"
        >
          Covers
        </button>
      </div>

      <button
        type="button"
        onClick={onToggleFilter}
        className={isOpen ? 'filterHide' : 'filterHide flipRotate'}
      >
        ^
      </button>
    </div>
  );
}
export default Filter;
