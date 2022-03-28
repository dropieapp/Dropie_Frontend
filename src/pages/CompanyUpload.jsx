import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formStage, formUpload } from "../_reducers/compnay_info.reducer";
import { userActions } from "../_actions";
import { authHeader } from "../_helpers";
import { onboarding } from "../actions/onboard";
import { Link } from "react-router-dom";

function CompanyUpload({ pageTitle, submitButtonText, previousButton }) {
  // redux
  const dispatch = useDispatch();

  // get Redux store values for formupload
  const currentStage = useSelector((state) => state.company_reducer.FormStage); // for previous button
  const infos = useSelector((state) => state.company_reducer.FormInfo);

  const [info, setInfo] = useState();
  const { message } = useSelector((state) => state.message);

  // from redux intial state
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);

  const uploadScreenshotFile1 = (event) => {
    setSelectedFile1(event.target.files[0]);
  };
  const uploadScreenshotFile2 = (event) => {
    setSelectedFile2(event.target.files[0]);
  };
  const uploadScreenshotFile3 = (event) => {
    setSelectedFile3(event.target.files[0]);
  };
  const uploadScreenshotFile4 = (event) => {
    setSelectedFile4(event.target.files[0]);
  };
  const uploadScreenshotFile5 = (event) => {
    setSelectedFile5(event.target.files[0]);
  };

  // onsubmit
  const [isSubmitted, setIsSubmitted] = useState(false); // state for form status
  const [successful, setSuccessful] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
    // setInfo(infos);
    const formData = new FormData();
    Object.entries(infos).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("nipost", selectedFile1);
    formData.append("cac", selectedFile2);
    formData.append("tin", selectedFile3);
    formData.append("logo", selectedFile4);
    formData.append("address_proof", selectedFile5);
    setInfo(formData);

    dispatch(
      formUpload({
        nipost: formData.get("nipost"), // update form image status
        cac: selectedFile2, // update form image status
        tin: selectedFile3, // update form image status
        logo: selectedFile4, // update form image status
        address_proof: selectedFile5, // update form image status
      })
    );
    setIsSubmitted(true); // update form status to submitted
    setSuccessful(false);
  };

  useEffect(() => {
    if (isSubmitted) {
      dispatch(onboarding(info))
        .then(() => {
          setSuccessful(true);
          setIsSubmitted(false);
        })
        .catch(() => {
          setSuccessful(false);
          setIsSubmitted(false);
        });
    }
  }, [isSubmitted]);

  return (
    <div>
      <h1>Upload files</h1>
      <form
        name="form-signup"
        id="form-signup"
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e)}
      >
      

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
            {successful ? (
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  window.location.reload();
                }}
              >
                <button
                  className={`relative w-full flex justify-center bg-red-600 hover:bg-red-700 py-2 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
                >
                  Verify Otp
                </button>
              </Link>
            ) : null}
          </div>
        )}
        {!successful && (
          <div>
            <div className="my-3">
              <label className="block my-2 text-md font-medium text-gray-700">
                Upload NIPOST Certificate
              </label>
              <input
                type="file"
                name="nipost"
                accept="image/*"
                className={
                  "appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                }
                onChange={uploadScreenshotFile1}
              />
            </div>
            <div className="my-3">
              <label className="block my-2 text-md font-medium text-gray-700">
                Upload CAC Certificate
              </label>
              <input
                type="file"
                name="cac"
                accept="image/*"
                className={
                  "appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                }
                onChange={uploadScreenshotFile2}
              />
            </div>
            <div className="my-3">
              <label className="block my-2 text-md font-medium text-gray-700">
                Upload TIN Certificate
              </label>
              <input
                type="file"
                name="tin"
                accept="image/*"
                className={
                  "appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                }
                onChange={uploadScreenshotFile3}
              />
            </div>
            <div className="my-3">
              <label className="block my-2 text-md font-medium text-gray-700">
                Upload Company Logo
              </label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                className={
                  "appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                }
                onChange={uploadScreenshotFile4}
              />
            </div>
            <div className="my-3">
              <label className="block my-2 text-md font-medium text-gray-700">
                Upload Proof of Address
              </label>
              <input
                type="file"
                name="address_proof"
                accept="image/*"
                className={
                  "appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                }
                onChange={uploadScreenshotFile5}
              />
            </div>
            <small>NOTE: All Fields are required</small>
            <div className="btn-array">
              {previousButton && (
                <p>
                  <button
                    type="submit"
                    onClick={() => dispatch(formStage(currentStage - 1))}
                    className={`relative mt-9 w-full flex justify-center bg-gray-300 hover:bg-gray-500 py-3 px-4 text-sm text-white rounded-md border border-green focus:outline-none focus:border-green-dark`}
                  >
                    Back
                  </button>
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
          </div>
        )}
      </form>
    </div>
  );
}

export default CompanyUpload;
