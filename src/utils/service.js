import axios from 'axios'

import {API_URL, API_KEY} from './env';

const fetchContacts = (page, option) => {
  let params = {
    companyId: 171,
    page,
  }

  if (option.type === 'us') {
    params = {...params, countryId: 226};
  }

  if (option.filter) {
    params = {...params, query: option.filter};
  }
  console.log('params', params);

  return axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    },
    params,
  })
}

export {fetchContacts};
