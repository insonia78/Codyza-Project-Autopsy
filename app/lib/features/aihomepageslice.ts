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
    ,
    loading: false
  },
  reducers: {
    
    setValue(state, action) {
      state.value = action.payload;
    },
    
    setErrors(state, action) {
      state.errors = action.payload;
    }
    ,
    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { setErrors , setValue, setLoading } = homePageSlice.actions;
export default homePageSlice.reducer;