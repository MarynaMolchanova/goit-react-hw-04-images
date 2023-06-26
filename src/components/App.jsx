import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from './GlobalStyles';
import { AppBox } from './App.styled';

import { SearchBar } from 'components/SearchBar/SearchBar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchSearchImage } from '../services/Api';
import { Button } from 'components/Button/Button';

export const App = () => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (value === '') {
      return;
    }
    setIsLoading(true);
    fetchSearchImage(value, page)
      .then(response => {
        setImages(prevState => [...prevState, ...response.hits]);
        setIsLoadMore(true);
        responseFetch(response);
      })
      .catch(error => {
        toast.error('An error occurred. Please, reload the page');
      })
      .finally(() => {
        setIsLoading(false);
      });

    const responseFetch = ({ totalHits, hits }) => {
      const PER_PAGE = 12;
      if (page === 1 && totalHits !== 0) {
        toast.success(`Hooray! We found ${totalHits} images`);
        setIsLoadMore(true);
      }
      if (totalHits === 0) {
        toast.warn(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        setIsLoadMore(false);
      } else if (hits.length < PER_PAGE) {
        toast.info(
          'These are all the pictures what we found. Try something else'
        );
        setIsLoadMore(false);
      }
    };
  }, [value, page]);

  const handelForm = event => {
    if (value !== event) {
      setValue(event);
      setImages([]);
      setPage(1);
      setIsLoadMore(false);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    setIsLoadMore(false);
  };

  return (
    <AppBox>
      <GlobalStyle />
      <SearchBar onSubmit={handelForm} isSubmitting={isLoading} />
      {images.length !== 0 && <ImageGallery items={images} />}
      {isLoading && <Loader />}
      {isLoadMore && <Button onClick={loadMore} />}
      <ToastContainer autoClose={3000} />
    </AppBox>
  );
};
