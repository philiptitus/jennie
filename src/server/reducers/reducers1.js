import {
    LATEST_INTERVIEW_SESSION_REQUEST,
    LATEST_INTERVIEW_SESSION_SUCCESS,
    LATEST_INTERVIEW_SESSION_FAIL,
    LATEST_INTERVIEW_SESSION_RESET,
    INTERVIEW_SESSION_LIST_REQUEST,
    INTERVIEW_SESSION_LIST_SUCCESS,
    INTERVIEW_SESSION_LIST_FAIL,
    INTERVIEW_SESSION_LIST_RESET,
    JOB_CREATE_REQUEST,
    JOB_CREATE_SUCCESS,
    JOB_CREATE_FAIL,
    JOB_CREATE_RESET,
    JOB_UPDATE_REQUEST,
    JOB_UPDATE_SUCCESS,
    JOB_UPDATE_FAIL,
    JOB_UPDATE_RESET,
    JOB_DELETE_REQUEST,
    JOB_DELETE_SUCCESS,
    JOB_DELETE_FAIL,
    JOB_DELETE_RESET,
    JOB_DETAIL_REQUEST,
    JOB_DETAIL_SUCCESS,
    JOB_DETAIL_FAIL,
    JOB_DETAIL_RESET,
    JOB_LIST_REQUEST,
    JOB_LIST_SUCCESS,
    JOB_LIST_FAIL,
    JOB_LIST_RESET,
    PREPARATION_MATERIAL_LIST_REQUEST,
    PREPARATION_MATERIAL_LIST_SUCCESS,
    PREPARATION_MATERIAL_LIST_FAIL,
    PREPARATION_MATERIAL_LIST_RESET,
    INTERVIEW_CREATE_REQUEST,
    INTERVIEW_CREATE_SUCCESS,
    INTERVIEW_CREATE_FAIL,
    INTERVIEW_CREATE_RESET,
    INTERVIEW_DETAIL_REQUEST,
    INTERVIEW_DETAIL_SUCCESS,
    INTERVIEW_DETAIL_FAIL,
    INTERVIEW_DETAIL_RESET,
    INTERVIEW_UPDATE_REQUEST,
    INTERVIEW_UPDATE_SUCCESS,
    INTERVIEW_UPDATE_FAIL,
    INTERVIEW_UPDATE_RESET,
    INTERVIEW_DELETE_REQUEST,
    INTERVIEW_DELETE_SUCCESS,
    INTERVIEW_DELETE_FAIL,
    INTERVIEW_DELETE_RESET,
    USER_INTERVIEW_LIST_REQUEST,
    USER_INTERVIEW_LIST_SUCCESS,
    USER_INTERVIEW_LIST_FAIL,
    USER_INTERVIEW_LIST_RESET,
    PREPARATION_MATERIAL_DETAIL_REQUEST,
    PREPARATION_MATERIAL_DETAIL_SUCCESS,
    PREPARATION_MATERIAL_DETAIL_FAIL,
    PREPARATION_MATERIAL_DETAIL_RESET,
    PREPARATION_MATERIAL_CREATE_REQUEST,
    PREPARATION_MATERIAL_CREATE_SUCCESS,
    PREPARATION_MATERIAL_CREATE_FAIL,
    PREPARATION_MATERIAL_CREATE_RESET,
    PREPARATION_MATERIAL_DELETE_REQUEST,
    PREPARATION_MATERIAL_DELETE_SUCCESS,
    PREPARATION_MATERIAL_DELETE_FAIL,
    PREPARATION_MATERIAL_DELETE_RESET,
    PREPARATION_BLOCK_UPDATE_REQUEST,
    PREPARATION_BLOCK_UPDATE_SUCCESS,
    PREPARATION_BLOCK_UPDATE_FAIL,
    PREPARATION_BLOCK_UPDATE_RESET,
    CODING_QUESTION_UPDATE_REQUEST,
    CODING_QUESTION_UPDATE_SUCCESS,
    CODING_QUESTION_UPDATE_FAIL,
    CODING_QUESTION_UPDATE_RESET,


    PREPARATION_MATERIAL_MARKING_REQUEST,
    PREPARATION_MATERIAL_MARKING_SUCCESS,
    PREPARATION_MATERIAL_MARKING_FAIL,
    PREPARATION_MATERIAL_MARKING_RESET,
    CREATE_INTERVIEW_ROOM_REQUEST,
    CREATE_INTERVIEW_ROOM_SUCCESS,
    CREATE_INTERVIEW_ROOM_FAILURE,
    CREATE_INTERVIEW_ROOM_RESET,
    FETCH_INTERVIEW_ROOM_DETAILS_REQUEST,
    FETCH_INTERVIEW_ROOM_DETAILS_SUCCESS,
    FETCH_INTERVIEW_ROOM_DETAILS_FAILURE,
    FETCH_INTERVIEW_ROOM_DETAILS_RESET,
    
  } from '../constants/constants1';
  
  // /api/v1/latest/
  export const latestInterviewSessionReducer = (state = { session: null }, action) => {
    switch (action.type) {
      case LATEST_INTERVIEW_SESSION_REQUEST:
        return { loading: true, ...state };
      case LATEST_INTERVIEW_SESSION_SUCCESS:
        return { loading: false, session: action.payload, success: true };
      case LATEST_INTERVIEW_SESSION_FAIL:
        return { loading: false, error: action.payload };
      case LATEST_INTERVIEW_SESSION_RESET:
        return { session: null };
      default:
        return state;
    }
  };
  
  // /api/v1/interviews/<int:interview_id>/sessions/
  export const interviewSessionListReducer = (state = { sessions: [] }, action) => {
    switch (action.type) {
      case INTERVIEW_SESSION_LIST_REQUEST:
        return { loading: true, ...state };
      case INTERVIEW_SESSION_LIST_SUCCESS:
        return { loading: false, sessions: action.payload, success: true };
      case INTERVIEW_SESSION_LIST_FAIL:
        return { loading: false, error: action.payload };
      case INTERVIEW_SESSION_LIST_RESET:
        return { sessions: [] };
      default:
        return state;
    }
  };
  
  // /api/v1/jobs/create/
  export const jobCreateReducer = (state = { job: null }, action) => {
    switch (action.type) {
      case JOB_CREATE_REQUEST:
        return { loading: true, ...state };
      case JOB_CREATE_SUCCESS:
        return { loading: false, job: action.payload, success: true };
      case JOB_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case JOB_CREATE_RESET:
        return { job: null };
      default:
        return state;
    }
  };
  



