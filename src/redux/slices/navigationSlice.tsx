import { createSlice } from '@reduxjs/toolkit';
import { PrimeIcons } from 'primereact/api';
import { MenuItem } from 'primereact/menuitem';
import { ROLE } from '../../models/user';
import { clearJwtToken } from '../../services/jwtService';

function getMenu(role: ROLE): MenuItem[] {
  if (role === ROLE.ADMIN) {
    return [
      {
        label: 'All appointments',
        icon: PrimeIcons.CALENDAR,
        url: '/login',
      },
      {
        label: 'All patients',
        icon: PrimeIcons.USERS,
        url: '/createAccount',
      },
      {
        label: 'All bills',
        icon: PrimeIcons.MONEY_BILL,
        url: '/pricing',
      },
      {
        label: 'Logout',
        icon: PrimeIcons.SIGN_OUT,
        url: '/faq',
      },
    ];
  }
  if (role === ROLE.USER) {
    return [
      {
        label: 'My appointments',
        icon: PrimeIcons.CALENDAR,
        url: '/login',
      },
      {
        label: 'My data',
        icon: PrimeIcons.USER,
        url: '/profile',
      },
      {
        label: 'My bills',
        icon: PrimeIcons.MONEY_BILL,
        url: '/pricing',
      },
      {
        label: 'Logout',
        icon: PrimeIcons.SIGN_OUT,
        url: '/',
        command: () => clearJwtToken(),
      },
    ];
  }
  if (role === ROLE.NOT_LOGGED) {
    return [
      {
        label: 'Login',
        icon: PrimeIcons.SIGN_IN,
        url: '/login',
      },
      {
        label: 'Create account',
        icon: PrimeIcons.USER_PLUS,
        url: '/register',
      },
      {
        label: 'Pricing',
        icon: PrimeIcons.DOLLAR,
        url: '/pricing',
      },
      {
        label: 'FAQ',
        icon: PrimeIcons.QUESTION_CIRCLE,
        url: '/faq',
      },
    ];
  }
  return [];
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: { items: getMenu(ROLE.NOT_LOGGED) },
  reducers: {
    setNavigationItems: (state, action) => {
      state.items = getMenu(action.payload);
    },
  },
});

export const { setNavigationItems } = navigationSlice.actions;

export default navigationSlice.reducer;
