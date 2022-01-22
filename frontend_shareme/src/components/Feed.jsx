import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFeed, searchPins } from '../utils/queries';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      searchPins(categoryId).then(pins=>{
        setPins(pins);
        setLoading(false);
      })
    } else {
      setLoading(true);
      getFeed().then(data=>{
        setPins(data);
        setLoading(false);
      })
    }
  }, [categoryId]);
  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }

  if(!pins?.length) return <h2>No pins available!</h2>
  return (
    <div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
};

export default Feed;