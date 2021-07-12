import dotenv from 'dotenv';

dotenv.config ();

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as twitterController from './controllers/twitter.controller';
import cors from 'cors';

const app = express ();

app.use ( cors () );
app.use ( logger ( 'dev' ) );
app.use ( express.json () );
app.use ( express.urlencoded ( { extended: false } ) );
app.use ( cookieParser () );
app.use ( express.static ( path.join ( __dirname, 'public' ) ) );

app.use ( '/tweets', twitterController.getTweets );

app.listen ( process.env.PORT, () => {
  console.log ( `Listening to port ${ process.env.PORT }` );
} );
