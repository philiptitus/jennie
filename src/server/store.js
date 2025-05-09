import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import reducers from userReducers
import * as userReducers from './reducers/userReducers';

// Import reducers from reducers1
import * as reducers1 from './reducers/reducers1';

// Import reducers from reducers2
import * as reducers2 from './reducers/reducers2';

const reducer = combineReducers({
    // User-related reducers
    userLogin: userReducers.userLoginReducer,
    cognitoLogin: userReducers.cognitoLoginReducer,
    googleAuth: userReducers.googleAuthReducer,

    userRegister: userReducers.userRegisterReducer,
    userDetails: userReducers.userDetailsReducer,
    userUpdateProfile: userReducers.userUpdateProfileReducer,
    accountDelete: userReducers.accountDeleteReducer,
    forgotPassword: userReducers.forgotPasswordReducer,
    resetPassword: userReducers.resetPasswordReducer,
    getOtp: userReducers.getOtpReducer,
    verifyOtp: userReducers.verifyOtpReducer,

    // Preparation material-related reducers
    preparationMaterialCreate: reducers1.preparationMaterialCreateReducer,
    latestInterviewSession: reducers1.latestInterviewSessionReducer,
    interviewSessionList: reducers1.interviewSessionListReducer,
    jobCreate: reducers1.jobCreateReducer,
    jobDelete: reducers1.jobDeleteReducer,
    jobDetail: reducers1.jobDetailReducer,
    jobList: reducers1.jobListReducer,
    jobUpdate: reducers1.jobUpdateReducer,
    preparationBlockUpdate: reducers1.preparationBlockUpdateReducer,
    preparationMaterialDelete: reducers1.preparationMaterialDeleteReducer,
    preparationMaterialDetail: reducers1.preparationMaterialDetailReducer,
    preparationMaterialList: reducers1.preparationMaterialListReducer,
    preparationMaterialMarking: reducers1.preparationMaterialMarkingReducer,

    // Interview-related reducers
    interviewCreate: reducers1.interviewCreateReducer,
    interviewDelete: reducers1.interviewDeleteReducer,
    interviewDetail: reducers1.interviewDetailReducer,
    interviewRoomCreate: reducers1.interviewRoomCreateReducer,
    interviewRoomDetail: reducers1.interviewRoomDetailReducer,
    interviewUpdate: reducers1.interviewUpdateReducer,
    userInterviewList: reducers1.userInterviewListReducer,
    codingQuestionUpdate: reducers1.codingQuestionUpdateReducer,

    // Other interview-related reducers
    interviewBlockUpdate: reducers2.interviewBlockUpdateReducer,
    interviewCodingQuestionUpdate: reducers2.interviewCodingQuestionUpdateReducer,
    interviewRoomMarking: reducers2.interviewRoomMarkingReducer,
    getAgent: reducers2.getAgentReducer,
    getCode: reducers2.getCodeReducer,
    askAgent: reducers2.askAgentReducer,
    checkSessionExpired: reducers2.checkSessionExpiredReducer,
    runCode: reducers2.runCodeReducer,
    notificationList: reducers2.notificationListReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

// Check if Redux DevTools is available, otherwise use normal middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
