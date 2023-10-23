import { DivingLog } from '@/interfaces/DivingLog';
import axios from 'axios';

export const backendUrl = 'http://127.0.0.1:8000';

export default {
createDiveLog(data: DivingLog) {
  return axios.post(`${backendUrl}/api/diving-logs/`, data);
},
};