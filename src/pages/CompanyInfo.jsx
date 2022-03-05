// export default CompanyInfo;
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formStage, formInfo } from "../_reducers/compnay_info.reducer";

function CompanyInfo({ pageTitle, submitButtonText, previousButton }) {
  // redux
  const dispatch = useDispatch();

  // get Redux store values for formUserSignup
  const currentStage = useSelector((state) => state.company_reducer.FormStage); // for previous button
  const formstageManagerName = useSelector(
    (state) => state.company_reducer.FormInfo.manager_name
  );
  const formstageBusinessName = useSelector(
    (state) => state.company_reducer.FormInfo.business_name
  );
  const formstagePhone = useSelector(
    (state) => state.company_reducer.FormInfo.phone_number
  );
  const formstageEmail = useSelector(
    (state) => state.company_reducer.FormInfo.email
  );
  const formstageWebsite = useSelector(
    (state) => state.company_reducer.FormInfo.website
  );

  // form values initial state
  const [formData, setFormData] = useState({
    manager_name: formstageManagerName || "",
    business_name: formstageBusinessName || "",
    phone_number: formstagePhone || "",
    email: formstageEmail || "",
    website: formstageWebsite || "",
  });

  // form values onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // form validation checks
  const [errors, setErrors] = useState({});
  const validate = (formData) => {
    let formErrors = {}; // set form errors to none at start

    // manager_name
    if (!formData.manager_name) {
      formErrors.manager_name = "Manager Name is required";
    }
    // business_name
    if (!formData.business_name) {
      formErrors.business_name = "Business Name is required";
    }
    // phone_number
    if (!formData.phone_number) {
      formErrors.phone_number = "Phone Number is required";
    }
    // website
    if (!formData.website) {
      formErrors.website = "Website url is  required";
    }

    // email
    const emailRegex = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!formData.email || !emailRegex.test(formData.email)) {
      formErrors.email = "Valid Email required";
    }

    return formErrors;
  };

  const [isSubmitted, setIsSubmitted] = useState(false); // state for sent status
  // onsubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
    setErrors(validate(formData)); // check errors
    setIsSubmitted(true); // update submit status
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      // check if any form errors

      // update Redux Slice
      dispatch(
        formStage(2) // update formStage
      );
      dispatch(
        formInfo({
          // update formSignup
          manager_name: formData.manager_name,
          business_name: formData.business_name,
          phone_number: formData.phone_number,
          email: formData.email,
          website: formData.website,
        })
      );
    }
  }, [formData, isSubmitted, dispatch, errors]);
  // console.log(errors, formData)

  return (
    <>
      <h2 className="font-bold text-lg text-black my-6">{pageTitle}</h2>

      <form
        name="form-signup"
        id="form-signup"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="my-3">
          <label className="block my-2 text-md font-medium text-gray-700">
            Manager Name
          </label>
          <input
            type="text"
            name="manager_name"
            placeholder="Enter Manager's name"
            value={formData.manager_name}
            onChange={handleChange}
            className={
              "appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
              (errors.manager_name ? "border-solid border-red-500" : "")
            }
          />
          {errors.manager_name && (
            <div className="text-red-500">{errors.manager_name}</div>
          )}
        </div>
        <div className="my-3">
          <label className="block my-2 text-md font-medium text-gray-700">
            Business Name
          </label>
          <input
            type="text"
            name="business_name"
            placeholder="Enter Business name"
            value={formData.business_name}
            onChange={handleChange}
            className={
              "appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
              (errors.business_name ? "border-solid border-red-500" : "")
            }
          />
          {errors.business_name && (
            <div className="text-red-500">{errors.business_name}</div>
          )}
        </div>
        <div className="my-3">
          <label className="block my-2 text-md font-medium text-gray-700">
            Company's Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            placeholder="Enter Company's Phone number"
            value={formData.phone_number}
            onChange={handleChange}
            className={
              "appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
              (errors.phone_number ? "border-solid border-red-500" : "")
            }
          />
          {errors.phone_number && (
            <div className="text-red-500">{errors.phone_number}</div>
          )}
        </div>
        <div className="my-3">
          <label className="block my-2 text-md font-medium text-gray-700">
            Company's Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Company's Email Address"
            value={formData.email}
            onChange={handleChange}
            className={
              "appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
              (errors.email ? "border-solid border-red-500" : "")
            }
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
        <div className="my-3">
          <label className="block my-2 text-md font-medium text-gray-700">
            Company's Website
          </label>
          <input
            type="text"
            name="website"
            placeholder="Enter Company's Website"
            value={formData.website}
            onChange={handleChange}
            className={
              "appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" +
              (errors.website ? "border-solid border-red-500" : "")
            }
          />
          {errors.website && (
            <div className="text-red-500">{errors.website}</div>
          )}
        </div>
        <div className="btn-array">
          {previousButton && (
            <p>
              <input
                type="submit"
                value={`Back`}
                onClick={() => dispatch(formStage(currentStage - 1))}
              />
            </p>
          )}
          <p>
            <button
              type="submit"
              className={`relative mt-9 w-full flex justify-center bg-red-600 hover:bg-red-700 py-3 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
            >
              {submitButtonText || "Submit"}
            </button>
          </p>
        </div>
      </form>
    </>
  );
}

export default CompanyInfo;
