import React from 'react';
import { useHistory } from 'react-router';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {

// testing only!! delete history push when done
const history = useHistory();

const marketplaceClick = () => {
  history.push('/marketplace');
}

  return (
    <div className="container">
      <p>Info Page</p>
      <button onClick={marketplaceClick}>Go to marketplace</button>
    </div>
  );
}

export default InfoPage;
