import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Card, NavigationState } from "../../app/#interfaces/slicesInterfaces";
import { AuthHeaders } from "../../app/#interfaces/interfaces";
import { getUserCurrentCardsWithUserId, postCurrentCard } from "../../app/api/sessionAPI";
import { convertKeysToCamelCase } from "../../genericFunctions";

interface CardsState {
    currentCards: Card[];
}

const initialState: CardsState = {
    currentCards: []
};

interface PostCurrentCard{
  authHeaders?: AuthHeaders;
  cardTypeId: number;
}

interface GetUserCurrentCard{
  authHeaders: AuthHeaders;
  userId: number;
}

export const createCurrentCard = createAsyncThunk(
    'sessionCardsSlice/createCard',
    async (payload: PostCurrentCard, {rejectWithValue}) => {
        const response = await postCurrentCard(
            payload.authHeaders,
            payload.cardTypeId
        )
        if (response.status >= 200 && response.status < 300) {
            return response.data 
        } else {
          return rejectWithValue(response.data)
        }
    }
)

export const getUserCurrentCards = createAsyncThunk(
    'sessionCardsSlice/getUserCurrentCards',
    async (payload: GetUserCurrentCard, {rejectWithValue}) => {
        const response = await getUserCurrentCardsWithUserId(
            payload.authHeaders,
            payload.userId
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
          state.currentCards = [convertKeysToCamelCase(action),...state.currentCards]
        })
          .addCase(createCurrentCard.rejected, (state, action: any) => {
        
          })
      .addCase(getUserCurrentCards.pending, (state, action: any) => {  
      })
        .addCase(getUserCurrentCards.fulfilled, (state, action: any) => {
          console.log("action.payload >>>>>> ", action.payload)
          state.currentCards = convertKeysToCamelCase(action.payload)
        })
          .addCase(getUserCurrentCards.rejected, (state, action: any) => {
          
          })
      }
    }
);

export const cardsSliceActions = sessionCardsSlice.actions;
export const cardsSliceReducers = sessionCardsSlice.reducer;