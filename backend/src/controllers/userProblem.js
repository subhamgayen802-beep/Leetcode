const {getLanguageById,submitBatch,submitToken} = require("../utils/problemUtility");
const Problem = require("../models/problem");
const User = require("../models/user");
const Submission = require("../models/submission");
const SolutionVideo = require("../models/solutionVideo")

const createProblem = async (req,res)=>{
   
<<<<<<< HEAD
  // API request to authenticate user:
    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;

    
    try{
       
      for(const {language,completeCode} of referenceSolution){
         

        // source_code:
        // language_id:
        // stdin: 
        // expectedOutput:

        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions);
        // console.log(submitResult);

        const resultToken = submitResult.map((value)=> value.token);

        // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
        
       const testResult = await submitToken(resultToken);


       console.log(testResult);

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured");
        }
       }

      }


      // We can store it in our DB

    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator: req.result._id
      });

      res.status(201).send("Problem Saved Successfully");
    }
 


    catch(err){
        res.status(400).send("Error: "+err);
    }
=======
  const {title,description,difficulty,tags,
      visibleTestCases,hiddenTestCases,startCode,
      referenceSolution, problemCreator
  } = req.body;

  try{
     
    for(const {language,completeCode} of referenceSolution){

      const languageId = getLanguageById(language);
        
      const submissions = visibleTestCases.map((testcase)=>({
          source_code:completeCode,
          language_id: languageId,
          stdin: testcase.input,
          expected_output: testcase.output
      }));

      
        const submitResult = await submitBatch(submissions);
    

        const resultToken = submitResult.map((value)=> value.token);

      
        
       const testResult = await submitToken(resultToken);

      for(const test of testResult){
        if(test.status_id!=3){
          return res.status(400).send("Error Occured");
        }
      }
    }

    const userProblem = await Problem.create({
      ...req.body,
      problemCreator: req.result._id
    });

    return res.status(201).send("Problem Saved Successfully");
  }
  catch(err){
    return res.status(400).send("Error: "+err);
  }
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
}

const updateProblem = async (req,res)=>{
    
  const {id} = req.params;
  const {title,description,difficulty,tags,
    visibleTestCases,hiddenTestCases,startCode,
    referenceSolution, problemCreator
<<<<<<< HEAD
   } = req.body;

  try{

     if(!id){
      return res.status(400).send("Missing ID Field");
     }

    const DsaProblem =  await Problem.findById(id);
    if(!DsaProblem)
    {
=======
  } = req.body;

  try{

    if(!id){
      return res.status(400).send("Missing ID Field");
    }

    const DsaProblem = await Problem.findById(id);
    if(!DsaProblem){
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
      return res.status(404).send("ID is not persent in server");
    }
      
    for(const {language,completeCode} of referenceSolution){
<<<<<<< HEAD
         

      const languageId = getLanguageById(language);
        
      
=======

      const languageId = getLanguageById(language);
        
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
      const submissions = visibleTestCases.map((testcase)=>({
          source_code:completeCode,
          language_id: languageId,
          stdin: testcase.input,
          expected_output: testcase.output
      }));

<<<<<<< HEAD

      const submitResult = await submitBatch(submissions);
     
      const resultToken = submitResult.map((value)=> value.token);

     const testResult = await submitToken(resultToken);

  

     for(const test of testResult){
      if(test.status_id!=3){
       return res.status(400).send("Error Occured");
      }
     }

    }


  const newProblem = await Problem.findByIdAndUpdate(id , {...req.body}, {runValidators:true, new:true});
   
  res.status(200).send(newProblem);
  }
  catch(err){
      res.status(500).send("Error: "+err);
=======
    
        const submitResult = await submitBatch(submissions);
      
        const resultToken = submitResult.map((value)=> value.token);

       
        
       const testResult = await submitToken(resultToken);

      for(const test of testResult){
        if(test.status_id!=3){
          return res.status(400).send("Error Occured");
        }
      }
    }

    const newProblem = await Problem.findByIdAndUpdate(id, {...req.body}, {runValidators:true, new:true});
   
    return res.status(200).send(newProblem);
  }
  catch(err){
    return res.status(500).send("Error: "+err);
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
  }
}

