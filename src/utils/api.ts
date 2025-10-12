import axios from '@/utils/axios.customize';

export const registerAPI = (email: string, name: string, password: string) => {
   const url = `/api/v1/auth/register`;
   return axios.post(url, {email, name, password});
}