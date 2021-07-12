import React, { MouseEventHandler } from 'react';
import './index.scss';


interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ( { text, onClick }: ButtonProps ) => {
  return (
    <button className="Button" onClick={ onClick }>{ text }</button>
  );
};

export default Button;