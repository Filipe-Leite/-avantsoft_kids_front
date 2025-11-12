import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Card, NavigationState } from "../../app/#interfaces/slicesInterfaces";
import { AuthHeaders } from "../../app/#interfaces/interfaces";
import { postCurrentCard } from "../../app/api/sessionAPI";
import { convertKeysToCamelCase } from "../../genericFunctions";

interface CardsState {
    currentCards: Card[];
}

const initialState: CardsState = {
    currentCards: []
};

interface PostCurrentCard{
  authHeaders?: AuthHeaders;
}

export const createCurrentCard = createAsyncThunk(
    'sessionCardsSlice/createCard',
    async (payload: PostCurrentCard, {rejectWithValue}) => {
        const response = await postCurrentCard(
            payload.authHeaders
        )
        if (response.status >= 200 && response.status < 300) {
            return response.data 
        } else {
          return rejectWithValue(response.data)
        }
    }
)

const sessionCardsSlice = createSlice({
  name: 'sessionCardsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
      .addCase(createCurrentCard.pending, (state, action: any) => {
        
      })
      .addCase(createCurrentCard.fulfilled, (state, action: any) => {
        console.log("action >>> ", action)
      })
      .addCase(createCurrentCard.rejected, (state, action: any) => {
       
      })
      }
    }
);

export const cardsSliceActions = sessionCardsSlice.actions;
export const cardsSliceReducers = sessionCardsSlice.reducer;