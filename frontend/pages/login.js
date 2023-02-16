import React, { useState } from "react";
import { ThemeProvider } from "next-themes";

function Login() {
  const userType = ["Organization", "Donar", "End-User"];
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [type, setType] = useState("");
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function openModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }

  function checkForm() {
    if (email.substr(email.length - 10) !== "@gmail.com") {
      setErrorMessage(
        "Enter the valid email address for logging into the system"
      );
      openModal();
    } else if (pwd === "") {
      setErrorMessage("Enter the password for logging into the system");
      openModal();
    } else if (type === "") {
      setErrorMessage("Select the type of user for logging into the system");
      openModal();
    } else {
    }
  }

  return (
    <ThemeProvider attribute="class">
      <div className="top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex flex-row justify-center items-center">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Login yourself to our platform
            </h5>
            <div>
              <label
                htmlhtmlFor="input-group-1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
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
            <div>
              <label
                htmlhtmlFor="password"
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
            <label
              htmlhtmlFor="access"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select the access type
            </label>
            <div className="flex flex-wrap">
              <div className="flex items-center mr-4">
                <input
                  id="red-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => {
                    setType(userType[0]);
                  }}
                />
                <label
                  htmlFor="red-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Organization
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="green-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => {
                    setType(userType[1]);
                  }}
                />
                <label
                  htmlFor="green-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Donar
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="purple-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => {
                    setType(userType[2]);
                  }}
                />
                <label
                  htmlFor="purple-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  End user
                </label>
              </div>
            </div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
              onClick={() => checkForm()}
            >
              Login
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <a
                href="#"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
      {modal === true ? (
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
                onClick={() => closeModal()}
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
                  onClick={() => closeModal()}
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

export default Login;
