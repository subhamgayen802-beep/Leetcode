import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const editorRef = useRef(null);
  let { problemId } = useParams();

  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        if (!response.data) {
          console.error('API returned null for problem:', problemId);
          setLoading(false);
          return;
        }

        const problemData = response.data;
        if (!problemData.startCode || problemData.startCode.length === 0) {
          console.error('Problem has no startCode:', problemData);
          setProblem(problemData);
          setCode('');
          setLoading(false);
          return;
        }
        const startCodeEntry = problemData.startCode.find(
          sc => sc.language === selectedLanguage
        );

        setProblem(problemData);
        setCode(startCodeEntry?.initialCode ?? '');
        setLoading(false);

      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem && problem.startCode) {
      const entry = problem.startCode.find(sc => sc.language === selectedLanguage);
      setCode(entry?.initialCode ?? '');
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);

    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });

      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');

    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        error: 'Internal server error'
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);

    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });

      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');

    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'python': return 'python';
      default: return 'javascript';
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': 
        return 'bg-emerald-500/10 text-emerald-455 border border-emerald-500/20';
      case 'medium': 
        return 'bg-amber-500/10 text-amber-455 border border-amber-500/20';
      case 'hard': 
        return 'bg-rose-500/10 text-rose-450 border border-rose-500/20';
      default: 
        return 'bg-zinc-800 text-zinc-400 border border-zinc-700';
    }
  };

  const formatMemory = (memory) => {
    if (!memory) return 'N/A';
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  if (loading && !problem) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-screen bg-[#09090B]">
        <span className="loading loading-spinner loading-lg text-white"></span>
        <p className="text-xs text-zinc-550 font-mono tracking-wider">BOOTING DEV WORKSPACE...</p>
      </div>
    );
  }

  if (!loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#09090B] px-4">
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-450 px-6 py-4 rounded-lg max-w-md shadow-sm flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-sm font-medium">Problem not found. Please check the URL or try again.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[#09090B] text-zinc-200 overflow-hidden font-sans">
      {}
      <div className="w-1/2 flex flex-col border-r border-[#27272A] bg-[#09090B]">
        
        {}
        <div className="flex border-b border-[#27272A] bg-[#09090B] px-2 h-12 items-end">
          <button
            onClick={() => setActiveLeftTab('description')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-md transition-all border-b-2 ${
              activeLeftTab === 'description'
                ? 'border-white text-white bg-[#18181B]'
                : 'border-transparent text-zinc-450 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Description
          </button>
          
          <button
            onClick={() => setActiveLeftTab('editorial')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-md transition-all border-b-2 ${
              activeLeftTab === 'editorial'
                ? 'border-white text-white bg-[#18181B]'
                : 'border-transparent text-zinc-450 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Editorial
          </button>

          <button
            onClick={() => setActiveLeftTab('solutions')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-md transition-all border-b-2 ${
              activeLeftTab === 'solutions'
                ? 'border-white text-white bg-[#18181B]'
                : 'border-transparent text-zinc-450 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            Solutions
          </button>

          <button
            onClick={() => setActiveLeftTab('submissions')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-md transition-all border-b-2 ${
              activeLeftTab === 'submissions'
                ? 'border-white text-white bg-[#18181B]'
                : 'border-transparent text-zinc-450 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Submissions
          </button>

          <button
            onClick={() => setActiveLeftTab('chatAI')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-md transition-all border-b-2 ${
              activeLeftTab === 'chatAI'
                ? 'border-white text-white bg-[#18181B]'
                : 'border-transparent text-zinc-450 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            ChatAI
          </button>
        </div>

        {}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          
          {activeLeftTab === 'description' && (
            <div className="space-y-6">
              {}
              <div className="pb-5 border-b border-[#27272A]">
                <h1 className="text-2xl font-bold tracking-tight text-white mb-3">{problem.title}</h1>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getDifficultyBadge(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-zinc-800 text-zinc-300 border border-[#27272A] capitalize">
                    {problem.tags}
                  </span>
                  <span className="text-xs text-zinc-550 flex items-center gap-1 ml-2">
                    <svg className="w-3.5 h-3.5 text-zinc-650" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Acceptance: 61.2%
                  </span>
                </div>
              </div>

              {}
              <div className="prose prose-invert max-w-none text-sm text-zinc-300 leading-relaxed font-normal">
                <div className="whitespace-pre-wrap">{problem.description}</div>
              </div>

              {}
              {problem.visibleTestCases && problem.visibleTestCases.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-bold text-white tracking-wide">Examples</h3>
                  <div className="grid gap-3">
                    {problem.visibleTestCases.map((example, index) => (
                      <div key={index} className="bg-[#18181B] border border-[#27272A] rounded-lg p-5 shadow-sm">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">Example {index + 1}</span>
                        <div className="space-y-3.5 text-sm font-mono leading-relaxed">
                          <div className="flex gap-2">
                            <span className="text-zinc-555 select-none w-16">Input:</span>
                            <span className="text-zinc-300">{example.input}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-zinc-555 select-none w-16">Output:</span>
                            <span className="text-emerald-400">{example.output}</span>
                          </div>
                          {example.explanation && (
                            <div className="flex gap-2 pt-2 border-t border-[#27272A]/50 text-xs text-zinc-500">
                              <span className="text-zinc-555 select-none w-16">Explain:</span>
                              <span>{example.explanation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeLeftTab === 'editorial' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-[#27272A] pb-3 mb-4">Editorial Walkthrough</h2>
              <div className="bg-[#09090B] rounded-lg p-1">
                <Editorial
                  secureUrl={problem.secureUrl}
                  thumbnailUrl={problem.thumbnailUrl}
                  duration={problem.duration}
                />
              </div>
            </div>
          )}

          {activeLeftTab === 'solutions' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-[#27272A] pb-3 mb-4">Official Solutions</h2>
              <div className="space-y-4">
                {problem.referenceSolution && problem.referenceSolution.length > 0 ? (
                  problem.referenceSolution.map((solution, index) => (
                    <div key={index} className="border border-[#27272A] rounded-lg overflow-hidden bg-[#18181B] shadow-sm">
                      <div className="bg-[#202024] px-4 py-3 border-b border-[#27272A] flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-zinc-200 capitalize">{solution.language} Reference Solution</h3>
                        <span className="px-2 py-0.5 text-3xs uppercase font-mono rounded bg-zinc-800 text-zinc-350 border border-zinc-700/50">Active</span>
                      </div>
                      <div className="p-4">
                        <pre className="bg-[#09090B] p-4 rounded-md text-xs font-mono overflow-x-auto text-zinc-250 border border-[#27272A]/40">
                          <code>{solution.completeCode}</code>
                        </pre>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-8 text-center">
                    <svg className="w-10 h-10 text-zinc-650 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <p className="text-sm text-zinc-550">Reference solutions will unlock after solving this problem.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeLeftTab === 'submissions' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-[#27272A] pb-3 mb-4">My Submissions</h2>
              <div className="bg-[#09090B]">
                <SubmissionHistory problemId={problemId} />
              </div>
            </div>
          )}

          {activeLeftTab === 'chatAI' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-[#27272A] pb-3 mb-4">
                AI Assistant Guidance
              </h2>
              <div className="bg-[#18181B] border border-[#27272A]/80 rounded-lg p-4 shadow-sm">
                <ChatAi problem={problem} />
              </div>
            </div>
          )}

        </div>
      </div>

      {}
      <div className="w-1/2 flex flex-col bg-[#09090B]">
        
        {}
        <div className="flex border-b border-[#27272A] bg-[#09090B] px-2 h-12 items-end justify-between">
          <div className="flex">
            <button
              onClick={() => setActiveRightTab('code')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-t-md transition-all border-b-2 ${
                activeRightTab === 'code'
                  ? 'border-white text-white bg-[#18181B]'
                  : 'border-transparent text-zinc-450 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              Workspace Code
            </button>
            <button
              onClick={() => setActiveRightTab('testcase')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-t-md transition-all border-b-2 ${
                activeRightTab === 'testcase'
                  ? 'border-white text-white bg-[#18181B]'
                  : 'border-transparent text-zinc-450 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Console Output
            </button>
            <button
              onClick={() => setActiveRightTab('result')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-t-md transition-all border-b-2 ${
                activeRightTab === 'result'
                  ? 'border-white text-white bg-[#18181B]'
                  : 'border-transparent text-zinc-455 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" /></svg>
              Submission Status
            </button>
          </div>

          <div className="hidden md:flex items-center text-[10px] text-zinc-500 font-mono pr-4 gap-1.5 self-center">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-650"></span>
            <span>ENV: NODEJS v18</span>
          </div>
        </div>

        {}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {activeRightTab === 'code' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {}
              <div className="flex justify-between items-center px-4 py-2 border-b border-[#27272A] bg-[#18181B]">
                <div className="flex gap-1.5">
                  {['javascript', 'python'].map((lang) => (
                    <button
                      key={lang}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                        selectedLanguage === lang 
                          ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/50' 
                          : 'text-zinc-450 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang === 'python' ? 'Python 3' : 'JavaScript (ES6)'}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-zinc-500 hover:text-white cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0" /></svg>
                </div>
              </div>

              {}
              <div className="flex-1 relative bg-[#1E1E1E]">
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: 'line',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    mouseWheelZoom: true,
                  }}
                />
              </div>

              {}
              <div className="p-4 border-t border-[#27272A] bg-[#18181B] flex justify-between items-center shadow-sm">
                <button
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#27272A] rounded-md transition-all"
                  onClick={() => setActiveRightTab('testcase')}
                >
                  Console Panel
                </button>
                <div className="flex gap-2">
                  <button
                    className={`btn btn-sm btn-outline border-[#27272A] hover:bg-white/5 text-zinc-300 font-semibold px-4 capitalize rounded-md ${loading ? 'loading' : ''}`}
                    onClick={handleRun}
                    disabled={loading}
                  >
                    Run Code
                  </button>
                  <button
                    className={`btn btn-sm bg-white hover:bg-zinc-200 border-none text-black font-bold px-4 capitalize rounded-md shadow-sm ${loading ? 'loading' : ''}`}
                    onClick={handleSubmitCode}
                    disabled={loading}
                  >
                    Submit Code
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRightTab === 'testcase' && (
            <div className="flex-1 p-6 overflow-y-auto bg-[#09090B] scrollbar-thin">
              <h3 className="font-bold text-white tracking-wide text-sm mb-4 flex items-center gap-2">
                <span className="w-1.5 h-3 bg-zinc-450 rounded-sm"></span>
                Console Execution Results
              </h3>
              
              {runResult ? (
                <div className={`border rounded-lg overflow-hidden shadow-sm ${
                  runResult.success 
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-450' 
                    : 'bg-rose-500/5 border-rose-500/20 text-rose-455'
                }`}>
                  <div className={`px-4 py-3 border-b flex items-center justify-between text-xs font-bold uppercase tracking-wider ${
                    runResult.success 
                      ? 'bg-emerald-500/10 border-emerald-500/10 text-emerald-455' 
                      : 'bg-rose-500/10 border-rose-500/10 text-rose-455'
                  }`}>
                    <span>{runResult.success ? 'Success: All testcases passed' : 'Error: Test failure'}</span>
                    <span className="text-zinc-500 font-mono lowercase">
                      time: {runResult.runtime}s | mem: {formatMemory(runResult.memory)}
                    </span>
                  </div>

                  <div className="p-4 space-y-4">
                    {runResult.testCases?.map((tc, i) => (
                      <div key={i} className="bg-[#18181B] border border-[#27272A] p-4 rounded-lg">
                        <div className="flex justify-between items-center text-2xs uppercase tracking-wider text-zinc-550 font-bold border-b border-[#27272A]/40 pb-2 mb-3">
                          <span>Test Case {i + 1}</span>
                          <span className={tc.status_id === 3 ? 'text-emerald-400' : 'text-rose-450'}>
                            {tc.status_id === 3 ? '✓ Passed' : '✗ Failed'}
                          </span>
                        </div>
                        <div className="space-y-2 text-xs font-mono">
                          <div className="flex gap-2">
                            <span className="text-zinc-550 select-none w-16">Input:</span>
                            <span className="text-zinc-350">{tc.stdin}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-zinc-555 select-none w-16">Expected:</span>
                            <span className="text-zinc-400">{tc.expected_output}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-zinc-555 select-none w-16">Output:</span>
                            <span className="text-zinc-350">{tc.stdout || '(Empty Output)'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 border border-dashed border-[#27272A] rounded-lg text-center p-6 bg-[#18181B]/20">
                  <svg className="w-8 h-8 text-zinc-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-zinc-500">Run code to initialize local testing workspace.</p>
                </div>
              )}
            </div>
          )}

          {activeRightTab === 'result' && (
            <div className="flex-1 p-6 overflow-y-auto bg-[#09090B]">
              <h3 className="font-bold text-white tracking-wide text-sm mb-4 flex items-center gap-2">
                <span className="w-1.5 h-3 bg-zinc-450 rounded-sm"></span>
                Official Submission Status
              </h3>
              
              {submitResult ? (
                <div className={`border rounded-lg overflow-hidden shadow-sm ${
                  submitResult.accepted 
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-450' 
                    : 'bg-rose-500/5 border-rose-500/20 text-rose-455'
                }`}>
                  <div className={`px-4 py-3.5 border-b flex items-center justify-between text-xs font-bold uppercase tracking-wider ${
                    submitResult.accepted 
                      ? 'bg-emerald-500/10 border-emerald-500/10 text-emerald-455' 
                      : 'bg-rose-500/10 border-rose-500/10 text-rose-455'
                  }`}>
                    <span className="text-sm">{submitResult.accepted ? '🎉 Accepted' : `✗ ${submitResult.error || 'Submission Failed'}`}</span>
                    <span className="text-zinc-500 font-mono lowercase text-2xs">
                      {submitResult.runtime ? `time: ${submitResult.runtime}s` : ''} {submitResult.memory ? `| mem: ${formatMemory(submitResult.memory)}` : ''}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center text-xs border-b border-[#27272A]/40 pb-2">
                      <span className="text-zinc-400">Total Test Cases Passed:</span>
                      <span className="font-bold font-mono text-zinc-200">
                        {submitResult.passedTestCases} / {submitResult.totalTestCases}
                      </span>
                    </div>
                    {submitResult.accepted && (
                      <div className="pt-2 text-xs text-zinc-400 leading-relaxed">
                        Your solution beat <span className="text-white font-bold">84.2%</span> of other submissions. Awesome work!
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 border border-dashed border-[#27272A] rounded-lg text-center p-6 bg-[#18181B]/20">
                  <svg className="w-8 h-8 text-zinc-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                  </svg>
                  <p className="text-xs text-zinc-550">Submit solution to initiate global evaluator.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;