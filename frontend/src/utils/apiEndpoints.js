const HOST = process.env.REACT_APP_HOST || 'http://localhost';
const PORT = process.env.REACT_APP_PORT || 8000;

export const apiEndpoints = {
    'LOGIN': `${HOST}:${PORT}/api/auth/login`,
    'SIGNUP': `${HOST}:${PORT}/api/auth/register`,
    'GET_TASKS': `${HOST}:${PORT}/api/tasks?start_time=<START_TIME>&end_time=<END_TIME>`,
    'ADD_TASK': `${HOST}:${PORT}/api/tasks/`,
    'GET_SINGLE_TASK': `${HOST}:${PORT}/api/tasks/<TASK_ID>`,
    'UPDATE_TASK': `${HOST}:${PORT}/api/tasks/<TASK_ID>`,
    'DELETE_TASK': `${HOST}:${PORT}/api/tasks/<TASK_ID>`,
    
    'GET_EVENTS': `${HOST}:${PORT}/api/events/`,
    'GEN_EVENT': `${HOST}:${PORT}/api/chatbot/generate-plan?prompt=<PROMPT>`,
    'REGEN_EVENT': `${HOST}:${PORT}/api/chatbot/generate-plan?regenerate=true&prompt=<PROMPT>`,
    'APPROVE_PLAN': `${HOST}:${PORT}/api/chatbot/approve-plan`
}