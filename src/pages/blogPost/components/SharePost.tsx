import { type FC } from 'react';

type TShareProps = { postUrl: string };

export const SharePost: FC<TShareProps> = ({ postUrl }) => {
  return <div>SharePost { postUrl}</div>
}