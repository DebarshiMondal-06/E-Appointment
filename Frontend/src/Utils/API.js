import axios from 'axios';


export const sendData = async (path, method, data) => {
  console.log(data);
  return await axios({
    url: `https://9gmz5l4ab8.execute-api.ap-south-1.amazonaws.com/dev${path}`,
    method,
    data
  }).catch((err) => { console.log(err) });
};

export const getData = async (path, method, data) => {
  return await axios({
    url: `https://9gmz5l4ab8.execute-api.ap-south-1.amazonaws.com/dev${path}?id=${data}`,
    method
  }).catch((err) => { console.log(err) });
};

