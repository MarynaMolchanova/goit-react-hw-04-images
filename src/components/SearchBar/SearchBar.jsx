import { useState } from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar, SearchForm, Button, Input } from './SearchBar.styled';

export const SearchBar = ({ onSubmit, isSubmitting }) => {
  const [value, setValue] = useState('');

  const handelInputChange = event => {
    setValue(event.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      return toast.error('Please, enter the request!');
    }
    onSubmit(value.trim());
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleFormSubmit}>
        <Button type="submit" disabled={isSubmitting}>
          <RxMagnifyingGlass />
        </Button>
        <Input
          type="text"
          onChange={handelInputChange}
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbar>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
