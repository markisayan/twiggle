import React from 'react';
import { format } from 'date-fns';
import './index.scss';

interface TweetProps {
  createdAt: string;
  photoUrl: string;
  name: string;
  text: string;
  url: string;
  handle: string;
  profileUrl: string;
  retweets: number;
  favorites: number;
}

const Tweet = ( { profileUrl, name, text, handle, url, retweets, favorites, createdAt }: TweetProps ) => {
  return (
    <div className="Tweet">
      <div className="tweetContent">
        <div className="userInfo">
          <a href={ profileUrl } target="_blank"><b className="name">{ name }</b><span
            className="handle">@{ handle }</span></a><span
          className="date">{ format ( new Date ( createdAt ), 'MMM dd, yyyy hh:mm a' ) }</span>
        </div>
        <div className="tweetText"><a href={ url } target="_blank">{ text }</a></div>
        <div className="tweetInfo">Retweets: { retweets } Favorites: { favorites }</div>
      </div>
    </div>
  );
};

export default Tweet;