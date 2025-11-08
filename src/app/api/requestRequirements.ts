export const ACCEPT = "application/vnd.api+json"
export const CONTENT_TYPE = "application/json"

export const SIGN_IN_HEADERS = {
    "accept": ACCEPT,
    "content-type": CONTENT_TYPE
}

export const SIGNUP_ENDPOINT = "/auth";
export const REDEFINITION_MAIL = "/auth/password";
export const SIGNIN_ENDPOINT = "/auth/sign_in";
export const SIGNOUT_ENDPOINT = "/auth/sign_out";
export const CHANGE_PASSWORD_ENDPOINT = "/auth/password";
export const VALIDATE_TOKEN_ENDPOINT = "/auth/validate_token";

export const FIRST_LEVEL_INDEX_SEARCH_ENDPOINT = "/letters"
export const SECOND_LEVEL_INDEX_SEARCH_ENDPOINT = "/letters/:letter"
export const THIRD_LEVEL_INDEX_SEARCH_ENDPOINT = "/letters/:letter/:secondlevel"

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
    letter?: string;
    secondLevel?: string;
    queryType?: string;
    page?: number;
    searchTerm?: string;
    discipline?: number;
}

export interface EndPoints {
    FIRST_LEVEL?: string;
    SECOND_LEVEL?: string;
}

export interface PrivateRoutesParams {
    ROUTE_PARAMS: RouteParams;
}

export function handlePrivateRoutes({ROUTE_PARAMS}: PrivateRoutesParams){

    const ENDPOINTS = {
            FIRST_LEVEL: `/letters`,
            SECOND_LEVEL: `/letters/${ROUTE_PARAMS.letter}`,
            THIRD_LEVEL: `/letters/${ROUTE_PARAMS.letter}/${ROUTE_PARAMS.secondLevel}`,
            SEARCH: `/search/${ROUTE_PARAMS.queryType}/page/${ROUTE_PARAMS.page}/?q=${ROUTE_PARAMS?.searchTerm}
                    ${ROUTE_PARAMS?.letter ? `&letter=${ROUTE_PARAMS.letter}` : ''}`,
            GET_DISCIPLINES: `/disciplines/page/${ROUTE_PARAMS.page}?${ROUTE_PARAMS.letter ? `letter=${ROUTE_PARAMS.letter}` : ''}`,
            GET_TOPICS: `/topics/page/${ROUTE_PARAMS.page}?${ROUTE_PARAMS.letter ? `letter=${ROUTE_PARAMS.letter}` : ''}&${ROUTE_PARAMS.discipline ? `discipline=${ROUTE_PARAMS.discipline}` : ''}`,
            GET_SUBTOPICS: `/subtopics/page/${ROUTE_PARAMS.page}?${ROUTE_PARAMS.letter ? `letter=${ROUTE_PARAMS.letter}` : ''}&${ROUTE_PARAMS.discipline ? `discipline=${ROUTE_PARAMS.discipline}` : ''}`,
            GET_AUTHORS: `/authors/page/${ROUTE_PARAMS.page}?${ROUTE_PARAMS.letter ? `letter=${ROUTE_PARAMS.letter}` : ''}`,
            GET_SOURCES: `/sources/page/${ROUTE_PARAMS.page}?${ROUTE_PARAMS.letter ? `letter=${ROUTE_PARAMS.letter}` : ''}`
        }

    return ENDPOINTS
}