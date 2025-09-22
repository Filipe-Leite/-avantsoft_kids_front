export const ACCEPT = "application/vnd.api+json"
export const CONTENT_TYPE = "application/json"

export const SIGN_IN_HEADERS = {
    "accept": ACCEPT,
    "content-type": CONTENT_TYPE
}

export const SIGNUP_ENDPOINT = "/auth/register";
export const REDEFINITION_MAIL = "/auth/password";
export const SIGNIN_ENDPOINT = "/auth/login";
export const SIGNOUT_ENDPOINT = "/auth/sign_out";
export const CHANGE_PASSWORD_ENDPOINT = "/auth/password";
export const VALIDATE_TOKEN_ENDPOINT = "/auth/validate";

export const HOME = "/seller/:sellerId"

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

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

export interface RouteParams {
    userId?: number;
    sellerId?: number;
}

export interface EndPoints {
    HOME?: string;
}

export interface PrivateRoutesParams {
    ROUTE_PARAMS: RouteParams;
}

export function handlePrivateRoutes({ROUTE_PARAMS}: PrivateRoutesParams){

    const ENDPOINTS = {
            HOME: `/seller/${ROUTE_PARAMS.sellerId}`
        }

    return ENDPOINTS
}