import { useState, useEffect } from 'react';

import { fetchImages } from 'services/api.jsx';
import { Searchbar } from 'components/Searchbar/Searchbar.jsx';
import { ImageGallery } from 'components/ImageGallery/ImageGallery.jsx';
import { Loader } from 'components/Loader/Loader.jsx';
import { Button } from 'components/Button/Button.jsx';

import { Container, Notify } from 'components/App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function dataImages() {
      if (query === '') {
        return;
      }
      setIsLoading(true);
      const data = await fetchImages(query, page);

      if (page === 1) {
        setTotal(data.total);
        setImages([...data.hits]);
        setIsLoading(false);
      } else {
        setImages(images => [...images, ...data.hits]);
        setIsLoading(false);
      }
    }
    dataImages();
  }, [query, page]);

  const handleInput = e => {
    setPage(1);
    setQuery(e.searchQuery);
    setImages(null);
  };

  const loadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  return (
    <Container>
      <Container>
        <Searchbar onSubmit={handleInput} />
        {isLoading && <Loader>Loading</Loader>}

        {images && (
          <>
            {images.length === 0 && <Notify>Pictures not found</Notify>}

            <ImageGallery items={images} />

            {isLoading && <Loader>Loading</Loader>}
            {images.length > 0 && images.length < total && (
              <Button onLoadMore={loadMore} />
            )}
            {isLoading && <Loader>Loading</Loader>}

            {images.length === total && !!images.length && (
              <Notify>No more pictures</Notify>
            )}
          </>
        )}
      </Container>
    </Container>
  );
};
