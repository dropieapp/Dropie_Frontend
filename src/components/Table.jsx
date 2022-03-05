import React from "react";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      items: [],
    };
  }

  updateMessage(event) {
    this.setState({
      message: event.target.value,
    });
  }

  handleClick() {
    var items = this.state.items;

    console.log(items);
    items.push(this.state.message);

    this.setState({
      items: items,
      message: "",
    });
  }

  handleItemChanged(i, event) {
    var items = this.state.items;
    items[i] = event.target.value;

    this.setState({
      items: items,
    });
  }

  handleItemDeleted(i) {
    var items = this.state.items;

    items.splice(i, 1);

    this.setState({
      items: items,
    });
  }

  renderRows() {
    var context = this;

    return this.state.items.map(function (o, i) {
      return (
        <tr key={"item-" + i}>
          <td className="yl yd px-2 py-3 whitespace-nowrap">
            <div className="text-left bg-gray-200 p-2 rounded-lg">
              <p>Item Name</p>
              <p className="text-gray-400">
                <input
                  className="border-transparent focus:border-transparent focus:ring-0"
                  type="text"
                  value={o}
                  onChange={context.handleItemChanged.bind(context, i)}
                  placeholder="Enter Name of the Product"
                />
              </p>
            </div>
          </td>
          <td className="yl yd px-2 py-3 whitespace-nowrap">
            <div className="font-medium text-center  bg-gray-200 p-2  rounded-lg">
              <p>Price</p>
              <p className="text-gray-400"></p>
              <input
                className="w-40 border-transparent focus:border-transparent focus:ring-0"
                type="text"
                value={o}
                placeholder="₦20,000"
                onChange={context.handleItemChanged.bind(context, i)}
              />
            </div>
          </td>
          <td className="yl yd px-1 py-3 whitespace-nowrap">
            <div className="font-medium text-center  bg-gray-200 p-2  rounded-lg">
              <p>Qty</p>
              <p className="text-gray-400"></p>
              <input
                className="w-40 border-transparent bg-gray-300 px-3 focus:border-transparent focus:ring-0"
                type="text"
                value={o}
                placeholder="1"
                onChange={context.handleItemChanged.bind(context, i)}
              />
            </div>
          </td>
          <td className="yl yd px-2 py-3 whitespace-nowrap">
            <div className="font-medium bg-gray-200 px-2 py-4 rounded-lg text-center ">
              <p className="text-gray-400">₦20,000</p>
            </div>
          </td>
          <td>
            <button
              className="btn bg-red-500 text-white p-2"
              onClick={context.handleItemDeleted.bind(context, i)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="table-auto w-full rounded-lg">
        <thead className="vj font-semibold uppercase table_header text-white border-t-2 border-b-2 border-gray-100">
          <tr>
            <th className="yl yd px-2 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">Item Description</div>
            </th>
            <th className="yl yd px-2 py-3 whitespace-nowrap">
              <div className="font-semibold text-center">Price</div>
            </th>
            <th className="yl yd px-2 py-3 whitespace-nowrap">
              <div className="font-semibold text-center">Qty</div>
            </th>
            <th className="yl yd px-2 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">Amount</div>
            </th>
          </tr>
        </thead>
        <tbody className="text-md t_ lh">
          <tr>
            <td className="yl yd px-2 py-3 whitespace-nowrap">
              <div className="text-left bg-gray-200 p-2 rounded-lg">
                <p>Item Name</p>
                <p className="text-gray-400">Enter Name of the Product</p>
              </div>
            </td>
            <td className="yl yd px-2 py-3 whitespace-nowrap">
              <div className="font-medium text-center bg-gray-200 p-2  rounded-lg">
                <p>Price</p>
                <p className="text-gray-400">₦20,000</p>
              </div>
            </td>
            <td className="yl yd px-2 py-3 whitespace-nowrap">
              <div className="font-medium bg-gray-200 p-2 rounded-lg text-center ">
                <p>Qty</p>
                <p className="text-gray-400">1</p>
              </div>
            </td>
            <td className="yl yd px-2 py-3 whitespace-nowrap">
              <div className="font-medium bg-gray-200 px-2 py-4 rounded-lg text-center ">
                <p className="text-gray-400">₦20,000</p>
              </div>
            </td>
          </tr>
          {this.renderRows()}
        </tbody>

        <button
          className="btn my-6 text-white bg-blue-500"
          onClick={this.handleClick.bind(this)}
        >
          Add Line
        </button>

        <tfoot>
          <tr class="flex text-right items-end justify-end text-black font-semibold">
            <td colspan="5" className="yl yd px-8 py-3 whitespace-nowrap">
              Sub Total
            </td>
            <td className=" px-8 py-3">₦20,000</td>
          </tr>
          <tr class="flex text-right items-end justify-end text-black font-semibold">
            <td className="yl yd px-8 py-3 whitespace-nowrap">
              Sales Tax (10%)
            </td>
            <td className=" px-8 py-3">₦20,000</td>
          </tr>
          <hr />
          <tr class="flex text-right items-end justify-end text-black font-semibold">
            <td className="yl yd px-8 py-3 whitespace-nowrap">Amount Due</td>
            <td className=" px-8 py-3">₦20,000</td>
          </tr>
        </tfoot>
      </table>

      // <div>
      //   <table className="">
      //     <thead>
      //       <tr>
      //         <th>Item</th>
      //         <th>Actions</th>
      //       </tr>
      //     </thead>
      //     <tbody>{this.renderRows()}</tbody>
      //   </table>
      // <hr />
      // <input
      //   type="text"
      //   value={this.state.message}
      //   onChange={this.updateMessage.bind(this)}
      // />
      // <button onClick={this.handleClick.bind(this)}>Add Item</button>
      // </div>
    );
  }
}
export default Table;
