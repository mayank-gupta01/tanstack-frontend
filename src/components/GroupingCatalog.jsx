import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const GroupingCatalog = ({ isOpen, onClose, setGroupColumn }) => {
  const [groupColumn, setLocalGroupColumn] = useState("");

  const handleApplyGrouping = () => {
    console.log("apply grouping")
    setGroupColumn(groupColumn); // Pass selected column to parent
    onClose(); // Close the catalog
  };

  return (
    <div
      className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-row items-stretch py-[16px] px-[14px] border-b-2">
        <h3 className="font-bold text-[20px]">Create Groups</h3>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={onClose}
          className="absolute right-3 text-black cursor-pointer w-[26px] h-[26px]"
        />
      </div>

      <div className="px-[10px] py-[10px] flex flex-col items-center justify-center gap-[40px]">
        <select
          value={groupColumn}
          onChange={(e) => setLocalGroupColumn(e.target.value)}
          className="w-[300px] p-[8px] border-[2px] border-blue-600"
        >
          <option value="" disabled>
            Select a column
          </option>
          <option value="category">Category</option>
          <option value="subcategory">Subcategory</option>
        </select>

        <div className="flex flex-col gap-[5px]">
          <button
            className="border-[1px] border-blue-600 rounded-[6px] font-semibold p-[8px] w-[300px]"
            onClick={() => setLocalGroupColumn("")}
          >
            Clear Grouping
          </button>
          <button
            className="border-[1px] border-blue-600 rounded-[6px] text-white font-semibold p-[8px] bg-blue-600 w-[300px]"
            onClick={handleApplyGrouping}
          >
            Apply Grouping
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupingCatalog;
