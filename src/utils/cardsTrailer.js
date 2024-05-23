import { createSlice } from "@reduxjs/toolkit";

const cardsTrailer = createSlice({
  name: "card",
  initialState: {
    cardTrailer:{}, 
  },

  reducers: {
    addCardTrailer: (state, action) => {
      state.cardTrailer= action.payload;
    },
    clearCardTrailer:(state)=>{ 
      state.cardTrailer=null;
    }
  },
});

export default cardsTrailer.reducer;
export const {
    addCardTrailer,clearCardTrailer
} = cardsTrailer.actions;
