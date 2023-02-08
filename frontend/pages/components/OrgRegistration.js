import React, { useState } from "react";
import { ThemeProvider } from "next-themes";
import { useDropzone } from "react-dropzone";
import { upload } from "../utils/put-files";

let files = [];

function OrgRegistration() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [cnfPwd, setCnfPwd] = useState("");
  const [email, setEmail] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function selectFile(e) {
    var file = e.target.files[0];
    if (files.length >= 1) {
      files[0] = file;
    } else {
      files.push(file);
    }
    setTimeout(() => {
      console.log(files);
    }, 2000);
  }

  function openModal() {
    if (username === "") {
      setErrorMessage("Organization name is not valid");
      openErrorModal();
    } else if (phone.length !== 10) {
      setErrorMessage("Phone number should be of 10 digits");
      openErrorModal();
    } else if (email.substr(email.length - 10) !== "@gmail.com") {
      setErrorMessage("The email entered does not match the standard format");
      openErrorModal();
    } else if (pwd !== cnfPwd) {
      setErrorMessage("The password and its confirmation does not match");
      openErrorModal();
    } else if (files.length < 1) {
      setErrorMessage(
        "The documents required to verify your organization is not uploaded"
      );
      openErrorModal();
    } else {
      openConfirmModal();
    }
  }
  function closeConfirmModal() {
    setConfirmModal(false);
  }
  function openConfirmModal() {
    setConfirmModal(true);
  }
  function closeErrorModal() {
    setErrorModal(false);
  }
  function openErrorModal() {
    setErrorModal(true);
  }
  function register() {
    console.log("Register the Organization");
    setConfirmModal(false);
  }

  return (
    <ThemeProvider attribute="class">
      <form className="m-5 p-5 dark:bg-gray-900 rounded-xl">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white mb-5">
          Register your organization to our platform
        </h5>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Organization name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b9bd2"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="arcs"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <input
                type="text"
                id="website-admin"
                value={username}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="elonmusk"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Organization contact no.
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M1.061,2.917 L2.083,2.917 L2.083,4.132 L1.061,4.132 L1.061,11.967 L2.049,11.967 L2.049,13.084 L1.061,13.084 L1.061,15.881 L12.958,15.881 L12.958,0 L1.061,0 L1.061,2.917 L1.061,2.917 Z M4.445,4.392 C4.475,4.368 4.716,4.188 4.802,4.123 L4.796,4.121 C4.804,4.118 4.808,4.117 4.813,4.114 C4.818,4.108 4.834,4.097 4.837,4.094 L4.841,4.099 C4.987,4.013 5.138,3.953 5.31,3.927 C5.772,3.859 6.109,4.339 6.328,4.614 C6.547,4.886 6.851,5.32 6.814,5.617 C6.792,5.796 6.587,5.961 6.393,6.123 L6.386,6.113 C6.333,6.17 6.099,6.409 6.079,6.441 C5.972,6.619 5.849,7.022 6.021,7.326 C6.184,7.621 6.506,8.099 6.811,8.498 C7.133,8.885 7.528,9.308 7.778,9.535 C8.04,9.772 8.471,9.755 8.673,9.697 C8.712,9.687 9.027,9.5 9.068,9.48 C9.277,9.336 9.488,9.184 9.675,9.207 C9.978,9.245 10.331,9.641 10.55,9.914 C10.769,10.188 11.163,10.626 10.983,11.046 C10.914,11.205 10.814,11.332 10.69,11.451 L10.694,11.455 L10.672,11.471 C10.668,11.475 10.666,11.479 10.666,11.479 L10.662,11.48 C10.58,11.542 10.338,11.727 10.308,11.749 C9.972,11.966 9.242,12.237 8.216,11.634 C7.455,11.185 6.62,10.423 5.823,9.471 L5.819,9.474 C5.782,9.427 5.747,9.38 5.712,9.333 C5.675,9.287 5.636,9.244 5.598,9.196 L5.602,9.193 C4.854,8.206 4.304,7.228 4.046,6.397 C3.699,5.277 4.148,4.656 4.445,4.392 L4.445,4.392 Z"
                    className="si-glyph-fill"
                  ></path>
                </svg>
              </div>
              <input
                type="phone"
                id="phone"
                value={phone}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="8888888888"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="primary"
                    d="M14.79,6.11A3.17,3.17,0,0,0,15,5,3,3,0,0,0,9,5a3.17,3.17,0,0,0,.21,1.11A3,3,0,1,0,11,11.82V15H10a1,1,0,0,0,0,2h1v2H10a1,1,0,0,0,0,2h1a1,1,0,0,0,2,0V11.82a3,3,0,1,0,1.79-5.71ZM12,4a1,1,0,1,1-1,1A1,1,0,0,1,12,4Zm-2,6a1,1,0,1,1,1-1A1,1,0,0,1,10,10Zm4,0a1,1,0,1,1,1-1A1,1,0,0,1,14,10Z"
                  ></path>
                </svg>
              </div>
              <input
                type="password"
                id="password"
                value={pwd}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                placeholder="•••••••••"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="primary"
                    d="M14.79,6.11A3.17,3.17,0,0,0,15,5,3,3,0,0,0,9,5a3.17,3.17,0,0,0,.21,1.11A3,3,0,1,0,11,11.82V15H10a1,1,0,0,0,0,2h1v2H10a1,1,0,0,0,0,2h1a1,1,0,0,0,2,0V11.82a3,3,0,1,0,1.79-5.71ZM12,4a1,1,0,1,1-1,1A1,1,0,0,1,12,4Zm-2,6a1,1,0,1,1,1-1A1,1,0,0,1,10,10Zm4,0a1,1,0,1,1,1-1A1,1,0,0,1,14,10Z"
                  ></path>
                </svg>
              </div>
              <input
                type="password"
                id="confirm_password"
                value={cnfPwd}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setCnfPwd(e.target.value);
                }}
                placeholder="•••••••••"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="input-group-1"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Organization email
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="input-group-1"
              value={email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="charitable@gmail.com"
            />
          </div>
        </div>
        <div {...getRootProps({ className: "dropzone" })}>
          <div className="flex items-center justify-center w-full my-8">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-35 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> the
                  Memorandom of Association (MoA) of the organization
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  The files should be of PDF format ( size less than 100 KB )
                </p>
              </div>
              <input
                id="dropzone-file"
                type="application/pdf"
                className="hidden"
                {...getInputProps()}
                onChange={selectFile}
              />
            </label>
          </div>
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          onClick={() => {
            openModal();
          }}
        >
          Register
        </button>
      </form>
      {confirmModal === true ? (
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex flex-row justify-center items-center bg-black/50 "
        >
          <div className="relative w-full h-full max-w-2xl md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Terms of Service
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                  onClick={() => closeConfirmModal()}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Our website is working on the concept of decentralized system
                  which works on blockchain. So once you register, you cannot
                  change any of the details you have entered this time.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Once registered, your details cannot be changed. Please ensure
                  that the information you provide is accurate and up-to-date
                  before submitting your registration. Please be advised that
                  once your registration is complete, the information you
                  provide cannot be modified. Please make sure all the details
                  are correct before proceeding.
                </p>
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => register()}
                >
                  I accept
                </button>
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => closeConfirmModal()}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {errorModal === true ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex flex-row justify-center items-center bg-black/50"
        >
          <div className="relative w-full h-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => closeErrorModal()}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p>
                  {" "}
                  There is some issue in the registration form you have filled
                  for your organization. Kindly check the form correctly before
                  submitting it.
                </p>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {errorMessage}
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={() => closeErrorModal()}
                >
                  Correct it
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </ThemeProvider>
  );
}

export default OrgRegistration;
