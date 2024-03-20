import { type FC } from "react";
import { Icon } from "@iconify/react";

import css from "./SharePost.module.css";

type TShareProps = { postUrl: string };

export const SharePost: FC<TShareProps> = ({ postUrl }) => {
  return (
    <ul className={css.block}>
      <li>
        <button className={css.button} aria-label="Share on Whatsapp">
          <Icon className={css.icon} icon="basil:whatsapp-outline" />
        </button>
      </li>
      <li>
        <button className={css.button} aria-label="Share on Twitter">
          <Icon className={css.icon} icon="basil:twitter-outline" />
        </button>
      </li>
      <li>
        <button className={css.button} aria-label="Share Post">
          <Icon className={css.icon} icon="basil:share-outline" />
        </button>
      </li>
    </ul>
  );
};
