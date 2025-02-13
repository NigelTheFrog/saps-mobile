import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import request from './utils/request';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'printer'],
  blacklist: [],
};

const customerInitial = {
  CustomerName: '',
  Phone: '',
  Address: '',
  CustomerCode: '',
  KodeSales: '',
  nik: '',
  isExist: null,
  type: '', // individual | institution
  city_id: null, // number
  industry_id: null, // number
  marketer_id: null, // number
};

const authJustFine = {
  is_error: false,
  error_msg: '',
};

const authInitialState = {
  token: null,
  store_name: 'Toko Sutindo',
  ...authJustFine,
};

const systemInitialState = {
  host: 'http://192.168.88.56/saps-sso-bpn/public',
};

export const system = createSlice({
  name: 'system',
  initialState: systemInitialState,
  reducers: {
    reset: state => systemInitialState,
    setHost: (state, { payload }) => ({ ...state, host: payload }),
  },
});

export const auth = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    reset: state => ({
      token: null,
      store_name: 'Toko Sutindo',
      ...authJustFine,
    }),
    set: (state, { payload }) => ({ ...payload, ...authJustFine }),
    resetWithError: (state, { payload }) => ({
      ...authInitialState,
      is_error: true,
      error_msg: payload,
    }),
  },
});

export const login = createAsyncThunk(
  'user/LOGIN',
  async (user, { dispatch }) => {
    try {
      const response = await request.post('/login', user);
      if (!response) {
        throw new Error('Login failed');
      }
      if (!response.ok) {
        throw new Error('Username atau password salah');
      }

      const body = await response.json();
      dispatch(
        auth.actions.set({
          token: body.access_token,
          store_name: body.store_name ?? '',
          store_id: body.store_id ?? 0,
        }),
      );

      return body;
    } catch (error) {
      dispatch(auth.actions.resetWithError(error.message));
    }
  },
);

export const customer = createSlice({
  name: 'customer',
  initialState: customerInitial,
  reducers: {
    reset: state => customerInitial,
    setPhoneName: (state, { payload }) => ({
      ...state,
      CustomerName: payload.CustomerName,
      Address: payload.Address,
      Phone: payload.Phone,
      CustomerCode: payload.CustomerCode,
      KodeSales: payload.KodeSales,
      nik: payload.nik      
    }),
    setExist: (state, { payload }) => ({ ...state, isExist: payload }),
    setType: (state, { payload }) => ({ ...state, type: payload }),
    setIndustry: (state, { payload }) => ({ ...state, industry_id: payload }),
    setCity: (state, { payload }) => ({ ...state, city_id: payload }),
    setMarketer: (state, { payload }) => ({ ...state, marketer_id: payload }),
  },
});

export const printer = createSlice({
  name: 'printer',
  initialState: {
    device_name: '',
    inner_mac_address: '',
  },
  reducers: {
    set: (state, action) => action.payload,
    reset: state => initialState,
  },
});

const rootReducer = combineReducers({
  auth: auth.reducer,
  customer: customer.reducer,
  printer: printer.reducer,
  system: system.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

// server {
//   listen 80;
//   listen [::]:80;
//   server_name aassby.sos.local.sutindo.net;
//   root /var/www/html/sos-aas/public;

//   add_header X-Frame-Options "SAMEORIGIN";
//   add_header X-Content-Type-Options "nosniff";

//   index index.php;

//   charset utf-8;

//   location / {
//       try_files $uri $uri/ /index.php?$query_string;
//   }

//   location = /favicon.ico { access_log off; log_not_found off; }
//   location = /robots.txt  { access_log off; log_not_found off; }

//   error_page 404 /index.php;

//   location ~ \.php$ {
//       fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
//       fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
//       include fastcgi_params;
//   }

//   location ~ /\.(?!well-known).* {
//       deny all;
//   }
// }