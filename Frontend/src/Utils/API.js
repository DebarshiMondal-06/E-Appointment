import axios from 'axios';

export const sendData = async (path, method, data, token) => {
  return await axios({
    url: `https://9gmz5l4ab8.execute-api.ap-south-1.amazonaws.com/dev${path}`,
    method,
    data,
    headers: {
      "Authorization": token
    }
  });
};

export const getData = async (path, method, token) => {
  return await axios({
    url: `https://9gmz5l4ab8.execute-api.ap-south-1.amazonaws.com/dev${path}`,
    method,
    headers: {
      "Authorization": token
    },
    validateStatus: () => true
  })
};

