import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Level, NavigationState } from "../../app/#interfaces/slicesInterfaces";
import { AuthHeaders } from "../../app/#interfaces/interfaces";
import { getDisciplinesByPage, getSearchWithQuertTypeAndPage } from "../../app/api/sessionAPI";
import { convertKeysToCamelCase } from "../../genericFunctions";

const initialState: NavigationState = {
    levels: [],
    disciplines: [],
    errors: [],
    loadingDisciplines: false
};

interface GetSearch{
  authHeaders: AuthHeaders;
  queryType: string;
  page: number;
  searchTerm: string;
}

interface GetDisciplines{
  authHeaders?: AuthHeaders;
  page: number;
}


export const getSearch = createAsyncThunk(
    'sessionNavigation/getSearch',
    async (payload: GetSearch, {rejectWithValue}) => {
        const response = await getSearchWithQuertTypeAndPage(
            payload.authHeaders,
            payload.queryType,
            payload.page,
            payload.searchTerm
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
            payload.page
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
        
        if (action.meta.arg.queryType === 'discipline' && action.meta.arg.queryType === 1 ){
          state.disciplines = [];
          state.loadingDisciplines = true;
        }
      })
      .addCase(getSearch.fulfilled, (state, action: any) => {

        if (action.meta.arg.queryType === 'discipline'){
          if (action.meta.arg.page === 1){
            state.disciplines = convertKeysToCamelCase(action.payload);
            state.loadingDisciplines = false;
          } else {
            state.disciplines = [...state.disciplines,...convertKeysToCamelCase(action.payload)];
            state.loadingDisciplines = false;
          }
          console.log("state.disciplines >>>>>", state.disciplines)
        } else if ((action.meta.arg.queryType === 'topic')){
          console.log("getSearch.fulfilled 'topic' >>>>>")
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
      })

      .addCase(getDisciplines.pending, (state, action: any) => {
        console.log("getDisciplines.pending >>>>>>> ")

        state.disciplines = []
        state.loadingDisciplines = true;
      })
      .addCase(getDisciplines.fulfilled, (state, action: any) => {
        console.log("getDisciplines.fulfilled >>>>>>> ", action)
        state.disciplines = [...state.disciplines,...convertKeysToCamelCase(action.payload)];

        state.loadingDisciplines = false;
      })
      .addCase(getDisciplines.rejected, (state, action: any) => {
        console.log("getDisciplines.rejected >>>>>>> ")
        state.loadingDisciplines = false;
      })
    }
});

export const { setLevelSearch } = sessionNavigationSlice.actions;
export const navigationSliceReducers = sessionNavigationSlice.reducer;