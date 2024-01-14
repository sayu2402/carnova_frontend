import React, { useState } from 'react';
import NavBar from '../../containers/common/NavBar';
import Footer from '../../containers/common/Footer';
import SearchArea from '../../containers/user/SearchArea';
import SearchResults from '../../containers/user/SearchResults';

function SearchResultPage() {
  const [cars, setCars] = useState([]);

  return (
    <>
      <NavBar />
      <SearchArea setCars={setCars} />
      {cars.length > 0 && <SearchResults cars={cars} />}
      <Footer />
    </>
  );
}

export default SearchResultPage;
