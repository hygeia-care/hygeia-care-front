// NavigationBar.js
import { Menubar } from 'primereact/menubar';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import './TopNav.css';
export default function TopNav() {
  const items = useSelector((state: RootState) => state.navigation.items);
  return (
    <div className="navigation">
      <Menubar model={items} />
    </div>
  );
}
