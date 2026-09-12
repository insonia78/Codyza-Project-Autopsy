import { createSlice } from '@reduxjs/toolkit';

const homePageSlice = createSlice({
  name: 'homePage',
  initialState: {
    repositoryName: '',
    githubToken: ''
  },
  reducers: {
    setRepositoryName(state, action) {
      state.repositoryName = action.payload;
    },
    setGitHubToken(state, action) {
      state.githubToken = action.payload;
    }
  }
});

export const { setRepositoryName, setGitHubToken } = homePageSlice.actions;
export default homePageSlice.reducer;