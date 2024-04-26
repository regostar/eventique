const HOST = process.env.REACT_APP_HOST || 'http://localhost';
const PORT = process.env.REACT_APP_PORT;
let DOMAIN = HOST;

if (PORT) {
    DOMAIN += `:${PORT}`
}

export const apiEndpoints = {
    'LOGIN': `${DOMAIN}/api/auth/login`,
    'SIGNUP': `${DOMAIN}/api/auth/register`,
    'GET_TASKS': `${DOMAIN}/api/tasks?start_time=<START_TIME>&end_time=<END_TIME>`,
    'GET_EVENTS': `${DOMAIN}/api/events`,
    'ADD_TASK': `${DOMAIN}/api/tasks/`,
    'GET_SINGLE_TASK': `${DOMAIN}/api/tasks/<TASK_ID>`,
    'UPDATE_TASK': `${DOMAIN}/api/tasks/<TASK_ID>`,
    'DELETE_TASK': `${DOMAIN}/api/tasks/<TASK_ID>`,
    
    'GET_EVENTS': `${DOMAIN}/api/events/`,
    'GEN_EVENT': `${DOMAIN}/api/chatbot/generate-plan?prompt=<PROMPT>`,
    'REGEN_EVENT': `${DOMAIN}/api/chatbot/generate-plan?regenerate=true&prompt=<PROMPT>`,
    'APPROVE_PLAN': `${DOMAIN}/api/chatbot/approve-plan`
}