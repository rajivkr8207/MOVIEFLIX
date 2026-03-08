import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api/axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue, }) => {
    try {
      const response = await api.get('/admin/users')
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  success: false,
  stats: {
    total: 0,
    active: 0,
    blocked: 0,
    admins: 0,
  },
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || action.payload;
        
        // Calculate stats
        const users = action.payload.users || action.payload;
        state.stats.total = users.length;
        state.stats.active = users.filter(u => !u.isBlocked).length;
        state.stats.blocked = users.filter(u => u.isBlocked).length;
        state.stats.admins = users.filter(u => u.role === 'admin').length;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

export const { clearUserError, clearUserSuccess } = userSlice.actions;
export default userSlice.reducer;