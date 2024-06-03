import axios from 'axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import SiteLayout from '../../layouts/SiteLayout';
import Header from '../../components/Header/Header';

const TambahProduk = () => {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    namaproduk: '',
    kategori: '',
    harga: '',
    stok: '',
  });

  const handleChangeSelected = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };

  const labelStyle = { marginRight: 9, marginLeft: 5 };
  const inputStyle = {
    border: '1px solid #666',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '14px',
    marginBottom: '1rem',
    marginTop: '10px',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const dataToSend = { ...formData, status };

    console.log(dataToSend);
    try {
      await axios.post('http://localhost:5000/dataproduk', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Data berhasil ditambahkan');
      // Arahkan ke halaman transaksi setelah berhasil menambahkan data
      window.location.href = 'http://localhost:3000/#/transactions';
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menambahkan data');
    }
  };

  return (
    <SiteLayout>
      <Header icon='add' title='Tambah Data' />

      <div className='container'>
        <div className='box'>
          <Form>
            <Form.Group controlId='exampleForm.ControlInput1' style={{ alignItems: 'center' }}>
              <Form.Label style={labelStyle}>Nama Produk</Form.Label>
              <Form.Control
                type='text'
                name='namaproduk'
                placeholder='Masukkan Nama Produk'
                style={inputStyle}
                onChange={handleChange}
              />

              <Form.Label style={labelStyle}>Kategori</Form.Label>
              <Form.Control
                type='text'
                name='kategori'
                placeholder='Masukkan Kategori'
                style={inputStyle}
                onChange={handleChange}
              />
              <Form.Label style={labelStyle}>Harga</Form.Label>
              <Form.Control
                type='text'
                name='harga'
                placeholder='Masukkan Total Harga'
                style={inputStyle}
                onChange={handleChange}
              />
              <Form.Label style={{ ...labelStyle, marginRight: 34 }}>Total Stok</Form.Label>
              <Form.Control
                type='text'
                name='stok'
                placeholder='Masukkan Total Stok'
                style={inputStyle}
                onChange={handleChange}
              />

              <Form.Label style={labelStyle}>Status:</Form.Label>
              <Form.Control
                as='select'
                name='status'
                style={{ ...inputStyle, width: '285px', marginLeft: 15 }}
                onChange={handleChangeSelected}
                value={status}
              >
                <option>Aktif</option>
                <option>Non-Aktif</option>
              </Form.Control>
            </Form.Group>
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: '#1baa75',
                fontSize: '16px',
                padding: '10px 20px',
                borderRadius: '4px',
                color: 'white',
                fontWeight: 'bold',
                marginLeft: 930,
                marginBottom: '1rem',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer',
                outline: 'none',
              }}
              type='button'
            >
              Tambah Data
            </Button>
          </Form>
        </div>
      </div>
    </SiteLayout>
  );
};

export default TambahProduk;
