import Twitter from 'twitter-lite';
import { Tweet } from '../dto/tweet.dto';
import { User } from '../dto/user.dto';

const twitter = new Twitter ( {
  subdomain: 'api',
  version: '1.1',
  consumer_key: process.env.twitterConsumerKey,
  consumer_secret: process.env.twitterConsumerSecret,
  access_token_key: process.env.twitterAccessTokenKey,
  access_token_secret: process.env.twitterAccessTokenSecret
} );

export async function getTop1000RecentTweets ( query: string ) {
  if ( !query ) return [];
  const tweets: Array<Tweet> = [];
  let maxId = null;

  for ( let i = 0; i < 10; i++ ) {
    const twitterRequestParams = {
      q: `${ query } -filter:retweets`,
      result_type: 'recent',
      count: 100
    };

    if ( maxId ) {
      twitterRequestParams[ 'max_id' ] = maxId;
    }

    const response = await twitter.get ( 'search/tweets', twitterRequestParams );

    if ( !response[ 'search_metadata' ]?.[ 'next_results' ] ) {
      break;
    }

    maxId = response[ 'search_metadata' ][ 'next_results' ].split ( '&' )[ 0 ].substr ( 8 );
    tweets.push ( ...response[ 'statuses' ].map ( constructTweetFromResponse ) );
  }

  tweets.sort ( sortByRetweetsFavoritesDescending );

  return tweets;
}

const sortByRetweetsFavoritesDescending = ( a: Tweet, b: Tweet ) => {
  return b.favorites + b.retweets - ( a.favorites + a.retweets );
};

const constructTweetFromResponse = ( tweetData: any ): Tweet => {
  const user = new User ( {
    name: tweetData[ 'user' ]?.[ 'name' ],
    handle: tweetData[ 'user' ]?.[ 'screen_name' ],
    url: `https://twitter.com/${ tweetData[ 'user' ]?.[ 'screen_name' ] }`,
    profilePictureUrl: tweetData[ 'user' ]?.[ 'profile_image_url' ]
  } );

  return new Tweet ( {
    user,
    retweets: tweetData[ 'retweet_count' ],
    favorites: tweetData[ 'favorite_count' ],
    createdAt: tweetData[ 'created_at' ],
    text: tweetData[ 'text' ],
    id: tweetData[ 'id' ],
    url: `https://twitter.com/${ tweetData[ 'user' ]?.[ 'screen_name' ] }/status/${ tweetData[ 'id_str' ] }`
  } );
};
