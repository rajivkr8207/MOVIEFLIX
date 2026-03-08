import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  results: [],
  loading: false
};

const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {

    setQuery: (state, action) => {
      state.query = action.payload;
    },

    setResults: (state, action) => {
      state.results = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    }

  }

});

export const { setQuery, setResults, setLoading } = searchSlice.actions;

export default searchSlice.reducer;