import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';

export const axiosImg = async (query, page) => {
    const axiosParams = {
        params: {
            client_id: 'Gozi7hKDRuFHQPe2kGfSCz7Wn_z4Z8vgzcDhyUSmr-c',
            page: page,
            query: query,
            per_page: 12,
        },
    }

    const response = await axios.get('', axiosParams);

    return response;
};

