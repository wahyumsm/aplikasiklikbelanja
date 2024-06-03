import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import SiteLayout from '../../layouts/SiteLayout';
import Header from '../../components/Header/Header';

const EditProduk = () => {
  const { id } = useParams();
  const [produkData, SetProdukData] = useState({
    namaproduk: '',
    kategori: '',
    harga: '',
    stok: '',
  });
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        SetProdukData(data);
      } catch (error) {
        console.log('error mengambil id data', error);
      }
    };
    fetchProductData();
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
                value={produkData.namaproduk}
              />

              <Form.Label style={labelStyle}>Kategori</Form.Label>
              <Form.Control
                type='text'
                name='kategori'
                placeholder='Masukkan Kategori'
                style={inputStyle}
              />
              <Form.Label style={labelStyle}>Harga</Form.Label>
              <Form.Control
                type='text'
                name='harga'
                placeholder='Masukkan Total Harga'
                style={inputStyle}
              />
              <Form.Label style={{ ...labelStyle, marginRight: 34 }}>Total Stok</Form.Label>
              <Form.Control
                type='text'
                name='stok'
                placeholder='Masukkan Total Stok'
                style={inputStyle}
              />

              <Form.Label style={labelStyle}>Status:</Form.Label>
              <Form.Control
                as='select'
                name='status'
                style={{ ...inputStyle, width: '285px', marginLeft: 15 }}
              >
                <option>Aktif</option>
                <option>Non-Aktif</option>
              </Form.Control>
            </Form.Group>
            <Button
              // onClick={handleSubmit}
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
