import axios from "axios";

const authPoster = async (props) => {
  try {
    const response = await axios.post(props.url, props.data, {
      withCredentials: true,
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default authPoster;
