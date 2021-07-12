import React from 'react';
import './index.scss';
import TweetPlaceholder from '../tweetPlaceholder';
import Tweet from '../tweet';

interface TweetInterface {
  id: string;
  createdAt: string;
  text: string;
  user: {
    name: string;
    handle: string;
    url: string;
    profilePictureUrl: string;
  };
  retweets: number;
  favorites: number;
  url: string;
}

interface TweetSectionProps {
  tweets: Array<TweetInterface>;
  loading: boolean;
}

const TweetSection = ( { tweets, loading }: TweetSectionProps ) => {
  return (
    <div className="TweetSection">
      {
        loading ?
          Array ( 5 ).fill ( 0 ).map ( ( _, index ) => <TweetPlaceholder key={ index } /> ) :
          tweets.map ( tweet =>
            <Tweet
              key={ tweet.id }
              photoUrl={ tweet.user.profilePictureUrl }
              text={ tweet.text }
              retweets={ tweet.retweets }
              url={ tweet.url }
              createdAt={ tweet.createdAt }
              favorites={ tweet.favorites }
              handle={ tweet.user.handle }
              profileUrl={ tweet.user.url }
              name={ tweet.user.name } />
          )
      }
    </div>
  );
};

export default React.memo ( TweetSection );