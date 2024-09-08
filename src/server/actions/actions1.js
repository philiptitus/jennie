import axios from 'axios';
import { API_URL } from 'server/constants/API';
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
  FETCH_INTERVIEW_ROOM_DETAILS_RESET

} from '../constants/constants1';

export const getLatestInterviewSession = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LATEST_INTERVIEW_SESSION_REQUEST
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
      `${API_URL}/api/v1/latest/`,
      config
    );

    dispatch({
      type: LATEST_INTERVIEW_SESSION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LATEST_INTERVIEW_SESSION_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetLatestInterviewSession = () => (dispatch) => {
  dispatch({
    type: LATEST_INTERVIEW_SESSION_RESET
  });
};






// Action for fetching interview session list
export const getInterviewSessionList = (interviewId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTERVIEW_SESSION_LIST_REQUEST
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
      `${API_URL}/api/v1/interviews/${interviewId}/sessions/`,
      config
    );

    dispatch({
      type: INTERVIEW_SESSION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTERVIEW_SESSION_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetInterviewSessionList = () => (dispatch) => {
  dispatch({
    type: INTERVIEW_SESSION_LIST_RESET
  });
};

// Action for creating a job
export const createJob = (jobData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_CREATE_REQUEST
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
      `${API_URL}/api/v1/jobs/create/`,
      jobData,
      config
    );

    dispatch({
      type: JOB_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_CREATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetJobCreate = () => (dispatch) => {
  dispatch({
    type: JOB_CREATE_RESET
  });
};

// Action for updating a job
export const updateJob = (jobId, jobData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_UPDATE_REQUEST
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
      `${API_URL}/api/v1/jobs/${jobId}/update/`,
      jobData,
      config
    );

    dispatch({
      type: JOB_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetJobUpdate = () => (dispatch) => {
  dispatch({
    type: JOB_UPDATE_RESET
  });
};





// Action for deleting a job
export const deleteJob = (jobId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DELETE_REQUEST
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

    const { data } = await axios.delete(
      `${API_URL}/api/v1/jobs/${jobId}/delete/`,
      config
    );

    dispatch({
      type: JOB_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetJobDelete = () => (dispatch) => {
  dispatch({
    type: JOB_DELETE_RESET
  });
};

// Action for fetching job details
export const getJobDetail = (jobId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DETAIL_REQUEST
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
      `${API_URL}/api/v1/jobs/${jobId}/`,
      config
    );

    dispatch({
      type: JOB_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_DETAIL_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetJobDetail = () => (dispatch) => {
  dispatch({
    type: JOB_DETAIL_RESET
  });
};

// Action for fetching job list

export const getJobList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'JOB_LIST_REQUEST'
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
      `${API_URL}/api/v1/jobs/`,
      config
    );

    dispatch({
      type: 'JOB_LIST_SUCCESS',
      payload: data,
    });
    // console.log(data)
  } catch (error) {
    dispatch({
      type: 'JOB_LIST_FAIL',
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetJobList = () => (dispatch) => {
  dispatch({
    type: 'JOB_LIST_RESET'
  });
};


// Action for fetching preparation material list
export const getPreparationMaterialList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PREPARATION_MATERIAL_LIST_REQUEST
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
      `${API_URL}/api/v1/materials/`,
      config
    );

    dispatch({
      type: PREPARATION_MATERIAL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PREPARATION_MATERIAL_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetPreparationMaterialList = () => (dispatch) => {
  dispatch({
    type: PREPARATION_MATERIAL_LIST_RESET
  });
};






// Action for creating an interview
export const createInterview = (interviewData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTERVIEW_CREATE_REQUEST
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
      `${API_URL}/api/v1/interviews/create/`,
      interviewData,
      config
    );

    dispatch({
      type: INTERVIEW_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTERVIEW_CREATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetInterviewCreate = () => (dispatch) => {
  dispatch({
    type: INTERVIEW_CREATE_RESET
  });
};

// Action for fetching interview details
export const getInterviewDetail = (interviewId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTERVIEW_DETAIL_REQUEST
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
      `${API_URL}/api/v1/interviews/${interviewId}/`,
      config
    );

    dispatch({
      type: INTERVIEW_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTERVIEW_DETAIL_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetInterviewDetail = () => (dispatch) => {
  dispatch({
    type: INTERVIEW_DETAIL_RESET
  });
};

// Action for updating an interview
export const updateInterview = (interviewId, interviewData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTERVIEW_UPDATE_REQUEST
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
      `${API_URL}/api/v1/interviews/${interviewId}/update/`,
      interviewData,
      config
    );

    dispatch({
      type: INTERVIEW_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTERVIEW_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetInterviewUpdate = () => (dispatch) => {
  dispatch({
    type: INTERVIEW_UPDATE_RESET
  });
};

// Action for deleting an interview
export const deleteInterview = (interviewId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTERVIEW_DELETE_REQUEST
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

    const { data } = await axios.delete(
      `${API_URL}/api/v1/interviews/${interviewId}/delete/`,
      config
    );

    dispatch({
      type: INTERVIEW_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INTERVIEW_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetInterviewDelete = () => (dispatch) => {
  dispatch({
    type: INTERVIEW_DELETE_RESET
  });
};

// Action for fetching user interview list
export const getUserInterviewList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_INTERVIEW_LIST_REQUEST
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
      `${API_URL}/api/v1/interviews/`,
      config
    );

    dispatch({
      type: USER_INTERVIEW_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_INTERVIEW_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetUserInterviewList = () => (dispatch) => {
  dispatch({
    type: USER_INTERVIEW_LIST_RESET
  });
};













// Action for fetching preparation material detail
export const getPreparationMaterialDetail = (materialId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PREPARATION_MATERIAL_DETAIL_REQUEST
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
      `${API_URL}/api/v1/material/${materialId}/`,
      config
    );

    dispatch({
      type: PREPARATION_MATERIAL_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PREPARATION_MATERIAL_DETAIL_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetPreparationMaterialDetail = () => (dispatch) => {
  dispatch({
    type: PREPARATION_MATERIAL_DETAIL_RESET
  });
};

// Action for creating preparation material
export const createPreparationMaterial = (jobId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PREPARATION_MATERIAL_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Create the data object with job_id
    const dataToSend = {
      job_id: jobId,
    };

    const { data } = await axios.post(
      `${API_URL}/api/v1/material/create/`,
      dataToSend,
      config
    );

    dispatch({
      type: PREPARATION_MATERIAL_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PREPARATION_MATERIAL_CREATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};


export const resetPreparationMaterialCreate = () => (dispatch) => {
  dispatch({
    type: PREPARATION_MATERIAL_CREATE_RESET
  });
};

// Action for deleting preparation material
export const deletePreparationMaterial = (materialId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PREPARATION_MATERIAL_DELETE_REQUEST
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

    const { data } = await axios.delete(
      `${API_URL}/api/v1/material/delete/`,
      { data: { id: materialId } },
      config
    );

    dispatch({
      type: PREPARATION_MATERIAL_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PREPARATION_MATERIAL_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetPreparationMaterialDelete = () => (dispatch) => {
  dispatch({
    type: PREPARATION_MATERIAL_DELETE_RESET
  });
};

// Action for updating preparation block
export const updatePreparationBlock = (blockId, blockData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PREPARATION_BLOCK_UPDATE_REQUEST
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
      `${API_URL}/api/v1/p-blocks/${blockId}/update/`,
      blockData,
      config
    );

    dispatch({
      type: PREPARATION_BLOCK_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PREPARATION_BLOCK_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetPreparationBlockUpdate = () => (dispatch) => {
  dispatch({
    type: PREPARATION_BLOCK_UPDATE_RESET
  });
};

// Action for updating coding question
export const updateCodingQuestion = (questionId, questionData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CODING_QUESTION_UPDATE_REQUEST
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
      `${API_URL}/api/v1/code/${questionId}/update/`,
      questionData,
      config
    );

    dispatch({
      type: CODING_QUESTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CODING_QUESTION_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetCodingQuestionUpdate = () => (dispatch) => {
  dispatch({
    type: CODING_QUESTION_UPDATE_RESET
  });
};













// Action for marking preparation material
export const markPreparationMaterial = (materialId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PREPARATION_MATERIAL_MARKING_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Correctly passing the config as the third argument
    const { data } = await axios.post(
      `${API_URL}/api/v1/material/${materialId}/mark/`,
      {}, // Empty object for the request body
      config
    );

    dispatch({
      type: PREPARATION_MATERIAL_MARKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PREPARATION_MATERIAL_MARKING_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const resetPreparationMaterialMarking = () => (dispatch) => {
  dispatch({
    type: PREPARATION_MATERIAL_MARKING_RESET
  });
};

// Action for creating an interview room
export const createInterviewRoom = (roomData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_INTERVIEW_ROOM_REQUEST
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
      `${API_URL}/api/v1/room/create/`,
      roomData,
      config
    );

    dispatch({
      type: CREATE_INTERVIEW_ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_INTERVIEW_ROOM_FAILURE,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetCreateInterviewRoom = () => (dispatch) => {
  dispatch({
    type: CREATE_INTERVIEW_ROOM_RESET
  });
};

// Action for fetching interview room details
export const fetchInterviewRoomDetails = (roomId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_INTERVIEW_ROOM_DETAILS_REQUEST
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
      `${API_URL}/api/v1/room/${roomId}/`,
      config
    );

    dispatch({
      type: FETCH_INTERVIEW_ROOM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_INTERVIEW_ROOM_DETAILS_FAILURE,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetFetchInterviewRoomDetails = () => (dispatch) => {
  dispatch({
    type: FETCH_INTERVIEW_ROOM_DETAILS_RESET
  });
};

















