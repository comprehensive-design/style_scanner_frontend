import { useState, useEffect} from "react";
import api from "../api/axios";

export const useMe = () => {
  
  const [myProfilePictureUrl, setMyProfilePictureUrl] = useState(null);

  const getProfile = async () => {
    try {
      const response = await api.get(`/api/user/me`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(); 
        setMyProfilePictureUrl(data.profilePictureUrl);
      } catch (error) {console.log(error);}
    };
    fetchProfile();
  }, []);
  return {myProfilePictureUrl};
};
