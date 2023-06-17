import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import imageDark from "../assets/bismillahh.png";
import imageLight from "../assets/bismillah.png";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";

const Home = ({ mode }) => {
  const navigate = useNavigate();
  const [dataset, setDataset] = useState({});
  const [search, setSearch] = useState("");
  const el = useRef(null);

  const _getDataset = async () => {
    const { data, error } = await axios.get("https://equran.id/api/v2/surat");
    if (data) {
      setDataset(data);
    }
  };

  useEffect(() => {
    _getDataset();
  }, []);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Al-Fatihah", "Yasin", "Al-Mulk", "Al-Waqi'ah"], // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 150,
      backSpeed: 100,
      backDelay: 150,
      loop: true,
      showCursor: true,
      cursorChar: "|"
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    // Intro
    <>
      <div className="container">
        <div className="image w-100 d-flex justify-content-center my-5">
          <img
            src={mode == "dark" ? imageLight : imageDark}
            alt="tes"
            className="image"
          />
        </div>
        <div className="d-md-flex justify-content-center mt-5 mb-4">
          <h4 className="text-start fw-bold">
            Ingin membaca apa hari ini? <span ref={el} className="typed"></span>
          </h4>
        </div>
        <div className="position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Cari surat ..."
            onChange={(e) => setSearch(e?.target?.value)}
          />
          <span className="position-absolute top-50 end-0 translate-middle-y me-2">
            🔍
          </span>
        </div>
      </div>
      {/* End Intro */}

      {/* List Surat */}
      <div class="container mt-5 pb-5 intro" id="surat">
        <h3 className="mb-3">Surah</h3>
        <div className="row gy-4">
          {dataset?.data
            ?.filter((item) =>
              search !== ""
                ? item?.namaLatin
                    ?.toLowerCase()
                    ?.replace(/[^\w\s\']|_/g, "")
                    ?.replace(/\s+/g, "")
                    ?.includes(
                      search
                        ?.toLowerCase()
                        ?.replace(/[^\w\s\']|_/g, "")
                        ?.replace(/\s+/g, "")
                    )
                : item
            )
            ?.map((d) => {
              return <SurahBox d={d} navigate={navigate} />;
            })}
        </div>
      </div>
      {/* // End List Surat */}
    </>
  );
};

const SurahBox = ({ d, navigate }) => {
  const [hover, setHover] = useState(false);

  return (
    <div class="col-lg-4 col-md-6 d-flex align-items-stretch zoom">
      <div
        class="p-4 card w-100"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => navigate(`/${d?.nomor}`)}
      >
        <div class="d-flex align-items-center justify-content-center gap-3">
          <div
            className={`d-flex justify-content-center align-items-center nomor ${
              hover ? "hover" : ""
            }`}
          >
            {d?.nomor}
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <span className="title">
              {d?.namaLatin} - {d?.tempatTurun}
            </span>
            <span className="subtitle">{d?.arti}</span>
          </div>
          <div class="fw-semibold text-end subtitle">{d?.nama}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
