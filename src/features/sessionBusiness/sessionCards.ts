import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Author, Card, Discipline, NavigationState, Source, Subtopic, Topic } from "../../app/#interfaces/slicesInterfaces";
import { AuthHeaders } from "../../app/#interfaces/interfaces";
import { getSearchWithQuertTypeAndPage, getUserCurrentCardsWithUserId, postCurrentCard } from "../../app/api/sessionAPI";
import { convertKeysToCamelCase } from "../../genericFunctions";

interface CardsState {
    currentCards: Card[];
    disciplinesAssociationSearch: Discipline[];
    topicsAssociationSearch: Topic[];
    topicsSearch: Topic[];
    subtopicsAssossiationSearch: Subtopic[];
    authorsAssossiationSearch: Author[];
    authorsSearch: Author[];
    sourcesSearch: Source[];
    errors: string[];
    loadingDisciplines: boolean;
    loadingTopics: boolean;
    loadingSubtopics: boolean;
    loadingAuthors: boolean;
    loadingSources: boolean;
    selectedDisciplinesAssociationToSubject: Discipline[];
    selectedTopicsAssociationToSubject: Topic[];
    selectedAuthorsAssociation: Author[];
}


interface PostCurrentCard{
  authHeaders?: AuthHeaders;
  cardTypeId: number;
}

interface GetUserCurrentCard{
  authHeaders: AuthHeaders;
  userId: number;
}

interface GetSearch{
  authHeaders?: AuthHeaders;
  queryType: string;
  page: number;
  searchTerm: string;
  letter?: string;
}

const initialState: CardsState = {
    currentCards: [],
    disciplinesAssociationSearch: [],
    topicsAssociationSearch: [],
    topicsSearch: [],
    subtopicsAssossiationSearch: [],
    authorsAssossiationSearch: [],
    authorsSearch: [],
    sourcesSearch: [],
    errors: [],
    loadingDisciplines: false,
    loadingTopics: false,
    loadingSubtopics: false,
    loadingAuthors: false,
    loadingSources: false,
    selectedDisciplinesAssociationToSubject: [],
    selectedTopicsAssociationToSubject: [],
    selectedAuthorsAssociation: []
};

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

const sessionCardsSlice = createSlice({
  name: 'sessionCardsSlice',
  initialState,
  reducers: {
    selectDiciplineAssociatedToSubject: (state, action: PayloadAction<Discipline>) => {
        state.selectedDisciplinesAssociationToSubject = [...state.selectedDisciplinesAssociationToSubject,action.payload]
    },
    deselectDiciplineAssociatedToSubject: (state, action: PayloadAction<Discipline>) => {
      state.selectedDisciplinesAssociationToSubject = state.selectedDisciplinesAssociationToSubject.filter(
          discipline => discipline.id !== action.payload.id
      );
    },
    selectTopicAssociatedToSubject: (state, action: PayloadAction<Discipline>) => {
        state.selectedTopicsAssociationToSubject = [...state.selectedTopicsAssociationToSubject,action.payload]
    },
    deselectTopicAssociatedToSubject: (state, action: PayloadAction<Discipline>) => {
      state.selectedTopicsAssociationToSubject = state.selectedTopicsAssociationToSubject.filter(
          (topic: Topic) => topic.id !== action.payload.id
      );
    },
    selectAuthorAssociated: (state, action: PayloadAction<Author>) => {
        state.selectedAuthorsAssociation = [...state.selectedAuthorsAssociation,action.payload]
    },
    deselectAuthorAssociated: (state, action: PayloadAction<Author>) => {
      state.selectedAuthorsAssociation = state.selectedAuthorsAssociation.filter(
          (author: Author) => author.id !== action.payload.id
      );
    }
  },
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
          state.currentCards = convertKeysToCamelCase(action.payload)
        })
          .addCase(getUserCurrentCards.rejected, (state, action: any) => {
          
          })
      .addCase(getSearch.pending, (state, action: any) => {
        
        if (action.meta.arg.queryType === 'discipline' && action.meta.arg.page === 1 ){
          state.disciplinesAssociationSearch = [];
          state.loadingDisciplines = true;
        }
        if (action.meta.arg.queryType === 'topic' && action.meta.arg.page === 1 ){
          state.topicsAssociationSearch = [];
          state.loadingTopics = true;
        }
        if (action.meta.arg.queryType === 'subtopic' && action.meta.arg.page === 1 ){
          state.subtopicsAssossiationSearch = [];
          state.loadingTopics = true;
        }
        if (action.meta.arg.queryType === 'author' && action.meta.arg.page === 1 ){
          state.authorsAssossiationSearch = [];
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
              state.disciplinesAssociationSearch = convertKeysToCamelCase(action.payload).filter(
                  (payloadItem: Discipline) => !state.selectedDisciplinesAssociationToSubject.some(
                      selectedItem => selectedItem.id === payloadItem.id
                  )
              );
              state.loadingDisciplines = false;
            } else {
              state.disciplinesAssociationSearch = [...state.disciplinesAssociationSearch,...convertKeysToCamelCase(action.payload)];
              state.loadingDisciplines = false;
            }
          } else if ((action.meta.arg.queryType === 'topic')){
            if (action.meta.arg.page === 1){
              
              state.topicsAssociationSearch = convertKeysToCamelCase(action.payload).filter(
                  (payloadItem: Topic) => !state.selectedTopicsAssociationToSubject.some(
                      selectedItem => selectedItem.id === payloadItem.id
                  )
              );
              state.loadingTopics = false;
            } else {
              state.topicsSearch = [...state.topicsSearch,...convertKeysToCamelCase(action.payload)];
              state.loadingTopics = false;
            }
          } else if ((action.meta.arg.queryType === 'subtopic')){
            if (action.meta.arg.page === 1){
              state.subtopicsAssossiationSearch = convertKeysToCamelCase(action.payload);
              state.loadingSubtopics = false;
            } else {
              state.subtopicsAssossiationSearch = [...state.subtopicsAssossiationSearch,...convertKeysToCamelCase(action.payload)];
              state.loadingSubtopics = false;
            }
          } else if ((action.meta.arg.queryType === 'author')){
            if (action.meta.arg.page === 1){
              state.authorsAssossiationSearch = convertKeysToCamelCase(action.payload);
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
      }
    }
);

export const { selectDiciplineAssociatedToSubject, 
               deselectDiciplineAssociatedToSubject, 
               selectTopicAssociatedToSubject, 
               deselectTopicAssociatedToSubject,
               selectAuthorAssociated,
               deselectAuthorAssociated } = sessionCardsSlice.actions;
export const cardsSliceReducers = sessionCardsSlice.reducer;