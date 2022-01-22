import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { getFeed, searchPins } from '../utils/queries';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      searchPins(searchTerm.toLowerCase()).then(data=>{
        setPins(data);
        setLoading(false);
      })
    } else {
        getFeed().then(data=>{
            setPins(data);
            setLoading(false);
        })
    }
  }, [searchTerm]);

  return (
    <div>

      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;