import {
    INTERVIEW_BLOCK_UPDATE_REQUEST,
    INTERVIEW_BLOCK_UPDATE_SUCCESS,
    INTERVIEW_BLOCK_UPDATE_FAILURE,
    INTERVIEW_BLOCK_UPDATE_RESET,
    INTERVIEW_CODING_QUESTION_UPDATE_REQUEST,
    INTERVIEW_CODING_QUESTION_UPDATE_SUCCESS,
    INTERVIEW_CODING_QUESTION_UPDATE_FAILURE,
    INTERVIEW_CODING_QUESTION_UPDATE_RESET,
    INTERVIEW_ROOM_MARKING_REQUEST,
    INTERVIEW_ROOM_MARKING_SUCCESS,
    INTERVIEW_ROOM_MARKING_FAILURE,
    INTERVIEW_ROOM_MARKING_RESET,
    GET_AGENT_REQUEST,
    GET_AGENT_SUCCESS,
    GET_AGENT_FAILURE,
    GET_AGENT_RESET,
    ASK_AGENT_REQUEST,
    ASK_AGENT_SUCCESS,
    ASK_AGENT_FAILURE,
    ASK_AGENT_RESET,
    CHECK_SESSION_EXPIRED_REQUEST,
    CHECK_SESSION_EXPIRED_SUCCESS,
    CHECK_SESSION_EXPIRED_FAILURE,
    CHECK_SESSION_EXPIRED_RESET,
    RUN_CODE_REQUEST,
    RUN_CODE_SUCCESS,
    RUN_CODE_FAILURE,
    RUN_CODE_RESET,
    GET_CODE_REQUEST,
    GET_CODE_SUCCESS,
    GET_CODE_FAILURE,
    GET_CODE_RESET,
    NOTIFICATION_LIST_REQUEST,
    NOTIFICATION_LIST_SUCCESS,
    NOTIFICATION_LIST_FAIL,
    NOTIFICATION_LIST_RESET

  } from '../constants/constants2';
  
  // /api/v1/p-blocks/<int:block_id>/update/'
  export const interviewBlockUpdateReducer = (state = { block: null }, action) => {
    switch (action.type) {
      case INTERVIEW_BLOCK_UPDATE_REQUEST:
        return { loading: true, ...state };
      case INTERVIEW_BLOCK_UPDATE_SUCCESS:
        return { loading: false, block: action.payload, success: true };
      case INTERVIEW_BLOCK_UPDATE_FAILURE:
        return { loading: false, error: action.payload };
      case INTERVIEW_BLOCK_UPDATE_RESET:
        return { block: null };
      default:
        return state;
    }
  };
  
  // /api/v1/code/<int:id>/update/
  export const interviewCodingQuestionUpdateReducer = (state = { question: null }, action) => {
    switch (action.type) {
      case INTERVIEW_CODING_QUESTION_UPDATE_REQUEST:
        return { loading: true, ...state };
      case INTERVIEW_CODING_QUESTION_UPDATE_SUCCESS:
        return { loading: false, question: action.payload, success: true };
      case INTERVIEW_CODING_QUESTION_UPDATE_FAILURE:
        return { loading: false, error: action.payload };
      case INTERVIEW_CODING_QUESTION_UPDATE_RESET:
        return { question: null };
      default:
        return state;
    }
  };
  
  // /api/v1/room/<int:material_id>/mark/
  export const interviewRoomMarkingReducer = (state = { room: null }, action) => {
    switch (action.type) {
      case INTERVIEW_ROOM_MARKING_REQUEST:
        return { loading: true, ...state };
      case INTERVIEW_ROOM_MARKING_SUCCESS:
        return { loading: false, room: action.payload, success: true };
      case INTERVIEW_ROOM_MARKING_FAILURE:
        return { loading: false, error: action.payload };
      case INTERVIEW_ROOM_MARKING_RESET:
        return { room: null };
      default:
        return state;
    }
  };
  
  // /api/v1/agent/
  export const getAgentReducer = (state = { agent: null }, action) => {
    switch (action.type) {
      case GET_AGENT_REQUEST:
        return { loading: true, ...state };
      case GET_AGENT_SUCCESS:
        return { loading: false, agent: action.payload, success: true };
      case GET_AGENT_FAILURE:
        return { loading: false, error: action.payload };
      case GET_AGENT_RESET:
        return { agent: null };
      default:
        return state;
    }
  };
  


  export const askAgentReducer = (state = { response: null }, action) => {
    switch (action.type) {
      case ASK_AGENT_REQUEST:
        return { loading: true, ...state };
      case ASK_AGENT_SUCCESS:
        return { loading: false, response: action.payload, success: true };
      case ASK_AGENT_FAILURE:
        return { loading: false, error: action.payload };
      case ASK_AGENT_RESET:
        return { response: null };
      default:
        return state;
    }
  };



// /api/v1/expired/
export const checkSessionExpiredReducer = (state = { sessions: [] }, action) => {
    switch (action.type) {
      case CHECK_SESSION_EXPIRED_REQUEST:
        return { loading: true, ...state };
      case CHECK_SESSION_EXPIRED_SUCCESS:
        return { loading: false, sessions: action.payload, success: true };
      case CHECK_SESSION_EXPIRED_FAILURE:
        return { loading: false, error: action.payload };
      case CHECK_SESSION_EXPIRED_RESET:
        return { sessions: [] };
      default:
        return state;
    }
  };
  
  // /api/v1/run/
  export const runCodeReducer = (state = { code: null }, action) => {
    switch (action.type) {
      case RUN_CODE_REQUEST:
        return { loading: true, ...state };
      case RUN_CODE_SUCCESS:
        return { loading: false, code: action.payload, success: true };
      case RUN_CODE_FAILURE:
        return { loading: false, error: action.payload };
      case RUN_CODE_RESET:
        return { code: null };
      default:
        return state;
    }
  };
  
  // /api/v1/code/
  export const getCodeReducer = (state = { code: null }, action) => {
    switch (action.type) {
      case GET_CODE_REQUEST:
        return { loading: true, ...state };
      case GET_CODE_SUCCESS:
        return { loading: false, code: action.payload, success: true };
      case GET_CODE_FAILURE:
        return { loading: false, error: action.payload };
      case GET_CODE_RESET:
        return { code: null };
      default:
        return state;
    }
  };




  export const notificationListReducer = (state = { notifications: [], seenIds: new Set() }, action) => {
    switch (action.type) {
      case NOTIFICATION_LIST_REQUEST:
        return { loading: true, ...state };
      case NOTIFICATION_LIST_SUCCESS:
        const newNotifications = action.payload.results.filter(notification => !state.seenIds.has(notification.id));
        const updatedSeenIds = new Set([...state.seenIds, ...newNotifications.map(notification => notification.id)]);
        return { loading: false, notifications: [...state.notifications, ...newNotifications], seenIds: updatedSeenIds };
      case NOTIFICATION_LIST_FAIL:
        return { loading: false, error: action.payload };
      case NOTIFICATION_LIST_RESET:
        return { notifications: [], seenIds: new Set() };
      default:
        return state;
    }
  };
  