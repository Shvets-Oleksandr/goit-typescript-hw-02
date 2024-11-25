import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';

interface UnsplashImage {
 id: string;
  alt_description?: string;
  urls: {
    small: string;
    regular: string;
  };
  likes: number;
  user: {
    first_name: string;
    profile_image: {
      large: string;
    };
  };
}

interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export const axiosImg = async (
  query: string,
  page: number
): Promise<AxiosResponse<UnsplashResponse>> => {
  const axiosParams = {
    params: {
      client_id: 'Gozi7hKDRuFHQPe2kGfSCz7Wn_z4Z8vgzcDhyUSmr-c',
      page: page,
      query: query,
      per_page: 12,
    },
  };

  const response = (await axios.get) < UnsplashResponse > ('', axiosParams);

  return response;
};
