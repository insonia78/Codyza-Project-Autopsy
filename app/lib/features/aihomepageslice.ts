import { createSlice } from '@reduxjs/toolkit';

const homePageSlice = createSlice({
  name: 'aiHomePage',
  initialState: {
    value:{
     aiAnalysis:''
    },
    
    errors:{
      aiAnalysis:''
    }
  },
  reducers: {
    
    setValue(state, action) {
      state.value = action.payload;
    },
    
    setErrors(state, action) {
      state.errors = action.payload;
    }
  }
});

export const { setErrors , setValue } = homePageSlice.actions;
export default homePageSlice.reducer;