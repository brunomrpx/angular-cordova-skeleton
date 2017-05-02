import { MenuItem } from './shared/menu/menu.service';

export const API_BASE_URL = 'http://192.168.0.97:8000/api';

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Lista de ECs', icon: 'fa-list', action: '/estabelecimento' }
];
