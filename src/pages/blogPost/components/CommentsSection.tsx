import { useState, useEffect } from 'react';

import css from './CommentsSection.module.css'


type TComments = { comment: string, userName: string };

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchCommentsMock = async() => {
  const mockData = [{ comment: `🤮🤮🤮🤮`, userName: 'Troll1979' }, { comment: '😡🤬🤬', userName: 'AnnoyedUser854'}];
  await sleep(3000);

  return mockData as TComments[];
}

export const CommentsSection = () => {
  const [loadedData, setLoadedData] = useState<TComments[]>();

  const getComments = async() => {
    const res = await fetchCommentsMock();
    setLoadedData(res);
  }

  useEffect(() => {
    console.log('CommentsSection mounted');
    getComments();
  }, []);

  return (
    <div className={css.block}>
      { !loadedData ? (<p>Loading comments data...</p>) : (
        <ul className={css.list}>
          { loadedData.map(({ userName, comment }) => (
            <li key={userName}>
              <span>{comment}</span> by {userName}
            </li>
          ))}
        </ul>
      )}
    </div>
  )

}