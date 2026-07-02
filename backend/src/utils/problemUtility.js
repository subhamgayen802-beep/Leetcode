const axios = require('axios');


const getLanguageById = (lang)=>{

    const language = {
      "javascript":63,
      "python": 71
    }


    return language[lang.toLowerCase()];
}


const submitBatch = async (submissions)=>{



const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions',
  params: {
    base64_encoded: 'false',
    wait: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': '3a69be651bmsh26db866c8fa7170p111181jsnc48b7daef320',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
   submissions
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

 return await fetchData();

}


const waiting = async(timer)=>{
  setTimeout(()=>{
    return 1;
  },timer);
}

<<<<<<< HEAD
// ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

=======
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
const submitToken = async(resultToken)=>{


const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resultToken.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': '3a69be651bmsh26db866c8fa7170p111181jsnc48b7daef320',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
};
async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}


 while(true){

 const result =  await fetchData();

  const IsResultObtained =  result.submissions.every((r)=>r.status_id>2);

  if(IsResultObtained)
    return result.submissions;

  
  await waiting(1000);
}



}


module.exports = {getLanguageById,submitBatch,submitToken};









