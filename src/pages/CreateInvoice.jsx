import React, { useState, useRef, useCallback, useEffect } from "react";
import DashboardTitle from "../components/DashboardTitle";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import FormInvoiceField from "../components/FormInvoiceField";
import { Link } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice, retrieveInvoices } from "../actions/invoice";
import { clearMessage } from "../actions/message";
import { toast } from "react-toastify";

const CreateInvoice = (props) => {
  const dispatch = useDispatch();
  const arrayOfData = [
    {
      id: "1 - Cash",
      name: "Cash",
    },
    {
      id: "2 - Card",
      name: "Card",
    },
  ];
  const [images, setImages] = React.useState([]);
  // const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const [name1, setName1] = useState();
  const [address1, setAddress1] = useState();
  const [phone1, setPhone1] = useState();
  const [website1, setWebsite1] = useState();
  const [name2, setName2] = useState();
  const [website2, setWebsite2] = useState();
  const [phone2, setPhone2] = useState();
  const [address2, setAddress2] = useState();
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [pickupLocation, setPickupLocation] = useState();
  const [dropoffLocation, setDropoffLocation] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [date, setDate] = useState();

  const handleName1Change = (e) => {
    setName1(e.target.value);
  };
  const handleAddress1Change = (e) => {
    setAddress1(e.target.value);
  };
  const handlePhone1Change = (e) => {
    setPhone1(e.target.value);
  };
  const handleWebsite1Change = (e) => {
    setWebsite1(e.target.value);
  };
  const handleName2Change = (e) => {
    setName2(e.target.value);
  };
  const handleWebsite2Change = (e) => {
    setWebsite2(e.target.value);
  };
  const handlePhone2Change = (e) => {
    setPhone2(e.target.value);
  };
  const handleAddress2Change = (e) => {
    setAddress2(e.target.value);
  };
  const handleInvoiceNumberChange = (e) => {
    setInvoiceNumber(e.target.value);
  };
  const handlePickupLocationChange = (e) => {
    setPickupLocation(e.target.value);
  };
  const handleDropoffLocationChange = (e) => {
    setDropoffLocation(e.target.value);
  };
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const [orders, setOrders] = useState([{}]);

  const addRow = (e) => {
    e.preventDefault();
    setOrders([...orders, {}]);
  };

  const handleOrderChange = (i, event) => {
    const newRows = [...orders];
    newRows[i][event.target.name] = event.target.value;
    setOrders(newRows);
  };

  const handleDelete = (e, i) => {
    e.preventDefault();
    const newRows = [...orders];
    newRows.splice(i, 1);
    setOrders(newRows);
  };

  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const [successful, setSuccessful] = useState(false);
  const [store, setStore] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const state = useRef({
    loading: false,
  });
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 50,
    },
  };

  const submitInvoice = (e) => {
    e.preventDefault();
    // console.log("Form submitted");
    dispatch(clearMessage());
    const from = {
      name: name1,
      address: address1,
      phone: phone1,
      website: website1,
    };
    const to = {
      name: name2,
      website: website2,
      phone: phone2,
      address: address2,
    };
    if (from && to && invoiceNumber && pickupLocation && dropoffLocation && paymentMethod && date && images[0]) {
      console.log("Form submitted");
      const fd = new FormData();
      fd.append("from", JSON.stringify(from));
      fd.append("to", JSON.stringify(to));
      fd.append("invoice_number", invoiceNumber);
      fd.append("pickup_location", pickupLocation);
      fd.append("dropoff_location", dropoffLocation);
      fd.append("payment_method", paymentMethod);
      fd.append("date", date);
      fd.append("orders", JSON.stringify(orders));
      fd.append("logo", images[0].file);
      // if (images[0]) {
      //   fd.append("logo", images[0].file);
      // }
      setStore(fd);
      setLoading(true);
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      dispatch(createInvoice(store))
        .then(() => {
          setLoading(false);
          setSuccessful(true);
          setIsSubmitted(false);
          setStore(null);
          setName1("");
          setEmail1("");
          setPhone1("");
          setWebsite1("");
          setName2("");
          setEmail2("");
          setPhone2("");
          setAddress2("");
          setInvoiceNumber("");
          setPickupLocation("");
          setDropoffLocation("");
          setPaymentMethod("");
          setDate("");
          setOrders([{}]);
          toast("Invoice Created Succesfully", {
            type: "success",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        })
        .catch(() => {
          setLoading(false);
          setSuccessful(false);
          setIsSubmitted(false);
          setStore(null);
          toast("Invoice Creation Failed", {
            type: "error",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        });
      localStorage.removeItem("invoices");
      dispatch(retrieveInvoices);
    }
  }, [isSubmitted]);

  return (
    <Layout>
      <div className="sm:flex sm:justify-between sm:items-center flex justify-between items-center mb-8">
        <DashboardTitle title="Create Invoice" />
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <Link to="/finance">
            <button
              className="btn hover:text-yellow-500 text-gray-600 border h-8 px-4 text-sm"
              style={{ borderColor: "rgb(249, 123, 4, 0.2" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              <span className="hidden xs:block ml-2 mr-2">Back</span>
            </button>
          </Link>
        </div>
      </div>

      <form
        className="sm:col-span-12 col-span-12"
        onSubmit={(e) => submitInvoice(e)}
        enctype="multipart/form-data"
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-full xl:col-span-8">
            <div
              className="px-12 bg-white shadow-sm rounded-lg my-10 border "
              style={{ borderColor: "rgba(197, 17, 4, 0.1)" }}
            >
              <div className="flex justify-end my-10">
                <button
                  className="btn bg-green-400 hover:text-green-500 text-gray border h-8 px-4 text-md"
                  style={{ borderColor: "rgb(249, 123, 4, 0.2" }}
                >
                  <span className="ml-2 mr-2">Paid</span>
                  <svg
                    width="8"
                    height="6"
                    viewBox="0 0 8 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.61954 5.45089C3.64924 5.49404 3.68899 5.52931 3.73536 5.55368C3.78172 5.57805 3.83332 5.59078 3.8857 5.59078C3.93808 5.59078 3.98967 5.57805 4.03604 5.55368C4.0824 5.52931 4.12215 5.49404 4.15186 5.45089L7.06601 1.24156C7.09974 1.193 7.11952 1.13614 7.12321 1.07713C7.12689 1.01813 7.11433 0.959246 7.08689 0.906878C7.05946 0.854511 7.0182 0.810664 6.96759 0.780101C6.91699 0.749538 6.85897 0.733428 6.79985 0.733521H0.97154C0.912559 0.733765 0.85476 0.750082 0.804359 0.780718C0.753957 0.811355 0.712861 0.855151 0.685489 0.907397C0.658118 0.959643 0.645506 1.01836 0.649011 1.07724C0.652516 1.13612 0.672004 1.19293 0.705381 1.24156L3.61954 5.45089Z"
                      fill="#333333"
                      fill-opacity="0.45"
                    />
                  </svg>
                </button>
              </div>
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful
                        ? "p-4 my-3 text-black font-semibold bg-green-200"
                        : "p-4 my-3 text-red-500 font-semibold bg-red-200"
                    }
                    role="alert"
                  >
                    <ul className="mx-3 my-3">{message}</ul>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-4 gap-6">
                <div className="lg:col-span-2 col-span-4 p-5">
                  <p className="text-xl font-nunito font-normal py-3">From</p>
                  <InputField
                    // label="Name"
                    value={name1}
                    onChange={handleName1Change}
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                  />
                  <InputField
                    // label="Email"
                    value={address1}
                    onChange={handleAddress1Change}
                    name="address"
                    type="text"
                    placeholder="Enter your Address"
                  />
                  <InputField
                    // label="Phone Number"
                    value={phone1}
                    onChange={handlePhone1Change}
                    name="phone"
                    type="text"
                    placeholder="Enter your phone number"
                  />

                  <InputField
                    // label="Company Website"
                    value={website1}
                    onChange={handleWebsite1Change}
                    name="website"
                    type="text"
                    placeholder="Enter your company website"
                  />

                  {/* <FormField type="text" id="text" placeholder="Name" />
                <FormField type="text" id="text" placeholder="Address" />
                <FormField type="number" id="text" placeholder="Phone Number" />
                <FormField
                  type="text"
                  id="text"
                  placeholder="Company Website"
                /> */}
                </div>
                <div className="p-5 lg:col-span-2 col-span-4 lg:my-8 -my-10 mx-auto">
                  <div className="flex flex-col col-span-full sm:col-span-4 lg:col-span-3 xl:col-span-6 items-end">
                    <div className="sm:w-48 md:w-full xl:w-full rounded-lg shadow-xl bg-gray-50">
                      <div className="m-4">
                        <div className="flex items-center justify-center w-full">
                          <div className="flex border-2 border-dashed border-gray-200 hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex items-center justify-center p-7">
                              <ImageUploading
                                value={images}
                                onChange={onChange}
                                dataURLKey="data_url"
                              >
                                {({
                                  imageList,
                                  onImageUpload,
                                  onImageUpdate,
                                  onImageRemove,
                                  isDragging,
                                  dragProps,
                                }) => (
                                  // write your building UI
                                  <div className="upload__image-wrapper">
                                    <button
                                      style={
                                        isDragging ? { color: "red" } : null
                                      }
                                      onClick={onImageUpload}
                                      {...dragProps}
                                    >
                                      Add Company Logo
                                    </button>

                                    {imageList.map((image, index) => (
                                      <div key={index} className="image-item">
                                        <img
                                          src={image.data_url}
                                          alt=""
                                          width="100"
                                        />
                                        <div className="image-item__btn-wrapper">
                                          <button
                                            className="btn mx-2 text-white my-2 bg-yellow-500"
                                            onClick={() => onImageUpdate(index)}
                                          >
                                            Update
                                          </button>
                                          <button
                                            className="btn mx-2 text-white my-2 bg-red-500"
                                            onClick={() => onImageRemove(index)}
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </ImageUploading>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 col-span-4 p-5">
                  <p className="text-xl font-nunito font-normal mb-4">To</p>

                  <InputField
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={name2}
                    onChange={handleName2Change}
                  />

                  <InputField
                    name="address"
                    type="text"
                    placeholder="Address"
                    value={address2}
                    onChange={handleAddress2Change}
                  />

                  <InputField
                    name="phone"
                    type="text"
                    placeholder="Enter your Phone Number"
                    value={phone2}
                    onChange={handlePhone2Change}
                  />

                  <InputField
                    name="website"
                    type="text"
                    placeholder="Enter your website"
                    value={website2}
                    onChange={handleWebsite2Change}
                  />
                </div>
                <div className="lg:col-span-2 col-span-4 p-5">
                  <FormInvoiceField
                    label="Invoice Number"
                    value={invoiceNumber}
                    onChange={handleInvoiceNumberChange}
                    type="text"
                    id="invoiceNo"
                    name="invoice_number"
                    placeholder="INV 10"
                  />
                  <FormInvoiceField
                    label="Pickup Location"
                    value={pickupLocation}
                    onChange={handlePickupLocationChange}
                    type="text"
                    id="pickupLoc"
                    name="pickup_location"
                    placeholder="Yaba Estate 10"
                  />
                  <FormInvoiceField
                    label="Drop up Location"
                    value={dropoffLocation}
                    onChange={handleDropoffLocationChange}
                    type="text"
                    id="dropupLoc"
                    name="dropoff_location"
                    placeholder="Ikeja Head office"
                  />
                  {/* <FormInvoiceSelectField
                  arrayOfData={arrayOfData}
                  onSelectChange={handleSelectChange}
                  label="Payment Method"
                  type="text"
                  id="payment_method"
                  placeholder=""
                /> */}

                  <div class="text-gray-700 md:flex md:items-center mb-4">
                    <div class="mb-1 md:mb-0 md:w-1/3">
                      <label htmlFor="Payment">Payment Method</label>
                    </div>
                    <div class="relative inline-block md:w-2/3 md:flex-grow text-gray-700">
                      <select
                        name="payment_method"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        allowClear
                        className={`w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                        placeholder="Select Payment Method"
                      >
                        <option value="">Select Payment Method</option>
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                      </select>
                    </div>
                  </div>
                  <FormInvoiceField
                    label="Date"
                    value={date}
                    onChange={handleDateChange}
                    type="date"
                    name="date"
                    id="date"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div
              className="px-12 bg-white shadow-sm rounded-lg -mt-10 mb-10 border "
              style={{ borderColor: "rgba(197, 17, 4, 0.1)" }}
            >
              <div className="grid grid-cols-4 gap-6">
                <div className="lg:col-span-4 col-span-4 p-5">
                  {/* <Table setInvoiceInputValue={orders} /> */}
                  <div className="md:px-10 pt-4 md:pt-7 pb-5 overflow-x-auto">
                    <table className="table-auto w-full rounded-lg">
                      <thead className="vj font-semibold uppercase table_header text-white border-t-2 border-b-2 border-gray-100">
                        <tr>
                          <th className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Item Description
                            </div>
                          </th>
                          <th className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Price
                            </div>
                          </th>
                          <th className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="font-semibold text-center">Qty</div>
                          </th>
                          <th className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Amount
                            </div>
                          </th>
                          <th className="yl yd px-2 py-3 whitespace-nowrap">
                            <div className="font-semibold text-left">...</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-md t_ lh">
                        {orders.map((order, i) => (
                          <tr key={i}>
                            <td className="yl yd px-2 py-3 whitespace-nowrap">
                              <div className="text-left bg-gray-200 p-2 rounded-lg">
                                <p className="px-5">Item Name</p>
                                <p className=" text-gray-400">
                                  <InputField
                                    style="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="name"
                                    value={order.name}
                                    onChange={(e) => handleOrderChange(i, e)}
                                    type="text"
                                    placeholder="Enter Product Name"
                                  />
                                </p>
                              </div>
                            </td>
                            <td className="yl yd px-2 py-3 whitespace-nowrap">
                              <div className="font-medium text-left bg-gray-200 p-2 rounded-lg">
                                <p>Price</p>
                                <p className="text-gray-400">
                                  <InputField
                                    style="appearance-none block w-36 bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="price"
                                    value={order.price}
                                    onChange={(e) => handleOrderChange(i, e)}
                                    type="number"
                                    placeholder=" ???20,000"
                                  />
                                </p>
                              </div>
                            </td>
                            <td className="yl yd px-2 py-3 whitespace-nowrap">
                              <div className="font-medium bg-gray-200 p-2 rounded-lg text-center ">
                                <p>Qty</p>
                                <p className="text-gray-400">
                                  <InputField
                                    style="appearance-none block w-24 bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="qty"
                                    value={order.qty}
                                    onChange={(e) => handleOrderChange(i, e)}
                                    type="number"
                                    placeholder="1"
                                  />
                                </p>
                              </div>
                            </td>
                            <td className="yl yd px-2 py-3 whitespace-nowrap">
                              <div className="font-medium bg-gray-200 px-2 py-4 rounded-lg text-center ">
                                <p className="text-gray-400">
                                  ???{" "}
                                  {isNaN(order.price * order.qty)
                                    ? 0
                                    : order.price * order.qty}
                                </p>
                              </div>
                            </td>
                            <td>
                              {i === 0 ? (
                                <div className="flex justify-center">...</div>
                              ) : (
                                <button
                                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                  onClick={(e) => handleDelete(e, i)}
                                >
                                  Remove
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                        {/* {this.renderRows()} */}
                      </tbody>

                      {/* <button
                        className="btn my-6 text-white bg-blue-500"
                        onClick={this.handleClick.bind(this)}
                      >
                        Add Line
                      </button> */}

                      <tfoot>
                        <tr>
                          <td colSpan="4">
                            <button
                              className="btn my-6 text-white bg-green-500"
                              onClick={(e) => addRow(e)}
                            >
                              Add Row
                            </button>
                          </td>
                        </tr>
                        {/* <tr class="flex text-right items-end justify-end text-black font-semibold">
                          <td
                            colspan="5"
                            className="yl yd px-8 py-3 whitespace-nowrap"
                          >
                            Sub Total
                          </td>
                          <td className=" px-8 py-3">???20,000</td>
                        </tr>
                        <tr class="flex text-right items-end justify-end text-black font-semibold">
                          <td className="yl yd px-8 py-3 whitespace-nowrap">
                            Sales Tax (10%)
                          </td>
                          <td className=" px-8 py-3">???20,000</td>
                        </tr>
                        <hr />
                        <tr class="flex text-right items-end justify-end text-black font-semibold">
                          <td className="yl yd px-8 py-3 whitespace-nowrap">
                            Amount Due
                          </td>
                          <td className=" px-8 py-3">???20,000</td>
                        </tr> */}
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-12 shadow-sm rounded-lg my-10  col-span-full xl:col-span-4">
            <div className="flex flex-col justify-center sm:items-start lg:items-center sm:my-10 lg:-my-10 xl:my-60">
              <button className="btn bg-gray-300 text-gray-400 rounded-lg w-48 h-11 mb-10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H13.3333L17.5 6.66667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5Z"
                    stroke="#999999"
                    stroke-opacity="0.5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.1663 17.5V10.8334H5.83301V17.5"
                    stroke="#999999"
                    stroke-opacity="0.5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.83301 2.5V6.66667H12.4997"
                    stroke="#999999"
                    stroke-opacity="0.5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className=" ml-2 mr-2">Save Invoice</span>
              </button>
              <button className="btn bg-gray-300 text-gray-400 rounded-lg w-48 h-11 mb-10">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0607 14.4642H13.5559C13.3772 14.4642 13.2058 14.3933 13.0794 14.2669C12.953 14.1405 12.8821 13.9691 12.8821 13.7904C12.8821 13.6117 12.953 13.4403 13.0794 13.3139C13.2058 13.1876 13.3772 13.1166 13.5559 13.1166H16.0607C16.8897 13.1067 17.6813 12.7704 18.264 12.1808C18.8467 11.5911 19.1735 10.7955 19.1735 9.96644C19.1735 9.13743 18.8467 8.34183 18.264 7.75213C17.6813 7.16244 16.8897 6.8262 16.0607 6.8163C15.9758 6.8163 15.8855 6.82034 15.7849 6.82932C15.6576 6.84018 15.5298 6.81461 15.4164 6.75559C15.3031 6.69657 15.2089 6.60654 15.1448 6.496C14.6904 5.71225 14.0057 5.08744 13.1837 4.70655C12.3617 4.32565 11.4424 4.20715 10.5507 4.36715C9.65898 4.52716 8.8382 4.9579 8.19993 5.60082C7.56167 6.24373 7.13689 7.06762 6.98336 7.96046C6.95591 8.12158 6.87083 8.26722 6.74398 8.37028C6.61712 8.47333 6.45713 8.52677 6.29381 8.52063H6.24619C5.93974 8.51312 5.63488 8.56698 5.34955 8.67905C5.06422 8.79111 4.80419 8.95912 4.58475 9.17317C4.36532 9.38723 4.19092 9.64302 4.07182 9.92548C3.95271 10.2079 3.89131 10.5114 3.89122 10.8179C3.89113 11.1245 3.95235 11.4279 4.07129 11.7105C4.19023 11.993 4.36448 12.2489 4.58379 12.4631C4.8031 12.6773 5.06303 12.8454 5.34829 12.9576C5.63356 13.0699 5.93839 13.1239 6.24485 13.1166H9.60096C9.77967 13.1166 9.95106 13.1876 10.0774 13.3139C10.2038 13.4403 10.2748 13.6117 10.2748 13.7904C10.2748 13.9691 10.2038 14.1405 10.0774 14.2669C9.95106 14.3933 9.77967 14.4642 9.60096 14.4642H6.24485C5.31942 14.4634 4.42893 14.1107 3.75387 13.4777C3.0788 12.8446 2.66965 11.9787 2.60932 11.0552C2.549 10.1317 2.84202 9.21988 3.429 8.50443C4.01599 7.78897 4.85302 7.32344 5.77047 7.20218C6.05845 6.13935 6.64516 5.1814 7.46104 4.4419C8.27692 3.70241 9.28775 3.21237 10.3737 3.02991C11.4596 2.84745 12.5751 2.98022 13.5878 3.41246C14.6006 3.8447 15.4682 4.5583 16.0877 5.46864C17.2731 5.48349 18.4047 5.96574 19.2365 6.81052C20.0683 7.65529 20.5329 8.79427 20.5293 9.97979C20.5258 11.1653 20.0543 12.3015 19.2175 13.1413C18.3807 13.981 17.2462 14.4565 16.0607 14.4642Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M13.7428 11.9538C13.6543 11.9539 13.5667 11.9365 13.4849 11.9026C13.4032 11.8686 13.329 11.8189 13.2666 11.7562L11.5784 10.0685L9.8907 11.7562C9.76249 11.8727 9.59431 11.9354 9.42111 11.9312C9.2479 11.927 9.08298 11.8562 8.96058 11.7336C8.83819 11.6109 8.76773 11.4459 8.76384 11.2727C8.75995 11.0994 8.82294 10.9314 8.93971 10.8034L11.104 8.63906C11.2304 8.51274 11.4018 8.44177 11.5804 8.44177C11.7591 8.44177 11.9305 8.51274 12.0568 8.63906L14.2212 10.8034C14.3155 10.8976 14.3797 11.0177 14.4057 11.1485C14.4317 11.2792 14.4184 11.4148 14.3674 11.5379C14.3163 11.6611 14.2299 11.7663 14.1191 11.8404C14.0082 11.9144 13.8779 11.9539 13.7445 11.9538H13.7428Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M11.5791 17.1903C11.4004 17.1903 11.229 17.1193 11.1026 16.9929C10.9763 16.8666 10.9053 16.6952 10.9053 16.5165V9.1156C10.9053 8.93689 10.9763 8.7655 11.1026 8.63913C11.229 8.51277 11.4004 8.44177 11.5791 8.44177C11.7578 8.44177 11.9292 8.51277 12.0556 8.63913C12.1819 8.7655 12.2529 8.93689 12.2529 9.1156V16.5165C12.2529 16.6952 12.1819 16.8666 12.0556 16.9929C11.9292 17.1193 11.7578 17.1903 11.5791 17.1903Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                </svg>

                <span className=" ml-2 mr-2">Download Invoice</span>
              </button>
              <button className="btn bg-gray-300 text-gray-400 rounded-lg w-48 h-11 mb-10">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4248 7.90625H6.31543C6.14449 7.90625 5.98055 7.83834 5.85968 7.71747C5.7388 7.5966 5.6709 7.43266 5.6709 7.26172V2.70703C5.6709 2.53609 5.7388 2.37215 5.85968 2.25128C5.98055 2.13041 6.14449 2.0625 6.31543 2.0625H15.4248C15.5957 2.0625 15.7597 2.13041 15.8806 2.25128C16.0014 2.37215 16.0693 2.53609 16.0693 2.70703V7.26172C16.0693 7.43266 16.0014 7.5966 15.8806 7.71747C15.7597 7.83834 15.5957 7.90625 15.4248 7.90625ZM6.95996 6.61719H14.7803V3.35156H6.95996V6.61719Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M15.4248 19.336H6.31543C6.14449 19.336 5.98055 19.2681 5.85968 19.1472C5.7388 19.0263 5.6709 18.8624 5.6709 18.6914V11.6914C5.6709 11.5205 5.7388 11.3565 5.85968 11.2357C5.98055 11.1148 6.14449 11.0469 6.31543 11.0469H15.4248C15.5957 11.0469 15.7597 11.1148 15.8806 11.2357C16.0014 11.3565 16.0693 11.5205 16.0693 11.6914V18.6914C16.0693 18.8624 16.0014 19.0263 15.8806 19.1472C15.7597 19.2681 15.5957 19.336 15.4248 19.336ZM6.95996 18.0469H14.7803V12.3359H6.95996V18.0469Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M17.4978 16.2852H15.4245C15.2536 16.2852 15.0897 16.2172 14.9688 16.0964C14.8479 15.9755 14.78 15.8116 14.78 15.6406C14.78 15.4697 14.8479 15.3057 14.9688 15.1849C15.0897 15.064 15.2536 14.9961 15.4245 14.9961H17.4978C17.7129 14.9959 17.9191 14.9103 18.0712 14.7582C18.2233 14.6061 18.3088 14.3999 18.309 14.1848V8.71793C18.3089 8.50277 18.2234 8.29645 18.0713 8.14426C17.9192 7.99208 17.7129 7.90648 17.4978 7.90625H4.24191C4.02675 7.90648 3.82048 7.99208 3.66837 8.14426C3.51627 8.29645 3.43078 8.50277 3.43066 8.71793V14.1848C3.43089 14.3999 3.51644 14.6061 3.66853 14.7582C3.82061 14.9103 4.02683 14.9959 4.24191 14.9961H6.31516C6.4861 14.9961 6.65004 15.064 6.77091 15.1849C6.89178 15.3057 6.95969 15.4697 6.95969 15.6406C6.95969 15.8116 6.89178 15.9755 6.77091 16.0964C6.65004 16.2172 6.4861 16.2852 6.31516 16.2852H4.24191C3.68509 16.2845 3.15126 16.063 2.75752 15.6692C2.36379 15.2755 2.14228 14.7417 2.1416 14.1848V8.71793C2.14217 8.16103 2.36362 7.62709 2.75737 7.23326C3.15112 6.83943 3.68501 6.61787 4.24191 6.61719H17.4978C18.0547 6.61787 18.5886 6.83943 18.9823 7.23326C19.3761 7.62709 19.5975 8.16103 19.5981 8.71793V14.1848C19.5974 14.7417 19.3759 15.2755 18.9822 15.6692C18.5884 16.063 18.0546 16.2845 17.4978 16.2852Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M5.62747 10.1408C5.60623 10.1408 5.58501 10.1398 5.56387 10.1378C5.54325 10.1356 5.5209 10.1322 5.50157 10.1283C5.48223 10.1244 5.4586 10.1189 5.44012 10.1128C5.42164 10.1068 5.40016 10.0995 5.38082 10.0914C5.36149 10.0832 5.34258 10.0742 5.32411 10.0643C5.30529 10.0546 5.28707 10.0439 5.26954 10.0321C5.25235 10.0205 5.23516 10.008 5.21883 9.99468C5.2025 9.98136 5.18661 9.96675 5.17157 9.95171C5.15653 9.93667 5.14235 9.92078 5.1286 9.90445C5.11528 9.8882 5.1028 9.87127 5.09121 9.85375C5.07947 9.83598 5.06873 9.81794 5.05899 9.7996C5.04911 9.78113 5.04008 9.76179 5.03192 9.74246C5.02375 9.72312 5.01688 9.70292 5.01043 9.68316C5.00399 9.66339 4.99926 9.64019 4.99497 9.62171C4.99067 9.60324 4.98766 9.57875 4.98551 9.55941C4.98139 9.51654 4.98139 9.47337 4.98551 9.4305C4.98766 9.40988 4.9911 9.38753 4.99497 9.3682C4.99883 9.34886 5.00442 9.32523 5.01043 9.30675C5.01645 9.28828 5.02375 9.26679 5.03192 9.24746C5.04008 9.22812 5.04911 9.20878 5.05899 9.19031C5.06887 9.17183 5.07961 9.15378 5.09121 9.13617C5.1028 9.11864 5.11528 9.10172 5.1286 9.08546C5.14192 9.06914 5.15653 9.05324 5.17157 9.0382C5.18661 9.02316 5.2025 9.00898 5.21883 8.99523C5.23516 8.98148 5.25235 8.96945 5.26954 8.95785C5.28707 8.94604 5.30529 8.93527 5.32411 8.92562C5.34273 8.91588 5.36163 8.90686 5.38082 8.89855C5.40016 8.89039 5.42036 8.88351 5.44012 8.87707C5.45989 8.87062 5.48309 8.86589 5.50157 8.8616C5.52004 8.8573 5.54454 8.85429 5.56387 8.85214C5.60604 8.84828 5.64847 8.84828 5.69063 8.85214C5.71168 8.85429 5.7336 8.85773 5.75336 8.8616C5.77313 8.86546 5.79633 8.87105 5.81438 8.87707C5.83243 8.88308 5.85477 8.89039 5.87411 8.89855C5.89344 8.90671 5.91235 8.91574 5.93082 8.92562C5.94958 8.93537 5.9678 8.94613 5.9854 8.95785C6.00258 8.96945 6.01977 8.98191 6.0361 8.99523C6.05243 9.00855 6.06832 9.02316 6.08336 9.0382C6.0984 9.05324 6.11215 9.06914 6.12633 9.08546C6.14051 9.10179 6.15211 9.11898 6.16372 9.13617C6.17532 9.15335 6.18606 9.17183 6.19594 9.19031C6.20582 9.20878 6.21485 9.22812 6.22301 9.24746C6.23118 9.26679 6.23805 9.28699 6.2445 9.30675C6.25094 9.32652 6.25567 9.34972 6.25997 9.3682C6.26426 9.38667 6.26727 9.41117 6.26942 9.4305C6.27354 9.47337 6.27354 9.51654 6.26942 9.55941C6.26727 9.58003 6.26383 9.60238 6.25997 9.62171C6.2561 9.64105 6.25051 9.66468 6.2445 9.68316C6.23848 9.70164 6.23118 9.72312 6.22301 9.74246C6.21485 9.76179 6.20582 9.78113 6.19594 9.7996C6.18606 9.81808 6.17532 9.83613 6.16372 9.85375C6.15211 9.87136 6.13922 9.88812 6.12633 9.90445C6.11344 9.92078 6.0984 9.93667 6.08336 9.95171C6.06832 9.96675 6.05243 9.98093 6.0361 9.99468C6.01977 10.0084 6.00258 10.0205 5.9854 10.0321C5.9678 10.0438 5.94958 10.0545 5.93082 10.0643C5.9122 10.074 5.8933 10.0831 5.87411 10.0914C5.85477 10.0995 5.83457 10.1064 5.81438 10.1128C5.79418 10.1193 5.77399 10.124 5.75336 10.1283C5.73274 10.1326 5.7104 10.1356 5.69063 10.1378C5.66964 10.1398 5.64856 10.1408 5.62747 10.1408Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M7.51809 10.1409C7.49704 10.1409 7.47512 10.1409 7.4545 10.1378C7.43387 10.1348 7.41153 10.1323 7.39219 10.1284C7.37286 10.1245 7.34922 10.1189 7.33075 10.1129C7.31227 10.1069 7.29079 10.0996 7.27145 10.0914C7.25211 10.0833 7.23278 10.0743 7.2143 10.0644C7.19582 10.0545 7.17778 10.0437 7.16016 10.0321C7.14263 10.0206 7.12571 10.0081 7.10946 9.99476C7.09313 9.98144 7.07723 9.96683 7.06219 9.95179C7.04715 9.93675 7.03297 9.92085 7.01922 9.90453C7.00547 9.8882 6.99344 9.87101 6.98184 9.85382C6.97004 9.83619 6.95915 9.81798 6.94918 9.79925C6.93973 9.78078 6.93071 9.76187 6.92254 9.74253C6.91438 9.7232 6.9075 9.703 6.90106 9.68324C6.89461 9.66347 6.88989 9.64027 6.88559 9.62179C6.88129 9.60332 6.87829 9.57882 6.87614 9.55949C6.87202 9.51662 6.87202 9.47345 6.87614 9.43058C6.87829 9.40996 6.88172 9.38761 6.88559 9.36828C6.88946 9.34894 6.89504 9.32531 6.90106 9.30683C6.90707 9.28836 6.91438 9.26687 6.92254 9.24754C6.93071 9.2282 6.93973 9.20929 6.94918 9.19082C6.95915 9.17209 6.97004 9.15388 6.98184 9.13625C6.99344 9.11906 7.0059 9.10187 7.01922 9.08554C7.03254 9.06921 7.04715 9.05332 7.06219 9.03828C7.07723 9.02324 7.09313 9.00906 7.10946 8.99531C7.12571 8.98199 7.14263 8.96951 7.16016 8.95793C7.17792 8.94618 7.19597 8.93544 7.2143 8.9257C7.23278 8.91582 7.25211 8.90679 7.27145 8.89863C7.29079 8.89046 7.31098 8.88359 7.33075 8.87714C7.35051 8.8707 7.37372 8.86597 7.39219 8.86168C7.41067 8.85738 7.43516 8.85437 7.4545 8.85222C7.49737 8.84825 7.54053 8.84825 7.5834 8.85222C7.60403 8.85437 7.62637 8.85781 7.64571 8.86168C7.66504 8.86554 7.68868 8.87113 7.70715 8.87714C7.72563 8.88316 7.74711 8.89046 7.76645 8.89863C7.78579 8.90679 7.80469 8.91582 7.82317 8.9257C7.84165 8.93558 7.86012 8.94632 7.87774 8.95793C7.89536 8.96953 7.91211 8.98199 7.92844 8.99531C7.94477 9.00863 7.96067 9.02324 7.97571 9.03828C7.99075 9.05332 8.0045 9.06921 8.01868 9.08554C8.03286 9.10187 8.04446 9.11906 8.05606 9.13625C8.06771 9.15388 8.07847 9.17209 8.08829 9.19082C8.09803 9.20944 8.10705 9.22834 8.11536 9.24754C8.12352 9.26687 8.13039 9.28707 8.13684 9.30683C8.14329 9.3266 8.14801 9.3498 8.15231 9.36828C8.15661 9.38675 8.15961 9.41125 8.16176 9.43058C8.16588 9.47345 8.16588 9.51662 8.16176 9.55949C8.15961 9.58011 8.15618 9.60246 8.15231 9.62179C8.14844 9.64113 8.14286 9.66476 8.13684 9.68324C8.13082 9.70171 8.12352 9.7232 8.11536 9.74253C8.10719 9.76187 8.09817 9.78078 8.08829 9.79925C8.07847 9.81797 8.06771 9.83619 8.05606 9.85382C8.04446 9.87101 8.03157 9.8882 8.01868 9.90453C8.00579 9.92085 7.99075 9.93675 7.97571 9.95179C7.96067 9.96683 7.94477 9.98101 7.92844 9.99476C7.91211 10.0085 7.89493 10.0205 7.87774 10.0321C7.86055 10.0437 7.84165 10.0545 7.82317 10.0644C7.80469 10.0743 7.78579 10.0833 7.76645 10.0914C7.74711 10.0996 7.72692 10.1065 7.70715 10.1129C7.68739 10.1194 7.66418 10.1241 7.64571 10.1284C7.62723 10.1327 7.60274 10.1357 7.5834 10.1378C7.56407 10.14 7.53914 10.1409 7.51809 10.1409Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M13.4053 14.7812H8.33496C8.16402 14.7812 8.00008 14.7133 7.87921 14.5925C7.75834 14.4716 7.69043 14.3077 7.69043 14.1367C7.69043 13.9658 7.75834 13.8018 7.87921 13.681C8.00008 13.5601 8.16402 13.4922 8.33496 13.4922H13.4053C13.5762 13.4922 13.7402 13.5601 13.861 13.681C13.9819 13.8018 14.0498 13.9658 14.0498 14.1367C14.0498 14.3077 13.9819 14.4716 13.861 14.5925C13.7402 14.7133 13.5762 14.7812 13.4053 14.7812Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M13.4053 17.0586H8.33496C8.16402 17.0586 8.00008 16.9907 7.87921 16.8698C7.75834 16.7489 7.69043 16.585 7.69043 16.4141C7.69043 16.2431 7.75834 16.0792 7.87921 15.9583C8.00008 15.8374 8.16402 15.7695 8.33496 15.7695H13.4053C13.5762 15.7695 13.7402 15.8374 13.861 15.9583C13.9819 16.0792 14.0498 16.2431 14.0498 16.4141C14.0498 16.585 13.9819 16.7489 13.861 16.8698C13.7402 16.9907 13.5762 17.0586 13.4053 17.0586Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                </svg>

                <span className=" ml-2 mr-2">Print Invoice</span>
              </button>
              <button
                type="submit"
                className="btn invoice-btn w-48 h-11 mb-10 rounded-lg text-white"
              >
                {loading && loading ? (
                  // <span className="spinner-border spinner-border-sm mr-1"></span>
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_843_2370" fill="white">
                      <path d="M16.339 15.6216C16.339 16.3558 15.7423 16.9749 15.0081 16.9749H4.35896C3.62479 16.9749 3.02813 16.3558 3.02813 15.6216V4.97245C3.02813 4.23828 3.62479 3.66328 4.35896 3.66328H10.5706V2.77661H4.35896C3.13563 2.77661 2.14062 3.74994 2.14062 4.97328V15.6216C2.14062 16.8449 3.13563 17.8616 4.35896 17.8616H15.0073C16.2306 17.8616 17.2256 16.8441 17.2256 15.6216V9.43161H16.3381V15.6216H16.339Z" />
                    </mask>
                    <path
                      d="M16.339 15.6216C16.339 16.3558 15.7423 16.9749 15.0081 16.9749H4.35896C3.62479 16.9749 3.02813 16.3558 3.02813 15.6216V4.97245C3.02813 4.23828 3.62479 3.66328 4.35896 3.66328H10.5706V2.77661H4.35896C3.13563 2.77661 2.14062 3.74994 2.14062 4.97328V15.6216C2.14062 16.8449 3.13563 17.8616 4.35896 17.8616H15.0073C16.2306 17.8616 17.2256 16.8441 17.2256 15.6216V9.43161H16.3381V15.6216H16.339Z"
                      fill="white"
                    />
                    <path
                      d="M16.339 15.6216H23.339V8.62161H16.339V15.6216ZM10.5706 3.66328V10.6633H17.5706V3.66328H10.5706ZM10.5706 2.77661H17.5706V-4.22339H10.5706V2.77661ZM17.2256 9.43161H24.2256V2.43161H17.2256V9.43161ZM16.3381 9.43161V2.43161H9.33813V9.43161H16.3381ZM16.3381 15.6216H9.33813V22.6216H16.3381V15.6216ZM9.33896 15.6216C9.33896 12.643 11.7249 9.97495 15.0081 9.97495V23.9749C19.7597 23.9749 23.339 20.0686 23.339 15.6216H9.33896ZM15.0081 9.97495H4.35896V23.9749H15.0081V9.97495ZM4.35896 9.97495C7.64219 9.97495 10.0281 12.643 10.0281 15.6216H-3.97187C-3.97187 20.0686 -0.392611 23.9749 4.35896 23.9749V9.97495ZM10.0281 15.6216V4.97245H-3.97187V15.6216H10.0281ZM10.0281 4.97245C10.0281 8.25347 7.33989 10.6633 4.35896 10.6633V-3.33672C-0.0903015 -3.33672 -3.97187 0.223091 -3.97187 4.97245H10.0281ZM4.35896 10.6633H10.5706V-3.33672H4.35896V10.6633ZM17.5706 3.66328V2.77661H3.57063V3.66328H17.5706ZM10.5706 -4.22339H4.35896V9.77661H10.5706V-4.22339ZM4.35896 -4.22339C-0.640462 -4.22339 -4.85938 -0.205346 -4.85938 4.97328H9.14062C9.14062 7.70524 6.91171 9.77661 4.35896 9.77661V-4.22339ZM-4.85938 4.97328V15.6216H9.14062V4.97328H-4.85938ZM-4.85938 15.6216C-4.85938 20.6222 -0.81847 24.8616 4.35896 24.8616V10.8616C7.08972 10.8616 9.14062 13.0676 9.14062 15.6216H-4.85938ZM4.35896 24.8616H15.0073V10.8616H4.35896V24.8616ZM15.0073 24.8616C20.1864 24.8616 24.2256 20.6197 24.2256 15.6216H10.2256C10.2256 13.0685 12.2749 10.8616 15.0073 10.8616V24.8616ZM24.2256 15.6216V9.43161H10.2256V15.6216H24.2256ZM17.2256 2.43161H16.3381V16.4316H17.2256V2.43161ZM9.33813 9.43161V15.6216H23.3381V9.43161H9.33813ZM16.3381 22.6216H16.339V8.62161H16.3381V22.6216Z"
                      fill="white"
                      mask="url(#path-1-inside-1_843_2370)"
                    />
                    <path
                      d="M17.3391 2.64167C16.6691 1.97084 15.4999 1.97084 14.8291 2.64167L8.87656 8.59417C8.8199 8.65084 8.77906 8.72251 8.7599 8.80001L8.13323 11.3092C8.09573 11.46 8.1399 11.62 8.2499 11.7308C8.33406 11.815 8.4474 11.8608 8.56323 11.8608C8.59906 11.8608 8.6349 11.8567 8.67073 11.8475L11.1807 11.22C11.2591 11.2008 11.3299 11.16 11.3866 11.1033L17.3391 5.15084C17.6741 4.81584 17.8591 4.37001 17.8591 3.89584C17.8591 3.42167 17.6749 2.97667 17.3391 2.64167ZM10.8466 10.3892L9.17323 10.8075L9.59156 9.13418L14.5157 4.21001L15.7707 5.46501L10.8466 10.3892ZM16.7116 4.52334L16.3982 4.83667L15.1432 3.58167L15.4566 3.26834C15.7916 2.93334 16.3766 2.93334 16.7116 3.26834C16.8791 3.43584 16.9716 3.65834 16.9716 3.89584C16.9716 4.13334 16.8791 4.35584 16.7116 4.52334Z"
                      fill="white"
                    />
                  </svg>
                )}
                <span className=" ml-2 mr-2">Create Invoice</span>
              </button>
              <button className="btn bg-gray-300 text-gray-400 rounded-lg w-48 h-11 mb-10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3853 17.5746C11.2754 17.5745 11.1678 17.5436 11.0747 17.4853C10.9816 17.427 10.9067 17.3437 10.8587 17.2449L8.10479 11.5836L2.44346 8.83008C2.34148 8.78037 2.25612 8.70212 2.19775 8.60483C2.13938 8.50754 2.11051 8.3954 2.11465 8.28202C2.11878 8.16864 2.15575 8.0589 2.22105 7.96613C2.28635 7.87335 2.37719 7.80153 2.48252 7.75938L17.0103 1.91602C17.1169 1.87305 17.2337 1.86239 17.3464 1.88535C17.459 1.90831 17.5624 1.96388 17.6436 2.04515C17.7249 2.12642 17.7805 2.2298 17.8034 2.34242C17.8264 2.45504 17.8157 2.57192 17.7728 2.67852L11.929 17.2074C11.8866 17.3127 11.8146 17.4034 11.7217 17.4685C11.6288 17.5336 11.519 17.5703 11.4056 17.5742L11.3853 17.5746ZM4.14385 8.35586L8.79932 10.6215C8.91732 10.6789 9.01264 10.7742 9.07002 10.8922L11.3356 15.5477L16.1712 3.51446L4.14385 8.35586Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M8.54382 11.731C8.42793 11.731 8.31465 11.6966 8.2183 11.6322C8.12195 11.5678 8.04687 11.4762 8.00255 11.3692C7.95823 11.2621 7.94666 11.1442 7.9693 11.0306C7.99194 10.9169 8.04778 10.8125 8.12976 10.7306L16.8153 2.04507C16.8697 1.99067 16.9343 1.94752 17.0054 1.91809C17.0765 1.88866 17.1527 1.87352 17.2297 1.87354C17.3067 1.87355 17.3829 1.88873 17.4539 1.91819C17.525 1.94766 17.5896 1.99084 17.644 2.04526C17.6984 2.09969 17.7416 2.1643 17.771 2.2354C17.8004 2.3065 17.8156 2.38271 17.8156 2.45966C17.8155 2.53661 17.8004 2.61281 17.7709 2.6839C17.7414 2.75499 17.6982 2.81957 17.6438 2.87398L8.95827 11.5611C8.84808 11.6704 8.69902 11.7315 8.54382 11.731Z"
                    fill="#999999"
                    fill-opacity="0.5"
                  />
                </svg>

                <span className=" ml-2 mr-2">Send Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CreateInvoice;
