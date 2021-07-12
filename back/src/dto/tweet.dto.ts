import { User } from './user.dto';

interface TweetInterface {
  id: string;
  createdAt: string;
  text: string;
  user: User;
  retweets: number;
  favorites: number;
  url: string;
}

export class Tweet implements TweetInterface {
  readonly id: string;
  readonly createdAt: string;
  readonly text: string;
  readonly user: User;
  readonly retweets: number;
  readonly favorites: number;
  readonly url: string;

  constructor ( {
                  createdAt,
                  text,
                  user,
                  retweets,
                  favorites,
                  url,
                  id
                }: TweetInterface ) {
    this.id = id;
    this.createdAt = createdAt;
    this.text = text;
    this.user = user;
    this.retweets = retweets;
    this.favorites = favorites;
    this.url = url;
  }
}
