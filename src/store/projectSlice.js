import {createSlice} from '@reduxjs/toolkit'

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    id: "",
    name: "New Project",
    media: "",
    text: "",
    comments: [],
  },

  reducers: {
    newProjectAction(state) {
      state.id = "";
      state.name = "New Project";
      state.media = "";
      state.text = "";
      state.comments = [];
    },

    // setProjectAction(state, {payload}) {
    //   console.log("payload", payload)
    //   state.id = payload.projectId;
    //   state.name = payload.name;
    //   state.media = payload.path;
    //   state.text = payload.text;
    // },

    setProjectIdAction(state, {payload}) {
      console.log("payload id", payload)
      state.id = payload;
    },

    setProjectNameAction(state, {payload}) {
      state.name = payload;
    },

    setProjectMediaAction(state, {payload}) {
      state.media = payload;
    },

    setProjectTextAction(state, {payload}) {
      state.text = payload;
    },

    setProjectAudioAction(state, {payload}) {
      state.comments.push({
        path: payload,
        text: "",
        start: 0,
      });
    },

    clearProjectAudioAction(state) {
      state.comments = [];
    },

    setProjectAudioArrAction(state, {payload}) {
      state.comments.push({
        path: payload.path,
        text: payload.text,
        start: payload.start,
      });
    }
  }
})

export const {
  newProjectAction,
  // setProjectAction,
  setProjectIdAction,
  setProjectNameAction,
  setProjectMediaAction,
  setProjectTextAction,
  setProjectAudioAction,
  setProjectAudioArrAction,
  clearProjectAudioAction,
} = projectSlice.actions
export default projectSlice.reducer
