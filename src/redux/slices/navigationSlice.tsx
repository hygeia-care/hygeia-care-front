import { createSlice } from '@reduxjs/toolkit';
import { MenuItem } from 'primereact/menuitem';
const items: MenuItem[] | undefined = [
  {
    label: 'File',
    icon: 'pi pi-fw pi-file',
  },
  {
    label: 'Edit',
    icon: 'pi pi-fw pi-pencil',
  },
  {
    label: 'Users',
    icon: 'pi pi-fw pi-user',
  },
  {
    label: 'Events',
    icon: 'pi pi-fw pi-calendar',
  },
  {
    label: 'Quit',
    icon: 'pi pi-fw pi-power-off',
  },
];
const initialState = {
  items,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigationItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setNavigationItems } = navigationSlice.actions;

export default navigationSlice.reducer;
