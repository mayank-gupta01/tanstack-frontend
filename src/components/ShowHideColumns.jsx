import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ShowHideColumns = ({
  isOpen,
  onClose,
  setColumnsVisibility,
  columnsVisibility,
}) => {
  const [localColumnsVisibility, setLocalColumnsVisibility] = useState({
    ...columnsVisibility,
  });

  const handleColumnsVisibility = (column) => {
    setLocalColumnsVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleApplyButton = () => {
    setColumnsVisibility(localColumnsVisibility);
    onClose();
  };

  const handleShowAllColumns = () => {
    setLocalColumnsVisibility((prev) => {
      const updateColumns = { ...prev };
      for (const property in updateColumns) {
        updateColumns[property] = true;
      }
      return updateColumns;
    });
  };

  return (
    <div
      className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-row items-stretch py-[16px] px-[14px] border-b-2">
        <h3 className="font-bold text-[20px]">Show/Hide Columns</h3>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={onClose}
          className="absolute right-3 text-black cursor-pointer w-[26px] h-[26px]"
        />
      </div>

      <div className="flex flex-col gap-[5px] p-[14px]">
        {/* all columns */}
        {Object.keys(localColumnsVisibility).map((columnKey) => (
          <label key={columnKey} className="flex items-center gap-[10px]">
            <input
              type="checkbox"
              checked={localColumnsVisibility[columnKey]}
              onChange={() => handleColumnsVisibility(columnKey)}
            />
            {columnKey}
          </label>
        ))}
        <button
          className="border-[1px] border-blue-600 rounded-[6px] font-semibold p-[8px] w-[300px]"
          onClick={handleShowAllColumns}
        >
          Show all columns
        </button>
        <button
          className="border-[1px] border-blue-600 rounded-[6px] text-white font-semibold p-[8px] bg-blue-600 w-[300px]"
          onClick={handleApplyButton}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ShowHideColumns;
