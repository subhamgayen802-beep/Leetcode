const Problem = require("../models/problem");
const Submission = require("../models/submission");
const User = require("../models/user");
const {getLanguageById,submitBatch,submitToken} = require("../utils/problemUtility");

const submitCode = async (req,res)=>{
   
<<<<<<< HEAD

=======
  
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    try{
      
       const userId = req.result._id;
       const problemId = req.params.id;

       let {code,language} = req.body;

      if(!userId||!code||!problemId||!language)
        return res.status(400).send("Some field missing");
      

<<<<<<< HEAD
      if(language==='cpp')
        language='c++'
      
      console.log(language);
      
    //    Fetch the problem from database
    const problem =  await Problem.findById(problemId);
    
=======
      
      
       const problem =  await Problem.findById(problemId);

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    const submittedResult = await Submission.create({
          userId,
          problemId,
          code,
          language,
          status:'pending',
          testCasesTotal:problem.hiddenTestCases.length
     })
<<<<<<< HEAD

=======
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    
    const languageId = getLanguageById(language);
   
    const submissions = problem.hiddenTestCases.map((testcase)=>({
        source_code:code,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output
    }));

    
<<<<<<< HEAD
    const submitResult = await submitBatch(submissions);
    
    const resultToken = submitResult.map((value)=> value.token);

    const testResult = await submitToken(resultToken);
    

=======
      const testResult = await submitBatch(submissions);

    
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = 'accepted';
    let errorMessage = null;


    for(const test of testResult){
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status = 'error'
            errorMessage = test.stderr
          }
          else{
            status = 'wrong'
            errorMessage = test.stderr
          }
        }
    }


<<<<<<< HEAD
    // Store the result in Database in Submission
=======
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    submittedResult.status   = status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.errorMessage = errorMessage;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;

    await submittedResult.save();
    
<<<<<<< HEAD
    
=======
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8

    if(!req.result.problemSolved.includes(problemId)){
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }
    
    const accepted = (status == 'accepted')
    res.status(201).json({
      accepted,
      totalTestCases: submittedResult.testCasesTotal,
      passedTestCases: testCasesPassed,
      runtime,
      memory
    });
       
    }
    catch(err){
<<<<<<< HEAD
      res.status(500).send("Sorry We Dont Have a Judge0 Api key "+ err);
=======
<<<<<<< HEAD
      res.status(500).send("Sorry We Dont Have a judge0 Submission key "+ err);
=======
      res.status(500).send("Internal Server Error "+ err);
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
>>>>>>> 2a37b0ac49fc524d305b52d6207bd53f0a725afb
    }
}


const runCode = async(req,res)=>{
    
<<<<<<< HEAD
  
=======
     
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
     try{
      const userId = req.result._id;
      const problemId = req.params.id;

      let {code,language} = req.body;

     if(!userId||!code||!problemId||!language)
       return res.status(400).send("Some field missing");
<<<<<<< HEAD


      const problem =  await Problem.findById(problemId);

      if(language==='cpp')
        language='c++'



   const languageId = getLanguageById(language);

   const submissions = problem.visibleTestCases.map((testcase)=>({
       source_code:code,
       language_id: languageId,
       stdin: testcase.input,
=======
      const problem =  await Problem.findById(problemId);

  

     const languageId = getLanguageById(language);
  
     const submissions = problem.visibleTestCases.map((testcase)=>({
         source_code:code,
         language_id: languageId,
         stdin: testcase.input,
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
       expected_output: testcase.output
   }));


   const submitResult = await submitBatch(submissions);
   
   const resultToken = submitResult.map((value)=> value.token);

   const testResult = await submitToken(resultToken);

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = true;
    let errorMessage = null;

    for(const test of testResult){
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status = false
            errorMessage = test.stderr
          }
          else{
            status = false
            errorMessage = test.stderr
          }
        }
    }

   
  
   res.status(201).json({
    success:status,
    testCases: testResult,
    runtime,
    memory
   });
      
   }
   catch(err){
     res.status(500).send("Internal Server Error "+ err);
   }
}


<<<<<<< HEAD
module.exports = {submitCode,runCode};
=======
module.exports = {submitCode,runCode};


>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
