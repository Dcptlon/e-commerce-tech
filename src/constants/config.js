// esto deberia venir de un .env pero por ahora funcionara
export const API_CONFIG = {
  BASE_URL: '', 
  TIMEOUT: 5000,
  USE_MOCK: true, //switch rapido para usar mock 
};

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
};