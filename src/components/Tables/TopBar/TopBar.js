import { memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const TopBar = memo(({ searchValue, searchOnChange, searchSubmit }) => {
  const navigate = useNavigate();

  const handleTambahProduk = () => {
    navigate('/TambahProduk');
  };

  return (
    <div className='top-buttons flex flex-destroy flex-center flex-space-between'>
      <div>
        <div className='top-search no-select nowrap'>
          <form onSubmit={searchSubmit} noValidate>
            <input
              type='text'
              id='search'
              name='search'
              autoComplete='off'
              placeholder='Cari Produk'
              onChange={searchOnChange}
              value={searchValue}
            />
            <button type='submit' className='pointer'>
              <i className='material-icons'>search</i>
            </button>
          </form>
        </div>
      </div>
      <div>
        <button type='button' className='button button-white button-large'>
          <i className='material-icons button-icon-left'>event</i>
          Filter
          <i className='material-icons button-icon-right'>keyboard_arrow_down</i>
        </button>
        <button
          type='button'
          className='button button-purple button-large'
          onClick={handleTambahProduk}
        >
          <i className='material-icons button-icon-left'>add</i>
          Tambah Produk
        </button>
      </div>
    </div>
  );
});

TopBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  searchSubmit: PropTypes.func.isRequired,
  searchOnChange: PropTypes.func.isRequired,
};

export default TopBar;