// /api/v1/jobs/<int:pk>/update/
export const jobUpdateReducer = (state = { job: null }, action) => {
    switch (action.type) {
      case JOB_UPDATE_REQUEST:
        return { loading: true, ...state };
      case JOB_UPDATE_SUCCESS:
        return { loading: false, job: action.payload, success: true };
      case JOB_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case JOB_UPDATE_RESET:
        return { job: null };
      default:
        return state;
    }
  };
  
  // /api/v1/jobs/<int:pk>/delete/
  export const jobDeleteReducer = (state = { job: null }, action) => {
    switch (action.type) {
      case JOB_DELETE_REQUEST:
        return { loading: true, ...state };
      case JOB_DELETE_SUCCESS:
        return { loading: false, job: action.payload, success: true };
      case JOB_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case JOB_DELETE_RESET:
        return { job: null };
      default:
        return state;
    }
  };
  
  // /api/v1/jobs/<int:pk>/
  export const jobDetailReducer = (state = { job: null }, action) => {
    switch (action.type) {
      case JOB_DETAIL_REQUEST:
        return { loading: true, ...state };
      case JOB_DETAIL_SUCCESS:
        return { loading: false, job: action.payload, success: true };
      case JOB_DETAIL_FAIL:
        return { loading: false, error: action.payload };
      case JOB_DETAIL_RESET:
        return { job: null };
      default:
        return state;
    }
  };





  // /api/v1/jobs/
  export const jobListReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {
      case 'JOB_LIST_REQUEST':
        return { loading: true, ...state };
      case 'JOB_LIST_SUCCESS':
        return { loading: false, jobs: action.payload.results, success: true }; // Extract results
      case 'JOB_LIST_FAIL':
        return { loading: false, error: action.payload, jobs: [] };
      case 'JOB_LIST_RESET':
        return { jobs: [] };
      default:
        return state;
    }
  };
  
  
  // /api/v1/materials/
  export const preparationMaterialListReducer = (state = { materials: [] }, action) => {
    switch (action.type) {
      case PREPARATION_MATERIAL_LIST_REQUEST:
        return { loading: true, ...state };
      case PREPARATION_MATERIAL_LIST_SUCCESS:
        return { loading: false, materials: action.payload, success: true };
      case PREPARATION_MATERIAL_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PREPARATION_MATERIAL_LIST_RESET:
        return { materials: [] };
      default:
        return state;
    }
  };







  
  // /api/v1/interviews/create/
  export const interviewCreateReducer = (state = { interview: null }, action) => {
    switch (action.type) {
      case INTERVIEW_CREATE_REQUEST:
        return { loading: true, ...state };
      case INTERVIEW_CREATE_SUCCESS:
        return { loading: false, interview: action.payload, success: true };
      case INTERVIEW_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case INTERVIEW_CREATE_RESET:
        return { interview: null };
      default:
        return state;
    }
  };




  // /api/v1/interviews/<int:pk>/
