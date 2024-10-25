import axios from "axios";

const BASE_URL = "https://0xspeeeeeeed-hack.vercel.app";
const BASE_URL_DEV = "http://localhost:3000";

export const makeUrl = (url: string) => {
  const isDev = isDevMode();

  const full = (isDev ? BASE_URL_DEV : BASE_URL) + url;

  return full;
};

export const isDevMode = () => {
  return process.env.NODE_ENV === "development";
};

export const validateLum0xFrame = async (frameUrl: string) => {
  const myFid = 139139139139;

  try {
    await axios.post("https://testnetapi.lum0x.com/frame/validation", {
      farcasterFid: myFid,
      frameUrl,
    });
  } catch {}
};

export const fetchRawDataBy = async (dataurl: string) => {
  const res = await axios.get(dataurl);
  return res.data;
};
