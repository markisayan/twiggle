import * as twitterService from '../externalServices/twitter.service';

export async function getTweets ( req, res ) {
  const query = req.query[ 'q' ];
  const result = await twitterService.getTop1000RecentTweets ( query );
  res.json ( result );
}
