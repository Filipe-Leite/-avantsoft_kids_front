import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Level, NavigationState } from "../../app/#interfaces/slicesInterfaces";
import { AuthHeaders } from "../../app/#interfaces/interfaces";
import { getAuthorsByPage, getDisciplinesByPage, getSearchWithQuertTypeAndPage, getSourcesByPage, getSubtopicsByPage, getTopicsByPage } from "../../app/api/sessionAPI";
import { convertKeysToCamelCase } from "../../genericFunctions";

const initialState: NavigationState = {
    levels: [],
    disciplines: [],
    disciplinesSearch: [],
    topics: [],
    topicsSearch: [],
    subtopicsSearch: [],
    subtopics: [],
    authors: [],
    authorsSearch: [],
    sources: [],
    sourcesSearch: [],
    errors: [],
    loadingDisciplines: false,
    loadingTopics: false,
    loadingSubtopics: false,
    loadingAuthors: false,
    loadingSources: false,
};

interface GetSearch{
  authHeaders?: AuthHeaders;
  queryType: string;
  page: number;
  searchTerm: string;
  letter?: string;
}

interface GetDisciplines{
  authHeaders?: AuthHeaders;
  page: number;
  letter?: string;
}

interface GetTopics{
  authHeaders?: AuthHeaders;
  page: number;
  letter?: string;
  discipline?: number;
}

interface GetSubtopics{
  authHeaders?: AuthHeaders;
  page: number;
  letter?: string;
  discipline?: number;
}

interface GetAuthors{
  authHeaders?: AuthHeaders;
  page: number;
  letter?: string;
  discipline?: number;
}

interface GetSources{
  authHeaders?: AuthHeaders;
  page: number;
  letter?: string;
  discipline?: number;
}

export const getSearch = createAsyncThunk(
    'sessionNavigation/getSearch',
    async (payload: GetSearch, {rejectWithValue}) => {
        const response = await getSearchWithQuertTypeAndPage(
            payload.authHeaders,
            payload.queryType,
            payload.page,
            payload.searchTerm,
            payload.letter
        )
        if (response.status >= 200 && response.status < 300) {
            return response.data 
        } else {
          return rejectWithValue(response.data)
        }
    }
)

export const getDisciplines = createAsyncThunk(
    'sessionNavigation/getDisciplines',
    async (payload: GetDisciplines, {rejectWithValue}) => {
        const response = await getDisciplinesByPage(
            payload.authHeaders,
            payload.page,
            payload.letter
        )
        if (response.status >= 200 && response.status < 300) {
            return response.data 
        } else {
          return rejectWithValue(response.data)
        }
    }
)

export const getTopics = createAsyncThunk(
    'sessionNavigation/getTopics',
    async (payload: GetTopics, {rejectWithValue}) => {
        const response = await getTopicsByPage(
            payload.authHeaders,
            payload.page,
            payload.letter,
            payload.discipline
        )
        if (response.status >= 200 && response.status < 300) {
            return response.data 
        } else {
          return rejectWithValue(response.data)
        }
    }
)

export const getSubtopics = createAsyncThunk(
    'sessionNavigation/getSubtopics',
    async (payload: GetSubtopics, {rejectWithValue}) => {
        const response = await getSubtopicsByPage(
            payload.authHeaders,
            payload.page,
            payload.letter,
            payload.discipline
        )
        if (response.status >= 200 && response.status < 300) {
            return response.data 
        } else {
          return rejectWithValue(response.data)
        }
    }
)

export const getAuthors = createAsyncThunk(
    'sessionNavigation/getAuthors',
    async (payload: GetAuthors, {rejectWithValue}) => {
        const response = await getAuthorsByPage(
            payload.authHeaders,
            payload.page,
            payload.letter
        )
        if (response.status >= 200 && response.status < 300) {
            return response.data 
        } else {
          return rejectWithValue(response.data)
        }
    }
)

export const getSources = createAsyncThunk(
    'sessionNavigation/getSources',
    async (payload: GetSources, {rejectWithValue}) => {
        const response = await getSourcesByPage(
            payload.authHeaders,
            payload.page,
            payload.letter
        )
        if (response.status >= 200 && response.status < 300) {
            return response.data 
        } else {
          return rejectWithValue(response.data)
        }
    }
)

