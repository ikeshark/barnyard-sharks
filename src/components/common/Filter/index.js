import React, { useState } from 'react';

import StatusBtns from './StatusBtns';
import VocalBtns from './VocalBtns';
import SharkBtns from './SharkBtns';

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

  const className = (name, filter) => {
    const classes = 'border-black border-2 px-1 mx-1 py-2 font-futura uppercase';
    if (filterView === name) {
      return classes + ' bg-deeppink text-white shadow-sm';
    } else if (filter) {
      return classes + ' bg-pink';
    } else return classes;
  }

  const filterWrapperClass = `
    max-420 fixed bottom-0 w-11/12 ml-1/2 translate-1/2 flex p-4
    bg-white shadow-xl z-10 transition-md
    md:overflow-y-scroll md:static md:m-0 md:transform-none md:h-full md:w-1/2
    md:flex-col md:justify-around md:z-inherit
  `;

  return (
    <div className={isOpen ? filterWrapperClass : filterWrapperClass + " hideFilter"}>
      <div className="w-2/3 pr-4 md:w-full md:pr-0">
        <h3
          id="h-filter"
          className="text-center underline font-bold font-futura text-xl md:hidden"
        >
          FILTER
        </h3>
        <nav id="nav-filter" className="py-2 md:hidden flex justify-center">
          <button
            type="button"
            id="status"
            onClick={flipState}
            className={className('status', statusFilter)}
            value="status"
          >
            STATUS
          </button>
          <button
            type="button"
            id="vocals"
            onClick={flipState}
            className={className('vocals', vocalsFilter)}
            value="vocals"
          >
            VOX
          </button>
          <button
            type="button"
            id="covers"
            onClick={flipState}
            className={className('sharks', sharksFilter)}
            value="sharks"
          >
            SHARKS
          </button>
        </nav>

        <StatusBtns
          filterView={filterView}
          statusFilter={statusFilter}
          filterByStatus={filterByStatus}
        />
        <VocalBtns
          filterView={filterView}
          vocalsFilter={vocalsFilter}
          filterByVocals={filterByVocals}
          sharks={sharks}
        />
        <SharkBtns
          sharks={sharks}
          filterView={filterView}
          sharksFilter={sharksFilter}
          handleSharksFilter={handleSharksFilter}
        />

      </div>
      <div className="flex flex-col justify-between w-1/3 pl-3 border-l-2 border-gray-700 min-h-0 md:w-full md:border-none md:pl-0 md:flex-row">
        <div className="md:w-1/2 md:pr-1 md:flex md:flex-wrap">
          <h3
            id="h-sort"
            className="text-center underline font-bold font-futura text-xl w-full"
          >
            SORT
          </h3>
          <button
            type="button"
            value="newest"
            onClick={onSort}
            className={sortType === "newest" ? "bg-deeppink text-white shadow-sm border-black border rounded-lg p-3 block mx-auto my-1 w-full flex-grow btn-toggle rounded-10 relative md:w-auto md:mx-1 " : "border-black border rounded-lg p-3 block mx-auto my-1 w-full flex-grow btn-toggle rounded-10 relative md:w-auto md:mx-1"}
          >
            New
          </button>
          <button
            type="button"
            value="oldest"
            onClick={onSort}
            className={sortType === "oldest" ? "bg-deeppink text-white shadow-sm border-black border rounded-lg p-3 block mx-auto my-1 w-full flex-grow btn-toggle rounded-10 relative md:w-auto md:mx-1" : "border-black border rounded-lg p-3 block mx-auto my-1 w-full flex-grow btn-toggle rounded-10 relative md:w-auto md:mx-1"}
          >
            Old
          </button>
        </div>
        <div className="md:w-1/2 md:pl-1">
          <h3
            id="h-hide"
            className="text-center underline font-bold font-futura text-xl"
          >
            HIDE
          </h3>
          <button
            id="covers"
            onClick={handleCoverFilter}
            className={isCover ? "border-black border rounded-lg p-3 my-1 mx-auto block w-full btn-toggle rounded-10 relative" : "border-black border rounded-lg p-3 my-1 mx-auto block w-full btn-toggle rounded-10 relative bg-deeppink text-white shadow-sm"}
            type="button"
          >
            Covers
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleFilter}
        className={isOpen ? 'absolute ml-half -mt-4 top-0 left-0 text-xl px-2 pt-1 border border-black rounded-lg leading-none bg-white md:hidden' : 'absolute ml-half -mt-4 top-0 left-0 text-xl px-2 pt-1 border border-black rounded-lg leading-none bg-white md:hidden flipRotate'}
      >
        ^
      </button>
    </div>
  );
}
export default Filter;
