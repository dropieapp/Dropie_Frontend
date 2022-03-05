import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formStage, formUpload } from "../_reducers/compnay_info.reducer";
import { userActions } from "../_actions";
import { authHeader } from "../_helpers";

function CompanyUpload({ pageTitle, submitButtonText, previousButton }) {
  // redux
  const dispatch = useDispatch();

  // get Redux store values for formupload
  const currentStage = useSelector((state) => state.company_reducer.FormStage); // for previous button

  const stateNipost = useSelector(
    (state) => state.company_reducer.FormUpload.nipost
  );
  const stateCac = useSelector((state) => state.company_reducer.FormUpload.cac);
  const stateTin = useSelector((state) => state.company_reducer.FormUpload.Tin);
  const stateCompanyLogo = useSelector(
    (state) => state.company_reducer.FormUpload.logo
  );
  const stateAddress = useSelector(
    (state) => state.company_reducer.FormUpload.address
  );
  const state = useSelector((state) => state);
  const stateOutput = `JSON Data Form-Completed: ${JSON.stringify(
    state.company_reducer,
    null,
    2
  )}`;

  const infos = state.company_reducer.FormInfo;

  const [info, setInfo] = useState();

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
  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
    // setInfo(infos);
    let formData = new FormData(e.target);
    Object.entries(infos).forEach(([key, value]) => {
      formData.append(key, value);
    });
    setInfo(formData);

    dispatch(
      formUpload({
        nipost: selectedFile1, // update form image status
        cac: selectedFile2, // update form image status
        tin: selectedFile3, // update form image status
        logo: selectedFile4, // update form image status
        address_proof: selectedFile5, // update form image status
      })
    );
    setIsSubmitted(true); // update form status to submitted
  };

  useEffect(() => {
    if (isSubmitted) {
      // update Redux Slice
      // dispatch(
      //   formStage(3) // update formStage
      // );
      // check if form status submitted
      // //  setUpload(uploads);
      dispatch(userActions.upload_companyinfo(info));
    }
  }, [isSubmitted, stateOutput]);

  return (
    <div>
      <h1>Upload files</h1>
      <form
        name="form-signup"
        id="form-signup"
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e)}
      >
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
      </form>
    </div>
  );
}

export default CompanyUpload;
// import React, { useState } from "react";

// function CompanyUpload() {
//   const [selectedFile, setSelectedFile] = useState();
//   const [isSelected, setIsSelected] = useState(false);

//   const changeHandler = (event) => {
//     setSelectedFile(event.target.files[0]);
//     setIsSelected(true);
//   };

//   // const handleSubmission = () => {
//   //   const formData = new FormData();

//   //   formData.append("File", selectedFile);

//   //   fetch("https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>", {
//   //     method: "POST",
//   //     body: formData,
//   //   })
//   //     .then((response) => response.json())
//   //     .then((result) => {
//   //       console.log("Success:", result);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error:", error);
//   //     });
//   // };

//   return (
//     <div>
//       <input type="file" name="file" onChange={changeHandler} />
//       <input type="file" name="file2" onChange={changeHandler} />
//       {isSelected ? (
//         <div>
//           <p>Filename: {selectedFile.name}</p>
//           <p>Filetype: {selectedFile.type}</p>
//           <p>Size in bytes: {selectedFile.size}</p>
//           <p>
//             lastModifiedDate:{" "}
//             {selectedFile.lastModifiedDate.toLocaleDateString()}
//           </p>
//         </div>
//       ) : (
//         <p>Select a file to show details</p>
//       )}
//       <div>{/* <button onClick={handleSubmission}>Submit</button> */}</div>
//     </div>
//   );
// }

// export default CompanyUpload;
function handleResponse(response) {
  return response.json().then((text) => {
    const data = text;
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const errors = (data && data.errors) || response.statusText;
      if (typeof errors === "object") {
        const result = Object.keys(errors).map((key) => errors[key]);
        return Promise.reject(result);
      } else {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    }

    return data;
  });
}
