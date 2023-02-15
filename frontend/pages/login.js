import React, { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { ConnectButton } from "web3uikit";
import { ThemeProvider } from "next-themes";
import { abi, REGISTER_CONTRACT_ADDRESS } from "../constants";

function Login() {
  const router = useRouter();
  const { chainId: chainIdHex, isWeb3Enabled, Moralis, user } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const userType = ["Organization", "Donor", "End-User"];
  const [type, setType] = useState("");

  const {
    runContractFunction: checkRegistration,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: REGISTER_CONTRACT_ADDRESS,
    functionName: "checkAlreadyRegistered",
    params: {},
  });

  const checkReg = async () => {
    const res = await checkRegistration();
    if (res) {
      router.push("/organisationList");
    } else {
      router.push("/orgRegistration");
    }
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      checkReg();
    }
  }, [isWeb3Enabled]);

  return (
    <ThemeProvider attribute="class">
      <div className="top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex flex-row justify-center items-center">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Enter the platform
          </h5>
          <div className="space-y-6">
            <div className="relative mb-6">
              <ConnectButton moralisAuth={false} />
            </div>
          </div>
          <label
            htmlFor="access"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select the access type
          </label>
          <div class="flex flex-wrap">
            <div class="flex items-center mr-4">
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
                Donor
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
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Login;
