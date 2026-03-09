import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api/axios';

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async ({ page = 1, limit = 4 }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/movie/all?page=${page}&limit=${limit}`);

            return response.data

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch movies"
            );
        }
    }
);

// Get single movie
export const fetchMovieById = createAsyncThunk(
    'movies/fetchMovieById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/movie/${id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch movie');
        }
    }
);

// Create movie
export const createMovie = createAsyncThunk(
    'movies/createMovie',
    async (movieData, { rejectWithValue }) => {
        try {
            const response = await api.post('/movie', movieData)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create movie');
        }
    }
);

// Update movie
export const updateMovie = createAsyncThunk(
    'movies/updateMovie',
    async ({ id, movieData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/movie/${id}`, movieData)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update movie');
        }
    }
);

// Delete movie
export const deleteMovie = createAsyncThunk(
    'movies/deleteMovie',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/movie/${id}`)
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete movie');
        }
    }
);

export const fetchHistoryMovies = createAsyncThunk(
    "movies/fetchHistoryMovies",
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/history?page=${page}&limit=${limit}`);
            return {
                movies: response.data.history,
                totalPages: response.data.pagination.itemsPerPage,
                page
            };

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch history movies"
            );
        }
    }
);
const initialState = {
    movies: [],
    currentMovie: null,
    history: [],
    loading: false,
    error: null,
    success: false,
    totalPages: 1,
    currentPage: 1,
    hasMore: true,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clearMovieError: (state) => {
            state.error = null;
        },
        clearMovieSuccess: (state) => {
            state.success = false;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;

                const { movies, page, totalPages, hasMore } = action.payload;

                if (page === 1) {
                    state.movies = movies;
                } else {
                    state.movies = [...state.movies, ...movies];
                }

                state.currentPage = page;
                state.totalPages = totalPages;
                state.hasMore = hasMore;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchHistoryMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchHistoryMovies.fulfilled, (state, action) => {
                state.loading = false;
                const { movies, page } = action.payload;
                if (page === 1) {
                    state.history = movies;
                } else {
                    state.history = [...state.history, ...movies];
                }
            })

            .addCase(fetchHistoryMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Movie By Id
            .addCase(fetchMovieById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentMovie = action.payload;
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Movie
            .addCase(createMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.movies.unshift(action.payload);
                state.success = true;
            })
            .addCase(createMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // Update Movie
            .addCase(updateMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.movies.findIndex(m => m.id === action.payload.id);
                if (index !== -1) {
                    state.movies[index] = action.payload;
                }
                state.currentMovie = action.payload;
                state.success = true;
            })
            .addCase(updateMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            .addCase(deleteMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = state.movies.filter(m => m.id !== action.payload);
                state.success = true;
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearMovieError, clearMovieSuccess, setCurrentPage } = movieSlice.actions;
export default movieSlice.reducer;