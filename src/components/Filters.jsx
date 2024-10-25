import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTimes,
  faFilter,
  faDatabase,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import GroupingCatalog from "./GroupingCatalog";
import ShowHideColumns from "./ShowHideColumns";
import SortCatalog from "./SortCatalog";

const Filters = ({
  setGroupColumn,
  setColumnsVisibility,
  columnsVisibility,
  sortColumns,
  setSortColumns,
}) => {
  const [searchText, setSearchText] = useState("");
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isGroupCatalogOpen, setIsGroupCatalogOpen] = useState(false);
  const [isShowColumnsCatalogOpen, setIsShowColumnsCatalogOpen] =
    useState(false);
  const [isSortCatalogOpen, setIsSortCatalogOpen] = useState(false);

  const handleClear = () => {
    setSearchText("");
  };

  // const toggleCatalog = () => {
  //   setIsCatalogOpen(!isCatalogOpen);
  // };

  const toggleGroupCatalog = () => {
    setIsCatalogOpen(!isCatalogOpen);
    setIsGroupCatalogOpen(!isGroupCatalogOpen);
  };

  const toggleShowColumnsCatalog = () => {
    setIsCatalogOpen(!isCatalogOpen);
    setIsShowColumnsCatalogOpen(!isShowColumnsCatalogOpen);
  };

  const toggleSortCatalog = () => {
    setIsCatalogOpen(!isCatalogOpen);
    setIsSortCatalogOpen(!isSortCatalogOpen);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 justify-end mr-[100px] gap-[5px]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            className="border border-gray-300 rounded-md p-2 pr-8 flex-shrink w-full"
          />
          {searchText && (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={handleClear}
              className="absolute right-3 text-gray-400 cursor-pointer"
            />
          )}
        </div>
        <FontAwesomeIcon
          icon={faEye}
          className="text-blue-500 cursor-pointer"
          onClick={toggleShowColumnsCatalog}
        />
        <FontAwesomeIcon
          icon={faSort}
          className="text-blue-500 cursor-pointer"
          onClick={toggleSortCatalog}
        />
        <FontAwesomeIcon
          icon={faFilter}
          className="text-blue-500 cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faDatabase}
          onClick={toggleGroupCatalog}
          className="text-blue-500 cursor-pointer"
        />
      </div>

      {/* Overlay */}
      {isCatalogOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          // onClick={toggleCatalog} // Click overlay to close catalog
        ></div>
      )}

      {/* Group Catalog component */}
      <GroupingCatalog
        isOpen={isGroupCatalogOpen}
        onClose={toggleGroupCatalog}
        setGroupColumn={setGroupColumn}
      />

      {/* Show Hide Columns Component */}
      <ShowHideColumns
        isOpen={isShowColumnsCatalogOpen}
        onClose={toggleShowColumnsCatalog}
        setColumnsVisibility={setColumnsVisibility}
        columnsVisibility={columnsVisibility}
      />

      {/* Sort Catalog */}
      <SortCatalog
        isOpen={isSortCatalogOpen}
        onClose={toggleSortCatalog}
        setSortColumns={setSortColumns}
        sortColumns={sortColumns}
      />
    </div>
  );
};

export default Filters;
