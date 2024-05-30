import { memo } from 'react';
import { Link } from 'react-router-dom';

import NavbarButton from './NavbarButton';

const Navbar = memo(() => (
  <nav className='navbar-inner no-select'>
    <div className='logo'>
      <Link to='/market'>
        <img
          style={{ borderRadius: 20, width: 120, height: 120 }}
          src={`${process.env.PUBLIC_URL}/images/belanja.png`}
          alt='KLIK BELANJA'
          draggable='false'
        />
      </Link>
    </div>
    <h3> </h3>
    <ul>
      <li>
        <NavbarButton url='/dashboard' icon='home' title='DASHBOARD' iconColor='#3498db' />
      </li>
      <li>
        <NavbarButton url='/wallet' icon='credit_card' title='Transaksi' iconColor='#2ecc71' />
      </li>
      <li>
        <NavbarButton url='/transactions' icon='shopping_cart' title='Produk' iconColor='#f39c12' />
      </li>
      <li>
        <NavbarButton url='/trading' icon='person' title='Profil' iconColor='#9b59b6' />
      </li>
      <li>
        <NavbarButton url='/exchange' icon='settings' title='Pengaturan' iconColor='#e74c3c' />
      </li>
      <li>
        <NavbarButton url='/capital' icon='equalizer' title='Laporan' iconColor='#34495e' />
      </li>
    </ul>

    {/* <h3>Diğerleri</h3>
    <ul>
      <li>
        <NavbarButton url='/members' icon='account_circle' title='Profil' />
      </li>
      <li>
        <NavbarButton url='/contacts' icon='contacts' title='Kişiler' />
      </li>
      <li>
        <NavbarButton url='/messages' icon='chat' title='Mesajlar' />
      </li>
      <li>
        <NavbarButton url='/settings' icon='settings' title='Ayarlar' />
      </li>
    </ul> */}
    <div style={{ marginTop: 100 }} className='copyright'>
      <strong>KlikBelanja </strong>
      <p>2024 &copy;KlikBelanja APPS</p>
    </div>
  </nav>
));

export default Navbar;
