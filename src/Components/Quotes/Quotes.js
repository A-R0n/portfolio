import React, { Component } from 'react';
import './Quotes.scss';

class Quotes extends Component {
  render() {
    return (
      <div className='Display_Quotes'>
        <p id="line1">[VERSE: 3 - JAY-Z]</p>
        <p id="line2">"Time don't go back, it goes forward.</p>
        <p id="line3"> Can't run from the pain, go towards it.</p>
        <p id="line4"> Some things can't be explained, what caused it?</p>
        <p id="line5"> Such a beautiful soul, I'm sure of it!"</p>
      </div>
    );
  }
}

export default Quotes;