const deleteProblem = async(req,res)=>{

  const {id} = req.params;
  try{
     
    if(!id)
      return res.status(400).send("ID is Missing");

<<<<<<< HEAD
   const deletedProblem = await Problem.findByIdAndDelete(id);

   if(!deletedProblem)
    return res.status(404).send("Problem is Missing");


   res.status(200).send("Successfully Deleted");
  }
  catch(err){
     
    res.status(500).send("Error: "+err);
=======
    const deletedProblem = await Problem.findByIdAndDelete(id);

    if(!deletedProblem)
      return res.status(404).send("Problem is Missing");

    return res.status(200).send("Successfully Deleted");
  }
  catch(err){
    return res.status(500).send("Error: "+err);
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
  }
}


const getProblemById = async(req,res)=>{

  const {id} = req.params;
  try{
     
    if(!id)
      return res.status(400).send("ID is Missing");

<<<<<<< HEAD
    const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution ');
   

   if(!getProblem)
    return res.status(404).send("Problem is Missing");

   const videos = await SolutionVideo.findOne({problemId:id});

   if(videos){   
    
   const responseData = {
    ...getProblem.toObject(),
    secureUrl:videos.secureUrl,
    thumbnailUrl : videos.thumbnailUrl,
    duration : videos.duration,
   } 
  
   return res.status(200).send(responseData);
   }
    
   res.status(200).send(getProblem);

  }
  catch(err){
    res.status(500).send("Error: "+err);
=======
    const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution');
   
    if(!getProblem)
      return res.status(404).send("Problem is Missing");

    const videos = await SolutionVideo.findOne({problemId:id});

    if(videos){   
      const responseData = {
        ...getProblem.toObject(),
        secureUrl: videos.secureUrl,
        thumbnailUrl: videos.thumbnailUrl,
        duration: videos.duration,
      };
      return res.status(200).send(responseData);
    }
    
    return res.status(200).send(getProblem);
  }
  catch(err){
    return res.status(500).send("Error: "+err);
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
  }
}

const getAllProblem = async(req,res)=>{

  try{
     
    const getProblem = await Problem.find({}).select('_id title difficulty tags');

<<<<<<< HEAD
   if(getProblem.length==0)
    return res.status(404).send("Problem is Missing");


   res.status(200).send(getProblem);
  }
  catch(err){
    res.status(500).send("Error: "+err);
=======
    if(getProblem.length==0)
      return res.status(404).send("Problem is Missing");

    return res.status(200).send(getProblem);
  }
  catch(err){
    return res.status(500).send("Error: "+err);
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
  }
}


<<<<<<< HEAD
const solvedAllProblembyUser =  async(req,res)=>{
   
    try{
       
      const userId = req.result._id;

      const user =  await User.findById(userId).populate({
        path:"problemSolved",
        select:"_id title difficulty tags"
      });
      
      res.status(200).send(user.problemSolved);

    }
    catch(err){
      res.status(500).send("Server Error");
    }
=======
const solvedAllProblembyUser = async(req,res)=>{
   
  try{
     
    const userId = req.result._id;

    const user = await User.findById(userId).populate({
      path:"problemSolved",
      select:"_id title difficulty tags"
    });
    
    return res.status(200).send(user.problemSolved);
  }
  catch(err){
    return res.status(500).send("Server Error");
  }
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
}

const submittedProblem = async(req,res)=>{

  try{
     
    const userId = req.result._id;
    const problemId = req.params.pid;

<<<<<<< HEAD
   const ans = await Submission.find({userId,problemId});
  
  if(ans.length==0)
    res.status(200).send("No Submission is persent");

  res.status(200).send(ans);

  }
  catch(err){
     res.status(500).send("Internal Server Error");
=======
    const ans = await Submission.find({userId, problemId});
  
    if(ans.length == 0)
      return res.status(200).send([]);

    return res.status(200).send(ans);
  }
  catch(err){
    return res.status(500).send("Internal Server Error");
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
  }
}



<<<<<<< HEAD
module.exports = {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser,submittedProblem};


=======
module.exports = {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser,submittedProblem};
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
