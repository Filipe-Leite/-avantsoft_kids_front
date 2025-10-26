import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Level, NavigationState } from "../../app/#interfaces/slicesInterfaces";
import { AuthHeaders } from "../../app/#interfaces/interfaces";
import { getSearchWithQuertTypeAndPage } from "../../app/api/sessionAPI";

const initialState: NavigationState = {
    levels: [],
    disciplines: []
};

interface GetSearch{
  authHeaders: AuthHeaders;
  queryType: string;
  page: number;
  searchTerm: string;
}

export const getSearch = createAsyncThunk(
    'sessionNavigation/getDisciplines',
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
        console.log("getSearch.pending >>>>>")
      })
      .addCase(getSearch.fulfilled, (state, action: any) => {
        console.log("getSearch.fulfilled >>>>>", action)
        console.log("getSearch.fulfilled >>>>>", action)
      })
      .addCase(getSearch.rejected, (state) => {
        console.log("getSearch.rejected >>>>>")
      })
    }
});

export const { setLevelSearch } = sessionNavigationSlice.actions;
export const navigationSliceReducers = sessionNavigationSlice.reducer;