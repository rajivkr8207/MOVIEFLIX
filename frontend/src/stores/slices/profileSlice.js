
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api/axios";

export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/auth/profile");
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch profile"
            );
        }
    }
);

export const fetchHistory = createAsyncThunk(
    "profile/fetchHistory",
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const res = await api.get(`/history?page=${page}&limit=${limit}`);
            return {
                movies: res.data.history,
                page,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch history"
            );
        }
    }
);
export const fetchFavorites = createAsyncThunk(
    "profile/fetchFavorites",
    async ({ rejectWithValue }) => {
        try {
            const res = await api.get(`/favorites`);
            return {
                movies: res.data.favorites,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch favorites"
            );
        }
    }
);

const initialState = {
    profile: null,

    favorites: [],
    history: [],

    loading: false,
    error: null,

    favPage: 1,
    historyPage: 1,
};


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfileError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Fetch Profile
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })

            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Favorites
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                const { movies, page } = action.payload;

                if (page === 1) {
                    state.favorites = movies;
                } else {
                    state.favorites = [...state.favorites, ...movies];
                }

                state.favPage = page;
            })

            // Fetch History
            .addCase(fetchHistory.fulfilled, (state, action) => {
                const { movies, page } = action.payload;

                if (page === 1) {
                    state.history = movies;
                } else {
                    state.history = [...state.history, ...movies];
                }

                state.historyPage = page;
            });
    },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;