import PropTypes from 'prop-types';
import { useState } from 'react';
import {ReactComponent as Loop} from '../../svg/loop.svg'
import {SearchbarHeader, SearchForm, SearchBtn, SearchInput} from './SearchbarStyled';

export default function Searchbar ({ onSubmit }) {
const [name, setName] = useState("");


  const handleChange = e => {
    const {value} = e.target;
    setName(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchBtn type="submit" aria-label="Search loop">
          <Loop />
          </SearchBtn>

          <SearchInput
            onChange={handleChange}
            name="name"
            type="text"
            value={name}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};