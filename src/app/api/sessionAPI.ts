import axios from "axios";
import * as REQUEST_REQUIREMENTS from './requestRequirements';
import { AuthHeaders } from "../#interfaces/interfaces";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true
})

export async function createUserWithEmailAndPassword(
    email: string,
    password: string
    ) {
    const data = {
        email: email,
        password: password
    };

    return api
        .post(REQUEST_REQUIREMENTS.SIGNUP_ENDPOINT, data)
        .then((response: any) => {
            return response;
        })
        .catch((error:any) => {
            return error.response;
        });
}

export async function signInUserWithEmailAndPassword(email: string,password: string) {
    const data = {
        email: email,
        password: password
    }
    return api
        .post(REQUEST_REQUIREMENTS.SIGNIN_ENDPOINT, data)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response;
        });
}

export async function validateAuthHeader(headers: AuthHeaders){

    const authHeaders = convertKeysToSnakeCase(headers)

    return api.get(REQUEST_REQUIREMENTS.VALIDATE_TOKEN_ENDPOINT, 
                  { headers: authHeaders,
                    withCredentials: true })
    .then((response: any) => {

        return response;
    })
    .catch((error: any) => {
        return error.response;
    });
}

export async function signOutUserWithAuthHeaders(headers: any) {
    return api
        .delete(REQUEST_REQUIREMENTS.SIGNOUT_ENDPOINT, {
            headers: {
                "Accept": headers.accept,
                "access-token": headers.accessToken,
                "client": headers.client,
                "uid": headers.uid
            }
        })
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}


function convertKeysToSnakeCase(obj: any): any {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToSnakeCase(item));
      } else {
        if (obj.constructor === Object) {
          const newObj: { [key: string]: any } = {}; // Novo objeto tipado
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const snakeCaseKey =
                key === 'accessToken' ? 'access-token' : key.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
              newObj[snakeCaseKey] = convertKeysToSnakeCase(obj[key]);
            }
          }
          return newObj;
        }
      }
    }
    return obj;
  }