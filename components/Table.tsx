"use client";
import React, { useState } from "react";
import { itemType } from "./Body";

interface Row {
  col1: string;
  col2: string;
  col3: string;
}

export default function Table({
  items,
  setItems,
}: {
  items: itemType[];
  setItems: React.Dispatch<React.SetStateAction<itemType[]>>;
}) {
  const [rows, setRows] = useState<Row[]>([{ col1: "", col2: "", col3: "" }]);

  const syncRowsToItems = (updatedRows: Row[]) => {
    // Convert Row → itemType
    const converted: itemType[] = updatedRows.map((r) => ({
      quantity: r.col1,
      goods: r.col2,
      actualWeight: r.col3,
    }));

    setItems(converted);
  };

  const addRow = () => {
    const updated = [...rows, { col1: "", col2: "", col3: "" }];
    setRows(updated);
    syncRowsToItems(updated);
  };

  const removeRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
    syncRowsToItems(updated);
  };

  const handleChange = (index: number, field: keyof Row, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    syncRowsToItems(updatedRows); // sync to parent state
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="font-semibold">Item Details</label>
        <button
          onClick={addRow}
          className="mb-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Row
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Goods</th>
            <th className="border p-2">Actual Weights</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {Object.keys(row).map((key) => (
                <td key={key} className="border p-2">
                  <input
                    type="text"
                    value={(row as any)[key]}
                    onChange={(e) =>
                      handleChange(index, key as keyof Row, e.target.value)
                    }
                    className="w-full border px-2 py-1"
                  />
                </td>
              ))}

              <td className="border p-2">
                <button
                  onClick={() => removeRow(index)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
