import React from 'react';
import DropdownMenu from '@welld/react-components/lib/Dropdown/DropdownMenu';
import Icon from '@welld/react-components/lib/Icon';
import { logout } from '../../api/auth';
import EmployeeAvatar from './avatar.svg';

const DropdownAvatar = () => (
  <DropdownMenu
    position='right'
    renderer={(
      <span className='thumbnail-wrapper d32 circular inline'>
        <img src={EmployeeAvatar} alt='Avatar' width='32' height='32' />
      </span>
    )}
  >
    <DropdownMenu.Item onClick={logout}>
      <Icon name='power-off' className='dd-icon-right' />
      Logout
    </DropdownMenu.Item>
  </DropdownMenu>
);

export default DropdownAvatar;
