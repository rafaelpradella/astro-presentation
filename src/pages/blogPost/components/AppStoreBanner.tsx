import { UAParser } from "ua-parser-js";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import css from "./AppStoreBanner.module.css";

const MAIN_ICON = {
  generic: "basil:apps-outline",
  ios: "basil:app-store-solid",
  android: "basil:google-play-solid",
};
const APP_LINKS = {
  generic: "https://landingpage.test/app",
  ios: "itms://itunes.apple.com/app/apple-store/id123456",
  android: "market://launch?id=123456",
};

const checkUserAgent = () => {
  const { os } = UAParser(navigator.userAgent);

  return {
    isMobile: matchMedia("(pointer:coarse)").matches,
    isIos: os.name === "iOS",
  };
};

type TLinkUserTo = "android" | "ios" | "generic";

export const AppStoreBanner = () => {
  const [bannerMode, setBannerMode] = useState<TLinkUserTo>("generic");

  useEffect(() => {
    const { isMobile, isIos } = checkUserAgent();
    if (!isMobile) return;

    setBannerMode(isIos ? "ios" : "android");
  }, []);

  return (
    <a
      className={css.banner}
      href={APP_LINKS[bannerMode]}
      target="_blank"
      style={{
        borderRadius: "1rem",
        color: "white",
        backgroundColor: "#222",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        style={{ color: "#EEE", fontSize: "2rem" }}
        icon={MAIN_ICON[bannerMode]}
      />
      <p>Download our app</p>
    </a>
  );
};
