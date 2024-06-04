import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import SiteLayout from '../../layouts/SiteLayout';
import Header from '../../components/Header/Header';

const EditProduk = () => {
  const { id } = useParams();

  const [namaproduk, setNamaProduk] = useState('');
  const [kategori, setKategori] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // untuk aksi handleSubmit mengubah data
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      if (!namaproduk || !kategori || !harga || !stok || !status) {
        throw new Error('Semua field harus diisi');
      }
      const data = {
        namaproduk,
        kategori,
        harga,
        stok,
        status,
      };
      const response = await fetch(`http://localhost:5000/dataproduk/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('gagal menyimpan data');
      }
      const responseData = await response.json();
      console.log('Data berhasil diupdate:', responseData);
      window.alert('Produk berhasil diubah!');
      navigate('/transactions');
    } catch (error) {
      console.log('error', error);
    }
  };

  // UNTUK MENGAMBIL ID DATA DAN DI TAMPIL KE FORM DATA

  const handleChangeNamaProduk = (e) => {
    setNamaProduk(e.target.value);
  };

  const handleChangeKategori = (e) => {
    setKategori(e.target.value);
  };

  const handleChangeHarga = (e) => {
    setHarga(e.target.value);
  };
  const handleChangeStok = (e) => {
    setStok(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    const lihatProdukData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('token gada isi nya');
        }
        const response = await fetch(`http://localhost:5000/dataproduk/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`error status response : ${response.status}`);
        }
        const data = await response.json();
        setNamaProduk(data.namaproduk);
        setKategori(data.kategori);
        setHarga(data.harga);
        setStok(data.stok);
        setStatus(data.status);
      } catch (error) {
        console.log(`error mengambil data:`, error);
      }
    };
    lihatProdukData();
  }, [id]);
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

  return (
    <SiteLayout>
      <Header icon='add' title='Edit Data' />

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
                value={namaproduk}
                onChange={handleChangeNamaProduk}
              />

              <Form.Label style={labelStyle}>Kategori</Form.Label>
              <Form.Control
                type='text'
                name='kategori'
                placeholder='Masukkan Kategori'
                style={inputStyle}
                value={kategori}
                onChange={handleChangeKategori}
              />

              <Form.Label style={labelStyle}>Harga</Form.Label>
              <Form.Control
                type='text'
                name='harga'
                placeholder='Masukkan Total Harga'
                style={inputStyle}
                value={harga}
                onChange={handleChangeHarga}
              />

              <Form.Label style={{ ...labelStyle, marginRight: 34 }}>Total Stok</Form.Label>
              <Form.Control
                type='text'
                name='stok'
                placeholder='Masukkan Total Stok'
                style={inputStyle}
                value={stok}
                onChange={handleChangeStok}
              />

              <Form.Label style={labelStyle}>Status:</Form.Label>
              <Form.Control
                as='select'
                name='status'
                style={{ ...inputStyle, width: '285px', marginLeft: 15 }}
                value={status}
                onChange={handleChangeStatus}
              >
                <option value='Aktif'>Aktif</option>
                <option value='Non-Aktif'>Non-Aktif</option>
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
              Ubah Data
            </Button>
          </Form>
        </div>
      </div>
    </SiteLayout>
  );
};

export default EditProduk;
