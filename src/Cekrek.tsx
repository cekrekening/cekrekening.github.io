/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";

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
          <option value="harda">Allo Bank/Bank Harda Internasional</option>
          <option value="anz">ANZ Indonesia</option>
          <option value="aceh">Bank Aceh Syariah</option>
          <option value="aladin">Bank Aladin Syariah</option>
          <option value="amar">Bank Amar Indonesia</option>
          <option value="antardaerah">Bank Antardaerah</option>
          <option value="artha">Bank Artha Graha Internasional</option>
          <option value="bengkulu">Bank Bengkulu</option>
          <option value="daerah_istimewa">Bank BPD DIY</option>
          <option value="daerah_istimewa_syr">Bank BPD DIY Syariah</option>
          <option value="btpn_syr">Bank BTPN Syariah</option>
          <option value="bukopin_syr">Bank Bukopin Syariah</option>
          <option value="bumi_arta">Bank Bumi Arta</option>
          <option value="capital">Bank Capital Indonesia</option>
          <option value="bca">Bank Central Asia</option>
          <option value="ccb">Bank China Construction Bank Indonesia</option>
          <option value="cnb">Bank CNB (Centratama Nasional Bank)</option>
          <option value="danamon">Bank Danamon & Danamon Syariah</option>
          <option value="dinar">Bank Dinar Indonesia</option>
          <option value="dki">Bank DKI</option>
          <option value="dki_syr">Bank DKI Syariah</option>
          <option value="ganesha">Bank Ganesha</option>
          <option value="agris">Bank IBK Indonesia</option>
          <option value="ina_perdana">Bank Ina Perdana</option>
          <option value="index_selindo">Bank Index Selindo</option>
          <option value="artos_syr">Bank Jago Syariah</option>
          <option value="jambi">Bank Jambi</option>
          <option value="jambi_syr">Bank Jambi Syariah</option>
          <option value="jasa_jakarta">Bank Jasa Jakarta</option>
          <option value="jawa_tengah">Bank Jateng</option>
          <option value="jawa_tengah_syr">Bank Jateng Syariah</option>
          <option value="jawa_timur">Bank Jatim</option>
          <option value="jawa_timur_syr">Bank Jatim Syariah</option>
          <option value="kalimantan_barat">Bank Kalbar</option>
          <option value="kalimantan_barat_syr">Bank Kalbar Syariah</option>
          <option value="kalimantan_selatan">Bank Kalsel</option>
          <option value="kalimantan_selatan_syr">Bank Kalsel Syariah</option>
          <option value="kalimantan_tengah">Bank Kalteng</option>
          <option value="kalimantan_timur_syr">Bank Kaltim Syariah</option>
          <option value="kalimantan_timur">Bank Kaltimtara</option>
          <option value="lampung">Bank Lampung</option>
          <option value="maluku">Bank Maluku</option>
          <option value="mandiri">Bank Mandiri</option>
          <option value="mantap">Bank MANTAP (Mandiri Taspen)</option>
          <option value="maspion">Bank Maspion Indonesia</option>
          <option value="mayapada">Bank Mayapada</option>
          <option value="mayora">Bank Mayora Indonesia</option>
          <option value="mega">Bank Mega</option>
          <option value="mega_syr">Bank Mega Syariah</option>
          <option value="mestika_dharma">Bank Mestika Dharma</option>
          <option value="mizuho">Bank Mizuho Indonesia</option>
          <option value="mas">Bank Multi Arta Sentosa (Bank MAS)</option>
          <option value="mutiara">Bank Mutiara</option>
          <option value="sumatera_barat">Bank Nagari</option>
          <option value="sumatera_barat_syr">Bank Nagari Syariah</option>
          <option value="nusa_tenggara_barat">Bank NTB Syariah</option>
          <option value="nusa_tenggara_timur">Bank NTT</option>
          <option value="nusantara_parahyangan">
            Bank Nusantara Parahyangan
          </option>
          <option value="ocbc">Bank OCBC NISP</option>
          <option value="ocbc_syr">Bank OCBC NISP Syariah</option>
          <option value="america_na">Bank of America NA</option>
          <option value="boc">Bank of China (Hong Kong) Limited</option>
          <option value="india">Bank of India Indonesia</option>
          <option value="tokyo">Bank of Tokyo Mitsubishi UFJ</option>
          <option value="papua">Bank Papua</option>
          <option value="prima">Bank Prima Master</option>
          <option value="bri">Bank Rakyat Indonesia</option>
          <option value="riau_dan_kepri">Bank Riau Kepri</option>
          <option value="sahabat_sampoerna">Bank Sahabat Sampoerna</option>
          <option value="shinhan">Bank Shinhan Indonesia</option>
          <option value="sinarmas">Bank Sinarmas</option>
          <option value="sinarmas_syr">Bank Sinarmas Syariah</option>
          <option value="sulselbar">Bank Sulselbar</option>
          <option value="sulselbar_syr">Bank Sulselbar Syariah</option>
          <option value="sulawesi">Bank Sulteng</option>
          <option value="sulawesi_tenggara">Bank Sultra</option>
          <option value="sulut">Bank SulutGo</option>
          <option value="sumsel_dan_babel">Bank Sumsel Babel</option>
          <option value="sumsel_dan_babel_syr">
            Bank Sumsel Babel Syariah
          </option>
          <option value="sumut">Bank Sumut</option>
          <option value="sumut_syr">Bank Sumut Syariah</option>
          <option value="resona_perdania">Bank Resona Perdania</option>
          <option value="victoria_internasional">
            Bank Victoria International
          </option>
          <option value="victoria_syr">Bank Victoria Syariah</option>
          <option value="woori">Bank Woori Saudara</option>
          <option value="bca_syr">BCA (Bank Central Asia) Syariah</option>
          <option value="bjb">BJB</option>
          <option value="bjb_syr">BJB Syariah</option>
          <option value="royal">Blu/BCA Digital</option>
          <option value="bni">BNI (Bank Negara Indonesia)</option>
          <option value="bnp_paribas">BNP Paribas Indonesia</option>
          <option value="bali">BPD Bali</option>
          <option value="banten">BPD Banten</option>
          <option value="eka">BPR EKA (Bank Eka)</option>
          <option value="agroniaga">BRI Agroniaga</option>
          <option value="bsm">BSI (Bank Syariah Indonesia)</option>
          <option value="btn">BTN</option>
          <option value="btn_syr">BTN Syariah</option>
          <option value="tabungan_pensiunan_nasional">BTPN</option>
          <option value="cimb">CIMB Niaga & CIMB Niaga Syariah</option>
          <option value="citibank">Citibank</option>
          <option value="commonwealth">Commonwealth Bank</option>
          <option value="chinatrust">CTBC (Chinatrust) Indonesia</option>
          <option value="dbs">DBS Indonesia</option>
          <option value="hsbc">HSBC Indonesia</option>
          <option value="icbc">ICBC Indonesia</option>
          <option value="artos">Jago/Artos</option>
          <option value="hana">LINE Bank/KEB Hana</option>
          <option value="bii">Maybank Indonesia</option>
          <option value="bii_syr">Maybank Syariah</option>
          <option value="mnc_internasional">Motion/MNC Bank</option>
          <option value="muamalat">Muamalat</option>
          <option value="yudha_bakti">Neo Commerce/Yudha Bhakti</option>
          <option value="nationalnobu">Nobu (Nationalnobu) Bank</option>
          <option value="panin">Panin Bank</option>
          <option value="panin_syr">Panin Dubai Syariah</option>
          <option value="permata">Permata</option>
          <option value="permata_syr">Permata Syariah</option>
          <option value="qnb_kesawan">QNB Indonesia</option>
          <option value="rabobank">Rabobank International Indonesia</option>
          <option value="sbi_indonesia">SBI Indonesia</option>
          <option value="kesejahteraan_ekonomi">Seabank/Bank BKE</option>
          <option value="standard_chartered">Standard Chartered Bank</option>
          <option value="super_bank">Superbank</option>
          <option value="uob">TMRW/UOB</option>
          <option value="bukopin">Wokee/Bukopin</option>
          <option value="krom">Krom Bank Indonesia</option>
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
