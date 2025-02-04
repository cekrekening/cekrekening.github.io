/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import rekeningData from './data/rekening.json';

export default function Cekrek() {
  const [title] = useState(
    "CekRek - Cek Nama Rekening Bank/e-Wallet Indonesia",
  );
  const baseUrl =
    "https://cekrekening-api.belibayar.online/api/v1/account-inquiry";
  const [data, getData] = useState("");
  const [btnClass, setBtnClass] = useState("btn btn-info");
  const [btnSpinner, setBtnSpinner] = useState("hidden");
  const [formBank, setFormBank] = useState("select select-info");
  const [formNumber, setFormNumber] = useState(
    "input input-bordered input-info",
  );
  const [dataSuccess, setDataSuccess] = useState(
    "alert alert-success mt-5 hidden",
  );
  const [dataNotFound, setDataNotFound] = useState(
    "alert alert-warning mt-5 hidden",
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOptions = [
    { type: 'Bank', options: rekeningData.banks },
    { type: 'e-Wallet', options: rekeningData.ewallets }
  ].map(group => ({
    type: group.type,
    options: group.options.filter(item => 
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isDropdownOpen && !(event.target as Element).closest('.form-control')) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  function getDataAccount(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const accountBank = (
      document.getElementById("account_bank") as HTMLInputElement
    )?.value;
    const accountNumber = (
      document.getElementById("account_number") as HTMLInputElement
    )?.value;
    setBtnSpinner("loading loading-spiner");
    setBtnClass("btn btn-info btn-disabled");
    setDataSuccess("alert alert-success mt-5 hidden");
    setDataNotFound("alert alert-warning mt-5 hidden");
    if (
      accountBank === "" ||
      accountBank === null ||
      accountBank === undefined
    ) {
      getData("Account Bank is required");
      setFormBank("select select-error");
      setFormNumber("input input-bordered input-error");
      setBtnSpinner("hidden");
      setDataSuccess("alert alert-success mt-5 hidden");
      setDataNotFound("alert alert-error mt-5 mb-5 fade-in-alert");
      setBtnClass("btn btn-info");
    } else if (
      accountNumber === "" ||
      accountNumber === null ||
      accountNumber === undefined
    ) {
      getData("Account Number is required");
      setFormNumber("input input-bordered input-error");
      setFormBank("select select-info");
      setBtnSpinner("hidden");
      setDataSuccess("alert alert-success mt-5 hidden");
      setDataNotFound("alert alert-error mt-5 mb-5 fade-in-alert");
      setBtnClass("btn btn-info");
    } else {
      fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_bank: accountBank,
          account_number: accountNumber,
        }),
      })
        .then(async (response) => {
          setBtnSpinner("hidden");

          if (!response.ok) {
            const errorData = await response.json();
            const message = errorData.message;

            if (message === "Params 'account_bank' is required") {
              setFormBank("select select-warning");
              setFormNumber("input input-bordered input-info");
            } else if (message === "Params 'account_number' is required") {
              setFormNumber("input input-bordered input-warning");
              setFormBank("select select-info");
            } else {
              setFormBank("select select-info");
              setFormNumber("input input-bordered input-info");
            }

            getData(message);
            throw new Error(message);
          }
          const result = await response.json();
          setFormBank("select select-info");
          setFormNumber("input input-bordered input-info");
          getData(result.data.account_holder);
          setDataSuccess("alert alert-success mt-5 mb-5 fade-in-alert");
          setDataNotFound("alert alert-warning mt-5 hidden");
          setBtnClass("btn btn-info");
        })
        .catch((error) => {
          console.error(error);
          if (error.message.includes("required")) {
            getData(error.message);
          } else {
            getData("ACCOUNT NOT FOUND");
            setFormBank("select select-error");
            setFormNumber("input input-bordered input-error");
          }
          setBtnSpinner("hidden");
          setBtnClass("btn btn-info");
          setDataSuccess("alert alert-success mt-5 hidden");
          setDataNotFound("alert alert-warning mt-5 mb-5 fade-in-alert");
        });
    }
  }
  return (
    <>
      <h1 className="mb-1 font-semibold bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
        Cek Nama Rekening
      </h1>
      <small className="mb-10 text-red-500">
        **Hanya untuk Bank/e-Wallet Indonesia
      </small>
      <div className="form-control mt-10 mb-5 relative">
        <label className="label">
          <span className="label-text font-semibold">Bank / e-Wallet:</span>
        </label>
        <input
          type="text"
          className={formBank}
          id="account_bank"
          placeholder="Search bank or e-wallet..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
        />
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-base-100 rounded-lg shadow-lg border border-base-300 max-h-96 overflow-y-auto z-50">
            {filteredOptions.map((group) => (
              <div key={group.type}>
                {group.options.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-sm font-semibold bg-base-200">
                      -- {group.type} --
                    </div>
                    {group.options.map((item) => (
                      <div
                        key={item.value}
                        className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                        onClick={() => {
                          setSearchTerm(item.label);
                          const input = document.getElementById('account_bank') as HTMLInputElement;
                          if (input) {
                            input.value = item.value;
                          }
                          setIsDropdownOpen(false);
                        }}
                      >
                        {item.label}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
            {!filteredOptions.some(group => group.options.length > 0) && (
              <div className="px-4 py-2 text-base-content/60">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
      <div className="form-control mb-5">
        <label className="label">
          <span className="label-text font-bold">Account Number: </span>
        </label>
        <input
          type="number"
          placeholder="0123456789"
          className={formNumber}
          id="account_number"
          autoComplete="off"
        />
      </div>
      <div className={dataSuccess} id="account_found">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-semibold">{data}</span>
      </div>
      <div className={dataNotFound} id="account_not_found">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="font-semibold">{data}</span>
      </div>
      <button className={btnClass} type="submit" onClick={getDataAccount}>
        <span className={btnSpinner}></span>
        Check Name
      </button>
    </>
  );
}