const sessionNavigationSlice = createSlice({
  name: 'sessionNavigation',
  initialState,
  reducers: {
    setLevelSearch: (state, action: PayloadAction<Level>) => {
        
        const index = state.levels?.findIndex(item => item?.position === action.payload.position);
        

        if (action.payload.position === 1){
          state.levels[0] = action.payload;

          state.levels = state.levels?.filter(level => 
            level?.position !== undefined && level.position <= 1
          );
        } 
        else if (action.payload.position === 2){
          state.levels[1] = action.payload;

          state.levels = state.levels?.filter(level => 
            level?.position !== undefined && level.position <= 2
          );
        } else if (action.payload.position === 3){
          state.levels[2] = action.payload;

          state.levels = state.levels?.filter(level => 
            level?.position !== undefined && level.position <= 3
          );
        }

    }
  },
  extraReducers: (builder) => {
      builder
      .addCase(getSearch.pending, (state, action: any) => {
        
        if (action.meta.arg.queryType === 'discipline' && action.meta.arg.page === 1 ){
          state.disciplinesSearch = [];
          state.loadingDisciplines = true;
        }
        if (action.meta.arg.queryType === 'topic' && action.meta.arg.page === 1 ){
          state.topicsSearch = [];
          state.loadingTopics = true;
        }
        if (action.meta.arg.queryType === 'subtopic' && action.meta.arg.page === 1 ){
          state.subtopicsSearch = [];
          state.loadingTopics = true;
        }
        if (action.meta.arg.queryType === 'author' && action.meta.arg.page === 1 ){
          state.authorsSearch = [];
          state.loadingAuthors = true;
        }
        if (action.meta.arg.queryType === 'source' && action.meta.arg.page === 1 ){
          state.sourcesSearch = [];
          state.loadingSources = true;
        }
      })
      .addCase(getSearch.fulfilled, (state, action: any) => {

        if (action.meta.arg.queryType === 'discipline'){
          if (action.meta.arg.page === 1){
            state.disciplinesSearch = convertKeysToCamelCase(action.payload);
            state.loadingDisciplines = false;
          } else {
            state.disciplinesSearch = [...state.disciplinesSearch,...convertKeysToCamelCase(action.payload)];
            state.loadingDisciplines = false;
          }
        } else if ((action.meta.arg.queryType === 'topic')){
          if (action.meta.arg.page === 1){
            state.topicsSearch = convertKeysToCamelCase(action.payload);
            state.loadingTopics = false;
          } else {
            state.topicsSearch = [...state.topicsSearch,...convertKeysToCamelCase(action.payload)];
            state.loadingTopics = false;
          }
        } else if ((action.meta.arg.queryType === 'subtopic')){
          if (action.meta.arg.page === 1){
            state.subtopicsSearch = convertKeysToCamelCase(action.payload);
            state.loadingSubtopics = false;
          } else {
            state.subtopicsSearch = [...state.subtopicsSearch,...convertKeysToCamelCase(action.payload)];
            state.loadingSubtopics = false;
          }
        } else if ((action.meta.arg.queryType === 'author')){
          if (action.meta.arg.page === 1){
            state.authorsSearch = convertKeysToCamelCase(action.payload);
            state.loadingAuthors = false;
          } else {
            state.authorsSearch = [...state.authorsSearch,...convertKeysToCamelCase(action.payload)];
            state.loadingAuthors = false;
          }
        } else if ((action.meta.arg.queryType === 'source')){
            state.sourcesSearch = convertKeysToCamelCase(action.payload);
            state.loadingSources = false;
          } else {
            state.sourcesSearch = [...state.sourcesSearch,...convertKeysToCamelCase(action.payload)];
            state.loadingSources = false;
          }
      })
      .addCase(getSearch.rejected, (state, action: any) => {
        if (action.meta.arg.queryType === 'discipline'){
          state.errors = ['Error on disciplines search']
          state.loadingDisciplines = false;
        }
        if (action.meta.arg.queryType === 'topic'){
          state.errors = ['Error on disciplines search']
          state.loadingTopics = false;
        }
        if (action.meta.arg.queryType === 'subtopic'){
          state.errors = ['Error on disciplines search']
          state.loadingSubtopics = false;
        }
        if (action.meta.arg.queryType === 'author'){
          state.errors = ['Error on disciplines search']
          state.loadingAuthors = false;
        }
        if (action.meta.arg.queryType === 'source'){
          state.errors = ['Error on disciplines search']
          state.loadingSources = false;
        }
      })
      .addCase(getDisciplines.pending, (state, action: any) => {

        if (action.meta.arg.page === 1){
          state.disciplines = []
        }
        state.loadingDisciplines = true;
      })
      .addCase(getDisciplines.fulfilled, (state, action: any) => {
        state.disciplines = [...state.disciplines,...convertKeysToCamelCase(action.payload)];

        state.loadingDisciplines = false;
      })
      .addCase(getDisciplines.rejected, (state) => {
        state.loadingDisciplines = false;
      })
      .addCase(getTopics.pending, (state, action: any) => {
        if (action.meta.arg.page === 1){
          state.topics = []
        }
        state.loadingTopics = true;
      })
      .addCase(getTopics.fulfilled, (state, action: any) => {
        state.topics = [...state.topics,...convertKeysToCamelCase(action.payload)];

        state.loadingTopics = false;
      })
      .addCase(getTopics.rejected, (state) => {
        state.loadingTopics = false;
      })
      .addCase(getSubtopics.pending, (state, action: any) => {

        if (action.meta.arg.page === 1){
          state.subtopics = []
        }
        state.loadingSubtopics = true;
      })
      .addCase(getSubtopics.fulfilled, (state, action: any) => {

        state.subtopics = [...state.subtopics,...convertKeysToCamelCase(action.payload)];

        state.loadingSubtopics = false;
      })
      .addCase(getSubtopics.rejected, (state) => {
        state.loadingSubtopics = false;
      })
      .addCase(getAuthors.pending, (state, action: any) => {

        if (action.meta.arg.page === 1){
          state.authors = []
        }
        state.loadingAuthors = true;
      })
      .addCase(getAuthors.fulfilled, (state, action: any) => {

        state.authors = [...state.authors,...convertKeysToCamelCase(action.payload)];

        state.loadingAuthors = false;
      })
      .addCase(getAuthors.rejected, (state) => {
        state.loadingAuthors = false;
      })
      .addCase(getSources.pending, (state, action: any) => {

        if (action.meta.arg.page === 1){
          state.sources = []
        }
        state.loadingSources = true;
      })
      .addCase(getSources.fulfilled, (state, action: any) => {

        state.sources = [...state.sources,...convertKeysToCamelCase(action.payload)];

        state.loadingSources = false;
      })
      .addCase(getSources.rejected, (state) => {
        state.loadingSources = false;
      })
    }
});

export const { setLevelSearch } = sessionNavigationSlice.actions;
export const navigationSliceReducers = sessionNavigationSlice.reducer;