import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const adminDetailsSlice = createSlice({
  name: 'adminDetails',
  initialState,
  reducers: {
    addAdminDetails(state, action) {
      return action.payload
    },
  }
})

export const { addAdminDetails } = adminDetailsSlice.actions
export default adminDetailsSlice.reducer