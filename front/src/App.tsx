import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.png';
import './App.scss';
import Button from './components/button';
import SearchBar from './components/searchBar';
import TweetSection from './components/tweetSection';

const App = () => {
  const [ searchText, setSearchText ] = useState ( '' );
  const [ tweets, setTweets ] = useState<Array<any>> ( [] );
  const [ loading, setLoading ] = useState ( false );
  const [ source, setSource ] = useState ( axios.CancelToken.source );
  const [ firstRun, setFirstRun ] = useState ( true );

  const fetchTweets = async () => {
    try {
      const result = await axios.get ( `http://localhost:3001/tweets`, {
        cancelToken: source.token,
        params: {
          q: searchText
        }
      } );
      setTweets ( result.data );
    } catch ( e ) {
      console.log ( 'Canceled previous request' );
    }
    setLoading ( false );
  };

  useEffect ( () => {
    setLoading ( true );
    fetchTweets ();
  }, [ source, firstRun ] );

  const onSearch = async () => {
    if ( source ) {
      source.cancel ();
    }
    setFirstRun ( false );
    setSource ( axios.CancelToken.source () );
  };

  return (
    <div className="App">
      <div className="appContainer">
        <img src={ logo } className="logo" alt="logo" />
        <SearchBar onChange={ ( e ) => setSearchText ( e.target.value ) } value={ searchText } onSubmit={ onSearch } />
        <Button text="Twiggle Search" onClick={ onSearch } />
        <div className="results">{ firstRun ? '' : `${ tweets.length } results` }</div>
        <TweetSection tweets={ tweets } loading={ loading } />
      </div>
    </div>
  );
};

export default App;
