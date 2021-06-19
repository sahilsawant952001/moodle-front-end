import { createSlice} from "@reduxjs/toolkit";

const initialAuthState = {
                            isAuthenticated:false,
                            userType:null,
                            dept:null,
                            id:null,
                            loading:false,
                            name:null,
                            surname:null,
                            deptname:null,
                            quiz:false,
                            email:null
                         }


const authSlice = createSlice({
    name:"auth",
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            state.userType=action.payload.userType;
            state.id=action.payload.id;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.dept = action.payload.dept;
            state.deptname = action.payload.deptname;
            state.email = action.payload.email
        },
        logout(state){
            state.isAuthenticated=false;
            state.id=null;
            state.userType=null;
        },
        setLoading(state){
            state.loading=!state.loading;
        },
        setQuiz(state){
            state.quiz = !state.quiz;
        }
    }
}) 

export const authActions = authSlice.actions;

export default authSlice.reducer;