export const interviewDetailReducer = (state = { interview: null }, action) => {
    switch (action.type) {
      case INTERVIEW_DETAIL_REQUEST:
        return { loading: true, ...state };
      case INTERVIEW_DETAIL_SUCCESS:
        return { loading: false, interview: action.payload, success: true };
      case INTERVIEW_DETAIL_FAIL:
        return { loading: false, error: action.payload };
      case INTERVIEW_DETAIL_RESET:
        return { interview: null };
      default:
        return state;
    }
  };
  
  // /api/v1/interviews/<int:pk>/update/
  export const interviewUpdateReducer = (state = { interview: null }, action) => {
    switch (action.type) {
      case INTERVIEW_UPDATE_REQUEST:
        return { loading: true, ...state };
      case INTERVIEW_UPDATE_SUCCESS:
        return { loading: false, interview: action.payload, success: true };
      case INTERVIEW_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case INTERVIEW_UPDATE_RESET:
        return { interview: null };
      default:
        return state;
    }
  };
  
  // /api/v1/interviews/<int:pk>/delete/
  export const interviewDeleteReducer = (state = { interview: null }, action) => {
    switch (action.type) {
      case INTERVIEW_DELETE_REQUEST:
        return { loading: true, ...state };
      case INTERVIEW_DELETE_SUCCESS:
        return { loading: false, interview: action.payload, success: true };
      case INTERVIEW_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case INTERVIEW_DELETE_RESET:
        return { interview: null };
      default:
        return state;
    }
  };
  
  // /api/v1/interviews/
  export const userInterviewListReducer = (state = { interviews: [] }, action) => {
    switch (action.type) {
      case USER_INTERVIEW_LIST_REQUEST:
        return { loading: true, ...state };
      case USER_INTERVIEW_LIST_SUCCESS:
        return { loading: false, interviews: action.payload.results, success: true };
      case USER_INTERVIEW_LIST_FAIL:
        return { loading: false, error: action.payload };
      case USER_INTERVIEW_LIST_RESET:
        return { interviews: [] };
      default:
        return state;
    }
  };









  // /api/v1/material/<int:id>/
