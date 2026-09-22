import { createSlice } from '@reduxjs/toolkit';

const homePageSlice = createSlice({
  name: 'homePage',
  initialState: {
    value:{
      repositoryName: '',
      githubToken: '',
      aiApiKey: '',
      aiModel: ''
    },
    
    errors:{
      repositoryName: '',
      githubToken: '',
      aiApiKey: '',
      aiModel: ''
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