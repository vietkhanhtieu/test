// Trong file api.js
const API_BASE_URL = 'https://localhost:7111/api';

export const fetchAPI = async (endpoint, options = {}) => {
  const config = {
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
  const result = {
    status: response.status, // Lấy status code từ response
    statusText: response.statusText, // Lấy status text từ response
    headers: response.headers, // Nếu bạn cũng cần thông tin từ headers
    data: [],
  };

  if (response.headers.get('content-length') !== '0' && response.headers.get('content-type')?.includes('application/json')) {
    result.data = await response.json(); // Chỉ parse JSON nếu có dữ liệu
  }
  
  return result;
};