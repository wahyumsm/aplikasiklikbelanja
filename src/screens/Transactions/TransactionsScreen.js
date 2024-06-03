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
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:5000/dataproduk';

  const getDataProduk = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      setLoading(true);
      setTimeout(async () => {
        const { data } = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataProduk(data);
        setTotalPages(Math.ceil(data.length / 10));
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
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
        background-color: #4caf50; 
        color: white;
      }

      .action-button.delete {
        background-color: #f44336; 
        color: white;
      }

      .action-button.detail {
        background-color: #2196f3; 
        color: white;
      }

      .spinner-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

.spinner {
  border: 4px solid rgba(255, 224, 102, 0.1); 
  border-left-color: #FBC02D; 
  border-radius: 50%;
  width: 100px; 
  height: 100px; 
  animation: spin 1s linear infinite;
}



      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

  return (
    <SiteLayout>
      <Header icon='sort' title='Tabel Data Produk' />
      <TopBar
        searchValue={keyword}
        searchOnChange={handleSearchValue}
        searchSubmit={handleSearchSubmit}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {loading ? (
        <div className='spinner-wrapper'>
          <div className='spinner' />
        </div>
      ) : (
        dataProduk &&
        dataProduk.length > 0 && (
          <table className='data-table'>
            <thead>
              <tr>
                <th aria-label='empty' className='center responsive-hide'>
                  Nomor
                </th>
                <th className='center responsive-hide'>Nama Produk</th>
                <th className='center responsive-hide'>Kategori</th>
                <th className='center responsive-hide'>Harga</th>
                <th className='center responsive-hide'>Stok</th>
                <th className='center responsive-hide'>Status</th>
                <th className='center responsive-hide'>Tanggal Dibuat</th>
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
                    {new Date(item.datecreated).toLocaleString()}
                  </td>

                  <td className='center responsive-hide'>
                    <div className='action-buttons'>
                      <button
                        type='button' // Tambahkan type='button'
                        className='action-button edit'
                        onClick={() => handleEditClick(item)}
                      >
                        <span>Edit</span>
                      </button>
                      <button
                        type='button' // Tambahkan type='button'
                        className='action-button delete'
                        onClick={() => handleDeleteClick(item)}
                      >
                        <span>Delete</span>
                      </button>
                      <button
                        type='button' // Tambahkan type='button'
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
        )
      )}
      <style>{styles}</style>
    </SiteLayout>
  );
};

export default TransactionsScreen;
