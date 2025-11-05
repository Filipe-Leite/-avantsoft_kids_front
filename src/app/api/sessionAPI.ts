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

export async function signOutUserWithAuthHeaders(headers: AuthHeaders) {
    return api
        .delete(REQUEST_REQUIREMENTS.SIGNOUT_ENDPOINT, {
            headers: {
                "Accept": headers.accept,
                "access-token": headers['access-token'],
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

export async function getSearchWithQuertTypeAndPage(authHeaders: AuthHeaders | undefined, 
                                                    queryType: string, 
                                                    page: number, 
                                                    searchTerm: string,
                                                    letter: string | undefined){


    const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({ROUTE_PARAMS: 
                                                                    {queryType: queryType, 
                                                                     page: page, 
                                                                     searchTerm: searchTerm,
                                                                     letter: letter}});

    return api
        .get(PRIVATE_ROUTES.SEARCH, {
            headers: convertKeysToSnakeCase(authHeaders)
        })
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}

export async function getDisciplinesByPage(authHeaders: AuthHeaders | undefined, page: number, letter: string | undefined){

    const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({ROUTE_PARAMS: { page: page , letter: letter}});

    return api
        .get(PRIVATE_ROUTES.GET_DISCIPLINES, {
            headers: convertKeysToSnakeCase(authHeaders)
        })
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}

export async function getTopicsByPage(authHeaders: AuthHeaders | undefined, page: number, letter: string | undefined){


    const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({ROUTE_PARAMS: { page: page , letter: letter}});

    return api
        .get(PRIVATE_ROUTES.GET_TOPICS, {
            headers: convertKeysToSnakeCase(authHeaders)
        })
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}

export async function getSubtopicsByPage(authHeaders: AuthHeaders | undefined, page: number, letter: string | undefined){


    const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({ROUTE_PARAMS: { page: page , letter: letter}});

    return api
        .get(PRIVATE_ROUTES.GET_SUBTOPICS, {
            headers: convertKeysToSnakeCase(authHeaders)
        })
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}

export async function getAuthorsByPage(authHeaders: AuthHeaders | undefined, page: number, letter: string | undefined){


    const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({ROUTE_PARAMS: { page: page , letter: letter}});

    return api
        .get(PRIVATE_ROUTES.GET_AUTHORS, {
            headers: convertKeysToSnakeCase(authHeaders)
        })
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}

export async function getSourcesByPage(authHeaders: AuthHeaders | undefined, page: number, letter: string | undefined){


    const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({ROUTE_PARAMS: { page: page , letter: letter}});

    return api
        .get(PRIVATE_ROUTES.GET_SOURCES, {
            headers: convertKeysToSnakeCase(authHeaders)
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