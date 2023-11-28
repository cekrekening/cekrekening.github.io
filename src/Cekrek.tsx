/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";

export default function Cekrek() {
  const [title] = useState(
    "CekRek - Cek Nama Rekening Bank/e-Wallet Indonesia"
  );
  const baseUrl = "https://netovas.com/api/cekrek/v1/account-inquiry";
  const [data, getData] = useState("");
  const [btnClass, setBtnClass] = useState("btn btn-info");
  const [btnSpinner, setBtnSpinner] = useState("hidden");
  const [formBank, setFormBank] = useState("select select-info");
  const [formNumber, setFormNumber] = useState(
    "input input-bordered input-info"
  );
  const [dataSuccess, setDataSuccess] = useState(
    "alert alert-success mt-5 hidden"
  );
  const [dataNotFound, setDataNotFound] = useState(
    "alert alert-warning mt-5 hidden"
  );
  useEffect(() => {
    document.title = title;
  }, [title]);
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
      axios
        .post(
          baseUrl,
          {
            account_bank: accountBank,
            account_number: accountNumber,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          setFormBank("select select-info");
          setFormNumber("input input-bordered input-info");
          getData(response.data.data.account_holder);
          setBtnSpinner("hidden");
          setDataSuccess("alert alert-success mt-5 mb-5 fade-in-alert");
          setDataNotFound("alert alert-warning mt-5 hidden");
          setDataNotFound("alert alert-error mt-5 hidden");
          setBtnClass("btn btn-info");
        })
        .catch((error) => {
          const message = error.response.data.message;
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
          setFormBank("select select-info");
          setFormNumber("input input-bordered input-info");
          getData(error.response.data.message);
          setBtnSpinner("hidden");
          setDataNotFound("alert alert-error mt-5 hidden");
          setDataSuccess("alert alert-success mt-5 hidden");
          setDataNotFound("alert alert-warning mt-5 mb-5 fade-in-alert");
          setBtnClass("btn btn-info");
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
      <div className="form-control mt-10 mb-5">
        <label className="label">
          <span className="label-text font-semibold">Bank / e-Wallet:</span>
        </label>
        <select
          className={formBank}
          //defaultValue={"selected"}
          id="account_bank"
        >
          <option value="" selected disabled>
            {"-- "} Bank {" --"}
          </option>
          <option value="bca">BCA</option>
          <option value="mandiri">Mandiri</option>
          <option value="bni">BNI</option>
          <option value="bri">BRI</option>
          <option value="bsm">BSI (Bank Syariah Indonesia)</option>
          <option value="bca_syr">BCA Syariah</option>
          <option value="btn">BTN / BTN Syariah</option>
          <option value="cimb">CIMB Niaga / CIMB Niaga Syariah</option>
          <option value="dbs">DBS Indonesia</option>
          <option value="btpn">BTPN / Jenius / BPTN Wow!</option>
          <option value="artos">Bank Jago</option>
          <option value="kesejahteraan_ekonomi">Seabank/Bank BKE</option>
          <option value="danamon">Danamon / Danamon Syariah</option>
          <option value="muamalat">Muamalat</option>
          <option value="hana">LINE Bank / KEB Hana</option>
          <option value="royal">blu by BCA Digital</option>
          <option value="nationalnobu">Nobu (Nationalnobu) Bank</option>
          <option value="permata">Bank Permata</option>
          <option value="mega">Bank Mega</option>
          <option value="bii">Maybank</option>
          <option value="panin">Panin Bank</option>
          <option value="uob">TMRW / UOB Indonesia</option>
          <option value="hsbc">HSBC Indonesia</option>
          <option value="citibank">Citibank Indonesia</option>
          <option value="commonwealth">Commonwealth Bank</option>
          <option disabled>
            {"-- "} e-Wallet {" --"}
          </option>
          <option value="ovo">OVO</option>
          <option value="dana">DANA</option>
          <option value="linkaja">LinkAja</option>
          <option value="gopay">GoPay</option>
          <option value="shopeepay">ShopeePay</option>
        </select>
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
