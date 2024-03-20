import { UAParser } from "ua-parser-js";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import css from "./AppStoreBanner.module.css";

const APP_LINKS = {
  desktop: "https://www.apple.com/pt/app-store/",
  iOS: "itms://itunes.apple.com/app/apple-store/id123456",
  android: "market://launch?id=123456",
};

const checkUserAgent = () => {
  const { device } = UAParser(navigator.userAgent);

  return { isMobile: device.os.is("mobile"), isIos: device.os.is("iOS") };
};

export const AppStoreBanner = () => {
  const [appLink, setAppLink] = useState(APP_LINKS.desktop);

  useEffect(() => {
    console.log(`HYDRATED APPSTOREBANNER`);
    const { isMobile, isIos } = checkUserAgent();
    if (!isMobile) return setAppLink("INVALID_LINK");

    isIos ? setAppLink(APP_LINKS.iOS) : setAppLink(APP_LINKS.android);
  }, []);

  return (
    <a
      className={css.banner}
      href={appLink}
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
        icon="simple-icons:appstore"
        role="presentation"
        style={{ fontSize: "2rem" }}
      />
      <p>Download our app</p>
    </a>
  );
};
