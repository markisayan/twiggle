import React, { ChangeEventHandler, KeyboardEvent } from 'react';
import './index.scss';

interface SearchBarProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: Function;
}

const SearchBar = ( { value, onChange, onSubmit }: SearchBarProps ) => {
  const onKeyDown = ( e: KeyboardEvent<HTMLInputElement> ) => {
    if ( e.key === 'Enter' ) {
      onSubmit ();
    }
  };
  return (
    <div className="Search">
      <div className="inner">
        <input type="text" value={ value } onChange={ onChange } onKeyDown={ onKeyDown } />
      </div>
    </div>
  );
};


export default SearchBar;