export const preparationMaterialDetailReducer = (state = { material: null }, action) => {
    switch (action.type) {
      case PREPARATION_MATERIAL_DETAIL_REQUEST:
        return { loading: true, ...state };
      case PREPARATION_MATERIAL_DETAIL_SUCCESS:
        return { loading: false, material: action.payload, success: true };
      case PREPARATION_MATERIAL_DETAIL_FAIL:
        return { loading: false, error: action.payload };
      case PREPARATION_MATERIAL_DETAIL_RESET:
        return { material: null };
      default:
        return state;
    }
  };
  
  ///api/v1/material/create/
  export const preparationMaterialCreateReducer = (state = { material: null }, action) => {
    switch (action.type) {
      case PREPARATION_MATERIAL_CREATE_REQUEST:
        return { loading: true, ...state };
      case PREPARATION_MATERIAL_CREATE_SUCCESS:
        return { loading: false, material: action.payload, success: true };
      case PREPARATION_MATERIAL_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PREPARATION_MATERIAL_CREATE_RESET:
        return { material: null };
      default:
        return state;
    }
  };
  
  // /api/v1/material/delete/
  export const preparationMaterialDeleteReducer = (state = { material: null }, action) => {
    switch (action.type) {
      case PREPARATION_MATERIAL_DELETE_REQUEST:
        return { loading: true, ...state };
      case PREPARATION_MATERIAL_DELETE_SUCCESS:
        return { loading: false, material: action.payload, success: true };
      case PREPARATION_MATERIAL_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case PREPARATION_MATERIAL_DELETE_RESET:
        return { material: null };
      default:
        return state;
    }
  };
  
  // /api/v1/p-blocks/<int:block_id>/update/
  export const preparationBlockUpdateReducer = (state = { block: null }, action) => {
    switch (action.type) {
      case PREPARATION_BLOCK_UPDATE_REQUEST:
        return { loading: true, ...state };
      case PREPARATION_BLOCK_UPDATE_SUCCESS:
        return { loading: false, block: action.payload, success: true };
      case PREPARATION_BLOCK_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PREPARATION_BLOCK_UPDATE_RESET:
        return { block: null };
      default:
        return state;
    }
  };



  // /api/v1/code/<int:id>/update/
export const codingQuestionUpdateReducer = (state = { question: null }, action) => {
    switch (action.type) {
      case CODING_QUESTION_UPDATE_REQUEST:
        return { loading: true, ...state };
      case CODING_QUESTION_UPDATE_SUCCESS:
        return { loading: false, question: action.payload, success: true };
      case CODING_QUESTION_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case CODING_QUESTION_UPDATE_RESET:
        return { question: null };
      default:
        return state;
    }
  };








  
  // /api/v1/material/<int:material_id>/mark/
  export const preparationMaterialMarkingReducer = (state = { material: null }, action) => {
    switch (action.type) {
      case PREPARATION_MATERIAL_MARKING_REQUEST:
        return { loading: true, ...state };
      case PREPARATION_MATERIAL_MARKING_SUCCESS:
        return { loading: false, material: action.payload, success: true };
      case PREPARATION_MATERIAL_MARKING_FAIL:
        return { loading: false, error: action.payload };
      case PREPARATION_MATERIAL_MARKING_RESET:
        return { material: null };
      default:
        return state;
    }
  };
  
  // /api/v1/room/create/
  export const interviewRoomCreateReducer = (state = { room: null }, action) => {
    switch (action.type) {
      case CREATE_INTERVIEW_ROOM_REQUEST:
        return { loading: true, ...state };
      case CREATE_INTERVIEW_ROOM_SUCCESS:
        return { loading: false, room: action.payload, success: true };
      case CREATE_INTERVIEW_ROOM_FAILURE:
        return { loading: false, error: action.payload };
      case CREATE_INTERVIEW_ROOM_RESET:
        return { room: null };
      default:
        return state;
    }
  };
  
  // /api/v1/room/<int:id>/
  export const interviewRoomDetailReducer = (state = { room: null }, action) => {
    switch (action.type) {
      case FETCH_INTERVIEW_ROOM_DETAILS_REQUEST:
        return { loading: true, ...state };
      case FETCH_INTERVIEW_ROOM_DETAILS_SUCCESS:
        return { loading: false, room: action.payload, success: true };
      case FETCH_INTERVIEW_ROOM_DETAILS_FAILURE:
        return { loading: false, error: action.payload };
      case FETCH_INTERVIEW_ROOM_DETAILS_RESET:
        return { room: null };
      default:
        return state;
    }
  };