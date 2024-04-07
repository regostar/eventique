const HOST = 'http://localhost'
const PORT = 8000
export const apiEndpoints = {
    'LOGIN': `${HOST}:${PORT}/api/auth/login`,
    'SIGNUP': `${HOST}:${PORT}/api/auth/register`,
    'GET_TASKS': `${HOST}:${PORT}/api/tasks?start_time=<START_TIME>&end_time=<END_TIME>`
}