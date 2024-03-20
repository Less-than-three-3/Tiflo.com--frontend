import {createSlice} from '@reduxjs/toolkit'

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    id: "",
    name: "New Project",
    media: "",
    text: "",
  },

  reducers: {
    newProjectAction(state) {
      state.id = "";
      state.name = "New Project";
      state.media = "";
      state.text = "";
    },

    setProjectAction(state, {payload}) {
      // console.log("setProjectAction", payload)
      // state = {
      //   id: payload.id,
      //   name: payload.name,
      //   media: payload.media,
      //   text: payload.text,
      // }
      state.id = payload.id;
      state.name = payload.name;
      state.media = payload.media;
      state.text = payload.text;
    },

    setProjectNameAction(state, {payload}) {
      state.name = payload
    },

    setProjectMediaAction(state, {payload}) {
      state.media = payload
    },

    setProjectTextAction(state, {payload}) {
      state.text = payload
    }
  }
})

export const {
  newProjectAction,
  setProjectAction,
  setProjectNameAction,
  setProjectMediaAction,
  setProjectTextAction
} = projectSlice.actions
export default projectSlice.reducer
