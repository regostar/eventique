const HOST = process.env.REACT_APP_HOST || 'http://localhost';
const PORT = process.env.REACT_APP_PORT || 8000;

export const apiEndpoints = {
    'LOGIN': `${HOST}:${PORT}/api/auth/login`,
    'SIGNUP': `${HOST}:${PORT}/api/auth/register`,
    'GET_TASKS': `${HOST}:${PORT}/api/tasks?start_time=<START_TIME>&end_time=<END_TIME>`,
    'GEN_EVENT': `${HOST}:${PORT}/api/chatbot/generate-plan?prompt=<PROMPT>`
}