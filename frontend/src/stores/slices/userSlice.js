import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api/axios';

const API_URL = 'http://localhost:5000/api/admin/users'; // Replace with your API URL

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

export const toggleUserBlock = createAsyncThunk(
  'users/toggleBlock',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/block/${userId}`)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user status');
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
      
      // Toggle User Block
      .addCase(toggleUserBlock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserBlock.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
          
          // Update stats
          state.stats.active = state.users.filter(u => !u.isBlocked).length;
          state.stats.blocked = state.users.filter(u => u.isBlocked).length;
        }
        state.success = true;
      })
      .addCase(toggleUserBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearUserError, clearUserSuccess } = userSlice.actions;
export default userSlice.reducer;