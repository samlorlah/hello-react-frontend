import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const greetingLocalAPI = '/api/greeting/greeting.json';
const greetingServerAPI = 'https://hello-rails-kilm.onrender.com/api/greetings';
const greetingMethod = '/get/greeting';

const initialState = {
  greeting: '',
};

export const GreetingThunk = createAsyncThunk(greetingMethod, async () => {
  let greeting;
  try {
    greeting = await (await (fetch(greetingServerAPI))).json();
  } catch {
    greeting = await (await (fetch(greetingLocalAPI))).json();
  }
  return greeting;
});

const greetingSlice = createSlice({
  name: 'greeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GreetingThunk.fulfilled, (state, action) => {
      const { payload } = action;
      return {
        ...payload,
      };
    });
  },
});

export default greetingSlice.reducer;
