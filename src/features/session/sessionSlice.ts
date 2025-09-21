import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signInUserWithEmailAndPassword,
         createUserWithEmailAndPassword,
         signOutUserWithAuthHeaders,
         validateAuthHeader} from '../../app/api/sessionAPI';
import * as REQUEST_REQUIREMENTS from '../../app/api/requestRequirements';
import { AuthHeaders} from '../../app/#interfaces/interfaces';

export interface User {
  email?: string;
  provider?: string;
  uid?: string;
  id?: number;
  allowPasswordChange?: boolean;
  name?: string;
  profileImage?: string;
  nickname?: string;
  role?: string;
}

export interface UserSignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserSignInData {
  email: string;
  password: string;
}

export interface UserSignOutData {
  accept: string;
  accessToken: string;
  client: string;
  uid: string;
}

export interface AuthState {
  authHeaders?: AuthHeaders;
  currentUser?: User;
  error?: boolean;
  errorMessages?: string[];
  loading: boolean;
  loggedIn: any;
  provider?: string;
  signUpBodyData?: UserSignUpData;
}

const initialState: AuthState = {
  currentUser: undefined,
  loggedIn: undefined,
  authHeaders: undefined,
  signUpBodyData: undefined,
  error: false,
  errorMessages: [],
  loading: false
};

export const signUpUser = createAsyncThunk(
  'session/signUpUser',
  async (payload: UserSignUpData, { rejectWithValue }) => {
    const response = await createUserWithEmailAndPassword(
      payload.email, 
      payload.password
      );

    if (response.status >= 300){
      return rejectWithValue(response.data);
    }
    return response;
  }
);  

export const signInUser = createAsyncThunk(
  'session/signInUser',
  async (payload: UserSignInData, { rejectWithValue }) => {
    const response = await signInUserWithEmailAndPassword(
      payload.email,
      payload.password
      );
    
    if (response.status >= 200 && response.status < 300){
      await storeAuthHeader(response.headers);
      return response.data;
    } else {
      return rejectWithValue(response.data);
    }
  }
);

export const authenticateUserFromStorage = createAsyncThunk(
  'session/authenticateUserFromStorage',
  async (_, { rejectWithValue }) => {
    const authHeaders = localAuthHeader()
    const response = await validateAuthHeader(authHeaders);

      if (response.status >= 200 && response.status < 300){
        return response.data.data;
      } else {
        return rejectWithValue(response.data);
      }
  }
)

export const signOutUser = createAsyncThunk(
  'session/signOutUser',
  async (payload: UserSignOutData, { rejectWithValue }) => {
    const response = await signOutUserWithAuthHeaders(
      payload
      );
    if (response.errors){
      return rejectWithValue(response.errors);
    }
    return response;
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.errorMessages = [];
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.errorMessages = [];
      })
      .addCase(signUpUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload.errors;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.loggedIn = false;
        state.error = true;
        state.errorMessages = [];
      })
      .addCase(signInUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.loggedIn = true;
        state.currentUser = convertKeysToCamelCase(action.payload.data);
        state.authHeaders = localAuthHeader();
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(signInUser.rejected, (state, action: any) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = true;
        state.errorMessages = action.payload.errors;
      })
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
        state.error = true;
      })
      .addCase(signOutUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.loggedIn = false;
        state.currentUser = undefined;
        state.authHeaders = undefined;
        state.error = false;
        state.errorMessages = [];
        removeAuthHeaders();
        localStorage.removeItem('selectedDialogues');
      })
      .addCase(signOutUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload.errors;
      })
      .addCase(authenticateUserFromStorage.pending, (state) => {
        state.loading = true;
        state.loggedIn = false;
        state.error = true;
      })
      .addCase(authenticateUserFromStorage.fulfilled, (state, action: any) => {
        state.loading = false;
        state.loggedIn = true;
        state.authHeaders = localAuthHeader();
        state.currentUser = convertKeysToCamelCase(action.payload);
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(authenticateUserFromStorage.rejected, (state, action: any) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = true;
        state.errorMessages = action.payload.errors;
      });
  }
});

export const sessionAuthSliceReducer = sessionSlice.reducer;
export const sessionAuthSliceActions = sessionSlice.actions;

function storeAuthHeader(headers: any) {
    localStorage.setItem('accept', REQUEST_REQUIREMENTS.ACCEPT);
    localStorage.setItem('accessToken', headers["access-token"]);
    localStorage.setItem('client', headers["client"]);
    localStorage.setItem('uid', headers["uid"]);
  }

function removeAuthHeaders() {
    localStorage.removeItem('accept');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
}

export function getLocalStorageAuthHeaders(){
  const authHeader = {
    accept: localStorage.getItem('accept') || '',
    accessToken: localStorage.getItem('accessToken') || '',
    client: localStorage.getItem('client') || '',
    uid: localStorage.getItem('uid') || ''
  }
  return authHeader
}

export const localAuthHeader = () =>{
  const authHeader = {
    accept: localStorage.getItem('accept') || "",
    accessToken: localStorage.getItem('accessToken') || "",
    client: localStorage.getItem('client') || "",
    uid: localStorage.getItem('uid') || "",
    'token-type': 'Bearer'
  }
  return authHeader
}

export function convertKeysToCamelCase(obj: any): any {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map(item => convertKeysToCamelCase(item));
    } else if (obj.constructor === Object) {
      const newObj: { [key: string]: any } = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
            letter.toUpperCase()
          );
          newObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
        }
      }
      return newObj;
    }
  }
  return obj;
}