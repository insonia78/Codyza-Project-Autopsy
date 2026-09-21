import { createSlice } from '@reduxjs/toolkit';

const homePageSlice = createSlice({
  name: 'homePage',
  initialState: {
    repositoryName: '',
    githubToken: '',
    aiApiKey: '',
    aiModel: ''
  },
  reducers: {
    setRepositoryName(state, action) {
      state.repositoryName = action.payload;
    },
    setGitHubToken(state, action) {
      state.githubToken = action.payload;
    }
    ,
    setAiApiKey(state, action) {
      state.aiApiKey = action.payload;
    },
    setAiModel(state, action) {
      state.aiModel = action.payload;
    }
  }
});

export const { setRepositoryName, setGitHubToken, setAiApiKey, setAiModel } = homePageSlice.actions;
export default homePageSlice.reducer;