// const HOST = 'http://localhost'
// const PORT = 8000
export const apiEndpoints = {
    'LOGIN': `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/auth/login`,
    'SIGNUP': `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/auth/register`,
    'GET_TASKS': `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/tasks?start_time=<START_TIME>&end_time=<END_TIME>`
}