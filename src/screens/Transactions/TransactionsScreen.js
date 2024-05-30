import { useState, useEffect } from 'react';
import axios from 'axios';
import SiteLayout from '../../layouts/SiteLayout';
import Header from '../../components/Header/Header';
import TopBar from '../../components/Tables/TopBar/TopBar';

const TransactionsScreen = () => {
  const [dataProduk, setDataProduk] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = 'http://localhost:5000/dataproduk';

  const getDataProduk = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const { data } = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataProduk(data);
      setTotalPages(Math.ceil(data.length / 10));
      console.log(setTotalPages);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  useEffect(() => {
    getDataProduk();
  }, []);

  const handleSearchValue = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditClick = (item) => {
    console.log('Edit clicked for item:', item);
  };

  const handleDeleteClick = (item) => {
    console.log('Delete clicked for item:', item);
  };

  const handleDetailClick = (item) => {
    console.log('Detail clicked for item:', item);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const styles = `
      .action-button {
        padding: 5px 10px;
        margin: 0 5px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
      }

      .action-button.edit {
        background-color: #4caf50; /* Green */
        color: white;
      }

      .action-button.delete {
        background-color: #f44336; /* Red */
        color: white;
      }

      .action-button.detail {
        background-color: #2196f3; /* Blue */
        color: white;
      }
    `;

  return (
    <SiteLayout>
      <Header icon='sort' title='Dashboard' />
      <TopBar
        searchValue={keyword}
        searchOnChange={handleSearchValue}
        searchSubmit={handleSearchSubmit}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {dataProduk && dataProduk.length > 0 && (
        <table className='data-table'>
          <thead>
            <tr>
              <th aria-label='empty' className='center responsive-hide'>
                Nomor
              </th>
              <th className='left responsive-hide'>Nama Produk</th>
              <th className='left responsive-hide'>Kategori</th>
              <th className='left responsive-hide'>Harga</th>
              <th className='left responsive-hide'>Stok</th>
              <th className='left responsive-hide'>Status</th>
              <th className='center'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataProduk.map((item, index) => (
              <tr key={item.id.toString()}>
                <td className='center responsive-hide'>{index + 1}</td>
                <td className='center responsive-hide'>{item.namaproduk}</td>
                <td className='center responsive-hide'>{item.kategori}</td>
                <td className='center responsive-hide'>{item.harga}</td>
                <td className='center responsive-hide'>{item.stok}</td>
                <td className='center responsive-hide'>{item.status}</td>
                <td className='center responsive-hide'>
                  <div className='action-buttons'>
                    <button
                      type='button'
                      className='action-button edit'
                      onClick={() => handleEditClick(item)}
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      type='button'
                      className='action-button delete'
                      onClick={() => handleDeleteClick(item)}
                    >
                      <span>Delete</span>
                    </button>
                    <button
                      type='button'
                      className='action-button detail'
                      onClick={() => handleDetailClick(item)}
                    >
                      <span>Detail</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style>{styles}</style>
    </SiteLayout>
  );
};

export default TransactionsScreen;
