import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../assets/quran.png";
import {
  FaChevronLeft,
  FaLocationArrow,
  FaPause,
  FaPlay,
  FaPollH
} from "react-icons/fa";
import ReactAudioPlayer from "react-audio-player";
import { Audio } from "react-loader-spinner";

const HomeDetails = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataset, setDataset] = useState({});
  const [loading, setLoading] = useState(false);

  const _getDataset = async () => {
    setLoading(true);
    const { data } = await axios.get("https://equran.id/api/v2/surat/" + id);
    if (data) {
      setDataset(data);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    _getDataset();
  }, []);

  return loading ? (
    <div className="intro d-flex justify-content-center align-items-center">
      <Audio
        width={50}
        height={50}
        color={mode === "dark" ? "#0EF6CC" : "#f65151"}
        ariaLabel="audio-loading"
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  ) : (
    <div className="container py-4 intro">
      {/* Header Detail */}
      <div
        className="d-flex align-items-center gap-2 mb-4"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <FaChevronLeft />
        <span>Kembali</span>
      </div>
      <div className="headerDetail px-md-5 px-4 py-4 rounded position-relative">
        <img
          src={Image}
          alt=""
          className="position-absolute bottom-0 end-0 image-bg"
        />
        <div className="header-title">
          <h4 className="fw-bold">{dataset?.data?.namaLatin}</h4>
          <h6>{dataset?.data?.arti}</h6>
          <hr style={{ borderBottom: "1px solid #fff" }} />
          <div className="d-flex gap-4">
            <div className="item-info d-flex align-items-center gap-2">
              <FaLocationArrow />
              <div className="">{dataset?.data?.tempatTurun}</div>
            </div>
            <div className="item-info d-flex align-items-center gap-2">
              <FaPollH />
              <div className="">{dataset?.data?.jumlahAyat} Ayat</div>
            </div>
          </div>
        </div>
      </div>
      {/* Audio Player */}
      <div className="w-100 mt-4">
        <ReactAudioPlayer
          src={dataset?.data?.audioFull["01"]}
          autoPlay={false}
          controls
          style={{ width: "100%" }}
        />
      </div>
      {/* Surah */}
      {dataset?.data?.ayat?.map((d, idx) => {
        return <SurahBox d={d} idx={idx} />;
      })}
      <div className="mt-4"></div>
    </div>
  );
};

const SurahBox = ({ d, idx }) => {
  const [isPlay, setIsPlay] = useState(false);
  const player = useRef();

  const toggleAudio = () => {
    if (isPlay) {
      player.current.audioEl.current.pause();
      setIsPlay(false);
    } else {
      player.current.audioEl.current.play();
      setIsPlay(true);
    }
  };

  return (
    <div className="surah mt-4 p-4 rounded" key={idx}>
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
        <div className="nomor-detail d-flex justify-content-center align-items-center">
          {idx + 1}
        </div>
        {isPlay ? (
          <div className="audio-player" onClick={toggleAudio}>
            <FaPause />
          </div>
        ) : (
          <div className="audio-player" onClick={toggleAudio}>
            <FaPlay />
          </div>
        )}
      </div>
      <div className="flex-grow-1 text-end header-surah-title">
        {d?.teksArab}
      </div>
      <ReactAudioPlayer
        src={d?.audio["01"]}
        autoPlay={false}
        controls={false}
        ref={player}
        onEnded={() => setIsPlay(false)}
      />
      <hr />
      <div className="teks-latin">{d?.teksLatin}</div>
      <div className="teks-indo mt-2">{d?.teksIndonesia}</div>
    </div>
  );
};

export default HomeDetails;
