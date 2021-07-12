interface UserInterface {
  name: string;
  handle: string;
  url: string;
  profilePictureUrl: string;
}

export class User implements UserInterface {
  readonly name: string;
  readonly handle: string;
  readonly url: string;
  readonly profilePictureUrl: string;

  constructor ( { name, handle, url, profilePictureUrl }: UserInterface ) {
    this.name = name;
    this.handle = handle;
    this.url = url;
    this.profilePictureUrl = profilePictureUrl;
  }
}
