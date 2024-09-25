import axios from 'axios';
import { API_URL } from '../constants/API';
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
  NOTIFICATION_LIST_RESET,
  
} from '../constants/constants2';

// Action for updating an interview block
export const updateInterviewBlock = (blockId, blockData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTERVIEW_BLOCK_UPDATE_REQUEST
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `${API_URL}/api/v1/i-blocks/${blockId}/update/`,
      blockData,
      config
    );

    dispatch({
      type: INTERVIEW_BLOCK_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTERVIEW_BLOCK_UPDATE_FAILURE,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetInterviewBlockUpdate = () => (dispatch) => {
  dispatch({
    type: INTERVIEW_BLOCK_UPDATE_RESET
  });
};

// Action for updating an interview coding question
export const updateInterviewCodingQuestion = (questionId, questionData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTERVIEW_CODING_QUESTION_UPDATE_REQUEST
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `${API_URL}/api/v1/icode/${questionId}/update/`,
      questionData,
      config
    );

    dispatch({
      type: INTERVIEW_CODING_QUESTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTERVIEW_CODING_QUESTION_UPDATE_FAILURE,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetInterviewCodingQuestionUpdate = () => (dispatch) => {
  dispatch({
    type: INTERVIEW_CODING_QUESTION_UPDATE_RESET
  });
};

// Action for marking an interview room
export const markInterviewRoom = (materialId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTERVIEW_ROOM_MARKING_REQUEST
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(
      `${API_URL}/api/v1/room/${materialId}/mark/`,
      {},
      config
    );

    dispatch({
      type: INTERVIEW_ROOM_MARKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTERVIEW_ROOM_MARKING_FAILURE,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetInterviewRoomMarking = () => (dispatch) => {
  dispatch({
    type: INTERVIEW_ROOM_MARKING_RESET
  });
};

// Action for getting an agent
export const getAgent = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_AGENT_REQUEST
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(
      `${API_URL}/api/v1/agent/`,
      config
    );

    dispatch({
      type: GET_AGENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_AGENT_FAILURE,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetGetAgent = () => (dispatch) => {
  dispatch({
    type: GET_AGENT_RESET
  });
};

export const askAgent = (sessionId, queryData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ASK_AGENT_REQUEST
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(
      `${API_URL}/api/v1/ask-agent/${sessionId}/`,
      queryData,
      config
    );

    dispatch({
      type: ASK_AGENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASK_AGENT_FAILURE,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};




export const resetAskAgent = () => (dispatch) => {
  dispatch({
    type: ASK_AGENT_RESET
  });
};


export const checkSessionExpired = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHECK_SESSION_EXPIRED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, // Ensure the token is available
      },
    };

    const { data } = await axios.post(`${API_URL}/api/v1/expired/`, {}, config);

    dispatch({
      type: CHECK_SESSION_EXPIRED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHECK_SESSION_EXPIRED_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

  
  export const resetCheckSessionExpired = () => (dispatch) => {
    dispatch({
      type: CHECK_SESSION_EXPIRED_RESET
    });
  };
  
  // Action for running code
  export const runCode = (codeData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RUN_CODE_REQUEST
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };
  
      const { data } = await axios.post(
        `${API_URL}/api/v1/run/`,
        codeData,
        config
      );
  
      dispatch({
        type: RUN_CODE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RUN_CODE_FAILURE,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      });
    }
  };
  
  export const resetRunCode = () => (dispatch) => {
    dispatch({
      type: RUN_CODE_RESET
    });
  };
  
  // Action for getting code
  export const getCode = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_CODE_REQUEST
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };
  
      const { data } = await axios.get(
        `${API_URL}/api/v1/code/`,
        config
      );
  
      dispatch({
        type: GET_CODE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CODE_FAILURE,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      });
    }
  };
  
  export const resetGetCode = () => (dispatch) => {
    dispatch({
      type: GET_CODE_RESET
    });
  };




  export const listNotifications = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTIFICATION_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`${API_URL}/api/v1/notifications/`, config);
      console.log(data)
      dispatch({
        type: NOTIFICATION_LIST_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: NOTIFICATION_LIST_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      });
    }
  };



  export const resetNotificationList = () => (dispatch) => {
    dispatch({
      type: NOTIFICATION_LIST_RESET,
    });
  };