import React from "react";
import PropTypes from "prop-types";

const FieldTable = ({ cols, data, bordered, hoverable, striped, isDark }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        {/* Table header */}
        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            {cols.map((headerItem, index) => (
              <th className="p-2 whitespace-nowrap" key={index}>
                <div className="text-left">{headerItem.title}</div>
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="text-sm divide-y divide-gray-100">
          {data.map((item, index) => (
            <tr key={index}>
              {cols.map((col, key) => (
                <td className="p-2 whitespace-nowrap" key={key}>
                  <div className="flex items-center">
                    <div className="text-center">{col.render(item)}</div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

FieldTable.propTypes = {
  cols: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  bordered: PropTypes.bool,
  hoverable: PropTypes.bool,
  striped: PropTypes.bool,
  isDark: PropTypes.bool,
};

FieldTable.defaultProps = {
  bordered: true,
  hoverable: false,
  striped: false,
  isDark: false,
};

export default FieldTable;
