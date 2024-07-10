import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SiteLayout from '../../layouts/SiteLayout';
import Header from '../../components/Header/Header';
import TopBar from '../../components/Tables/TopBar/TopBar';

const TransactionsScreen = () => {
  const [dataProduk, setDataProduk] = useState([]);
  const [keyword, setKeyword] = useState('');

  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:5000/dataproduk';

  // INI UNTUK GET
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
  // INI UNTUK DELETE
  const handleDeleteClick = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token tidak ditemukan');
    }

    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus produk ini?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/dataproduk/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('deleted', response.data);

      setDataProduk((prevData) => prevData.filter((data) => data.id !== item.id));

      window.alert('Produk berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting data:', error);
      window.alert('Terjadi kesalahan saat menghapus produk!');
    }
  };

  const handleDetailClick = (item) => {
    console.log('Detail clicked for item:', item);
  };

  const navigate = useNavigate();

  const handleEditClick = (id) => {
    console.log(handleEditClick, 'hahahha');
    navigate(`/EditProduk/${id}`);
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
      />

      <div>
        {loading ? (
          <div className='spinner-wrapper'>
            <div className='spinner' />
          </div>
        ) : (
          dataProduk &&
          dataProduk.length > 0 && (
            <div>
              <table className='data-table'>
                <thead>
                  <tr>
                    <th className='center'>Nomor</th>
                    <th className='center'>Nama Produk</th>
                    <th className='center'>Kategori</th>
                    <th className='center'>Harga</th>
                    <th className='center'>Stok</th>
                    <th className='center'>Status</th>
                    <th className='center'>Tanggal Dibuat</th>
                    <th className='center'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataProduk.map((item, index) => (
                    <tr key={item.id.toString()}>
                      <td className='center'>{index + 1}</td>
                      <td className='center'>{item.namaproduk}</td>
                      <td className='center'>{item.kategori}</td>
                      <td className='center'>{item.harga}</td>
                      <td className='center'>{item.stok}</td>
                      <td className='center'>{item.status}</td>
                      <td className='center'>{new Date(item.datecreated).toLocaleString()}</td>

                      <td className='center'>
                        <div className='action-buttons'>
                          <button
                            type='button'
                            className='action-button edit'
                            onClick={() => handleEditClick(item.id)}
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
            </div>
          )
        )}
      </div>
      <style>{styles}</style>
    </SiteLayout>
  );
};

export default TransactionsScreen;
