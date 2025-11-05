import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Level, NavigationState } from "../../app/#interfaces/slicesInterfaces";
import { AuthHeaders } from "../../app/#interfaces/interfaces";
import { getDisciplinesByPage, getSearchWithQuertTypeAndPage, getSubtopicsByPage, getTopicsByPage } from "../../app/api/sessionAPI";
import { convertKeysToCamelCase } from "../../genericFunctions";

const initialState: NavigationState = {
    levels: [],
    disciplines: [],
    disciplinesSearch: [],
    topics: [],
    topicsSearch: [],
    subtopicsSearch: [],
    subtopics: [],
    errors: [],
    loadingDisciplines: false,
    loadingTopics: false,
    loadingSubtopics: false
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
            payload.letter
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
    async (payload: GetTopics, {rejectWithValue}) => {
        const response = await getSubtopicsByPage(
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
        
        if (index !== undefined && index !== -1) {
            state.levels![index] = action.payload;
        } else if( state.levels?.length === 0 ){
          state.levels = [];
          state.levels[0] = action.payload;
        }

    }
  },
  extraReducers: (builder) => {
      builder
      .addCase(getSearch.pending, (state, action: any) => {
          console.log("getSearch.fulfilled topic >>>>",action)
        
        if (action.meta.arg.queryType === 'discipline' && action.meta.arg.page === 1 ){
          state.disciplinesSearch = [];
          state.loadingDisciplines = true;
        }
        if (action.meta.arg.queryType === 'topic' && action.meta.arg.page === 1 ){
          state.topicsSearch = [];
          state.loadingTopics = true;
        }
      })
      .addCase(getSearch.fulfilled, (state, action: any) => {
          console.log("getSearch.fulfilled topic >>>>",action)

        if (action.meta.arg.queryType === 'discipline'){
          if (action.meta.arg.page === 1){
            state.disciplinesSearch = convertKeysToCamelCase(action.payload);
            state.loadingDisciplines = false;
          } else {
            state.disciplinesSearch = [...state.disciplinesSearch,...convertKeysToCamelCase(action.payload)];
            state.loadingDisciplines = false;
          }
        } else if ((action.meta.arg.queryType === 'topic')){
          console.log("action.meta.arg.queryType topic >>>>")
          if (action.meta.arg.page === 1){
            state.topicsSearch = convertKeysToCamelCase(action.payload);
            state.loadingTopics = false;
          } else {
            state.topicsSearch = [...state.topicsSearch,...convertKeysToCamelCase(action.payload)];
            state.loadingTopics = false;
          }
        } else if ((action.meta.arg.queryType === 'subtopic')){
          console.log("getSearch.fulfilled 'subtopic' >>>>>")
        } else if ((action.meta.arg.queryType === 'author')){
          console.log("getSearch.fulfilled 'author' >>>>>")
        } else if ((action.meta.arg.queryType === 'source')){
          console.log("getSearch.fulfilled 'source' >>>>>")
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

        console.log("action >>>> ", action)
        state.subtopics = [...state.subtopics,...convertKeysToCamelCase(action.payload)];

        state.loadingSubtopics = false;
      })
      .addCase(getSubtopics.rejected, (state) => {
        state.loadingSubtopics = false;
      })
    }
});

export const { setLevelSearch } = sessionNavigationSlice.actions;
export const navigationSliceReducers = sessionNavigationSlice.reducer;