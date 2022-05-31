import React, { useState } from "react";

const Table = () => {
  const [rows, setRows] = useState([{}]);

  const addRow = () => {
    setRows([...rows, {}]);
  };

  const handleChange = (i, event) => {
    const newRows = [...rows];
    newRows[i][event.target.name] = event.target.value;
    setRows(newRows);
  };

  const handleDelete = (i) => {
    const newRows = [...rows];
    newRows.splice(i, 1);
    setRows(newRows);
  };

  // console.log(rows);

  return (
    <div>
      <div className="container">
        <div className="col-md-12 column">
          <table className="table table-bordered table-hover" id="tab_logic">
            <thead>
              <tr>
                <th className="text-center"> # </th>
                <th className="text-center"> Name </th>
                <th className="text-center"> Mobile </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={row.name}
                      onChange={(e) => handleChange(i, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Mobile"
                      value={row.mobile}
                      onChange={(e) => handleChange(i, e)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="4">
                  <button className="btn btn-primary" onClick={addRow}>
                    Add Row
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

// class Table extends React.Component {
//   state = {
//     rows: [{}],
//   };
//   handleChange = (idx) => (e) => {
//     const { name, value } = e.target;
//     const rows = [...this.state.rows];
//     rows[idx] = {
//       [name]: value,
//     };
//     this.setState({
//       rows,
//     });
//   };
//   handleAddRow = () => {
//     const item = {
//       name: "",
//       mobile: "",
//     };
//     this.setState({
//       rows: [...this.state.rows, item],
//     });
//   };
//   handleRemoveRow = () => {
//     this.setState({
//       rows: this.state.rows.slice(0, -1),
//     });
//   };
//   handleRemoveSpecificRow = (idx) => () => {
//     const rows = [...this.state.rows];
//     rows.splice(idx, 1);
//     this.setState({ rows });
//   };
//   render() {
//     return (
//       <div>
//         <div className="container">
//           <div className="row clearfix">
//             <div className="col-md-12 column">
//               <table
//                 className="table table-bordered table-hover"
//                 id="tab_logic"
//               >
//                 <thead>
//                   <tr>
//                     <th className="text-center"> # </th>
//                     <th className="text-center"> Name </th>
//                     <th className="text-center"> Mobile </th>
//                     <th />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {this.state.rows.map((item, idx) => (
//                     <tr id="addr0" key={idx}>
//                       <td>{idx}</td>
//                       <td>
//                         <input
//                           type="text"
//                           name="name"
//                           value={this.state.rows[idx].name}
//                           onChange={this.handleChange(idx)}
//                           className="form-control"
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           name="mobile"
//                           value={this.state.rows[idx].mobile}
//                           onChange={this.handleChange(idx)}
//                           className="form-control"
//                         />
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-outline-danger btn-sm"
//                           onClick={this.handleRemoveSpecificRow(idx)}
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <button onClick={this.handleAddRow} className="btn btn-primary">
//                 Add Row
//               </button>
//               <button
//                 onClick={this.handleRemoveRow}
//                 className="btn btn-danger float-right"
//               >
//                 Delete Last Row
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
export default Table;
