import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { NavLink } from 'react-router'; // Fixed import
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
=======
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../authSlice';
import { fetchProblems } from '../problemSlice';
import axiosClient from '../utils/axiosClient';
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
<<<<<<< HEAD
  const [problems, setProblems] = useState([]);
=======


  const { data: problems = [], loading } = useSelector((state) => state.problems);

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
<<<<<<< HEAD
    status: 'all' 
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]); // Clear solved problems on logout
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' || 
                      solvedProblems.some(sp => sp._id === problem._id);
    return difficultyMatch && tagMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation Bar */}
      <nav className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-xl">LeetCode</NavLink>
        </div>
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost">
              {user?.firstName}
            </div>
            <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><button onClick={handleLogout}>Logout</button></li>
              {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* New Status Filter */}
          <select 
            className="select select-bordered"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved Problems</option>
          </select>

          <select 
            className="select select-bordered"
            value={filters.difficulty}
            onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select 
            className="select select-bordered"
            value={filters.tag}
            onChange={(e) => setFilters({...filters, tag: e.target.value})}
          >
            <option value="all">All Tags</option>
            <option value="array">Array</option>
            <option value="linkedList">Linked List</option>
            <option value="graph">Graph</option>
            <option value="dp">DP</option>
          </select>
        </div>

        {/* Problems List */}
        <div className="grid gap-4">
          {filteredProblems.map(problem => (
            <div key={problem._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">
                    <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
                      {problem.title}
                    </NavLink>
                  </h2>
                  {solvedProblems.some(sp => sp._id === problem._id) && (
                    <div className="badge badge-success gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Solved
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </div>
                  <div className="badge badge-info">
                    {problem.tags}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
=======
    status: 'all',
    search: '' 
  });

  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    dispatch(fetchProblems());

    if (user) {
      axiosClient.get('/problem/problemSolvedByUser')
        .then(({ data }) => setSolvedProblems(data))
        .catch(console.error);
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    handleLogout();
  };

  
  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty.toLowerCase() === filters.difficulty.toLowerCase();
    const tagMatch = filters.tag === 'all' || (problem.tags && problem.tags.toLowerCase() === filters.tag.toLowerCase());
    const isSolved = solvedProblems.some(sp => sp._id === problem._id);
    const statusMatch = filters.status === 'all' || 
                        (filters.status === 'solved' && isSolved) || 
                        (filters.status === 'unsolved' && !isSolved);
    const searchMatch = filters.search === '' || 
                        problem.title.toLowerCase().includes(filters.search.toLowerCase());
    
    return difficultyMatch && tagMatch && statusMatch && searchMatch;
  });

  const totalProblemsCount = problems.length;
  const solvedProblemsCount = solvedProblems.length;
  const solveRate = totalProblemsCount ? Math.round((solvedProblemsCount / totalProblemsCount) * 100) : 0;

  const easyProblems = problems.filter(p => p.difficulty.toLowerCase() === 'easy');
  const mediumProblems = problems.filter(p => p.difficulty.toLowerCase() === 'medium');
  const hardProblems = problems.filter(p => p.difficulty.toLowerCase() === 'hard');

  const solvedEasy = solvedProblems.filter(p => p.difficulty.toLowerCase() === 'easy').length;
  const solvedMedium = solvedProblems.filter(p => p.difficulty.toLowerCase() === 'medium').length;
  const solvedHard = solvedProblems.filter(p => p.difficulty.toLowerCase() === 'hard').length;

  return (
    <div className="min-h-screen bg-[#09090B] text-[#E4E4E7] font-sans antialiased">
      {/* Premium Navbar - Pitch Black Minimalist */}
      <nav className="sticky top-0 z-40 navbar bg-[#09090B]/90 backdrop-blur-md border-b border-[#27272A] px-6">
        <div className="flex-1 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black text-lg shadow-sm">
            L
          </div>
          <NavLink to="/" className="text-lg font-bold tracking-tight text-white hover:opacity-90">
            LeetCode<span className="text-zinc-550">.</span>
          </NavLink>
        </div>

        <div className="flex-none gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="flex items-center gap-2 btn btn-ghost btn-sm rounded-lg hover:bg-zinc-900 px-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-zinc-300 font-medium">{user.firstName}</span>
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
              <ul tabIndex={0} className="mt-3 p-2 shadow-xl menu menu-sm dropdown-content bg-[#18181B] border border-[#27272A] rounded-lg w-52 text-[#E4E4E7]">
                <li className="px-4 py-2 border-b border-[#27272A] mb-1">
                  <p className="text-xs text-zinc-500">Signed in as</p>
                  <p className="font-semibold text-zinc-200 truncate">{user.emailId}</p>
                </li>
                {user.role === 'admin' && (
                  <li>
                    <NavLink to="/admin" className="hover:bg-zinc-900 py-2.5 rounded-lg flex gap-2 items-center">
                      <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                <li>
                  <button onClick={handleLogoutClick} className="hover:bg-rose-500/10 hover:text-rose-455 py-2.5 rounded-lg flex gap-2 items-center text-rose-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-sm btn-ghost hover:bg-zinc-900 text-zinc-300">Login</NavLink>
          )}
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl p-6 lg:p-8">
        
        {/* Welcome & Dashboard Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Main User Stat Card */}
          <div className="lg:col-span-2 relative overflow-hidden bg-[#18181B] border border-[#27272A] rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Overview</span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1 mb-2 text-white">
                Welcome back, {user?.firstName || 'Guest'}!
              </h1>
              <p className="text-sm text-zinc-400 max-w-md">
                Build coding muscle, solve algorithmic problems, and review solutions with the minimalist developer workspace.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#27272A]">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500">Solved Rate</span>
                <span className="text-2xl font-bold text-white mt-1">{solveRate}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500">Total Solved</span>
                <span className="text-2xl font-bold text-white mt-1">{solvedProblemsCount}<span className="text-xs text-zinc-500 font-normal"> / {totalProblemsCount}</span></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500">Rank</span>
                <span className="text-2xl font-bold text-white mt-1">#4,812</span>
              </div>
            </div>
          </div>

          {/* Difficulty Statistics Panel */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-zinc-300">Problem Statistics</h3>
            
            <div className="space-y-4 my-auto py-2">
              {/* Easy Progress */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-emerald-400">Easy</span>
                  <span className="text-zinc-500">{solvedEasy} / {easyProblems.length}</span>
                </div>
                <div className="w-full bg-[#09090B] border border-[#27272A] rounded-full h-1.5">
                  <div 
                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-550" 
                    style={{ width: `${easyProblems.length ? (solvedEasy / easyProblems.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Medium Progress */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-amber-400">Medium</span>
                  <span className="text-zinc-500">{solvedMedium} / {mediumProblems.length}</span>
                </div>
                <div className="w-full bg-[#09090B] border border-[#27272A] rounded-full h-1.5">
                  <div 
                    className="bg-amber-500 h-1.5 rounded-full transition-all duration-550" 
                    style={{ width: `${mediumProblems.length ? (solvedMedium / mediumProblems.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Hard Progress */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-rose-450">Hard</span>
                  <span className="text-zinc-500">{solvedHard} / {hardProblems.length}</span>
                </div>
                <div className="w-full bg-[#09090B] border border-[#27272A] rounded-full h-1.5">
                  <div 
                    className="bg-rose-500 h-1.5 rounded-full transition-all duration-550" 
                    style={{ width: `${hardProblems.length ? (solvedHard / hardProblems.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-zinc-500 border-t border-[#27272A] pt-3">
              <span>Updated live</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
          </div>
        </div>

        {/* Filters and Control Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-[#18181B]/40 border border-[#27272A] p-4 rounded-xl">
          {/* Left Side: Filter Buttons / Pills */}
          <div className="flex flex-wrap gap-2 items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input 
                type="text" 
                placeholder="Search problems..." 
                className="input input-sm w-full pl-9 pr-4 bg-[#09090B] border-[#27272A] rounded-lg text-sm text-zinc-200 focus:border-white focus:ring-0 focus:outline-none"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>

            {/* Status Selector */}
            <select
              className="select select-sm select-bordered bg-[#09090B] border-[#27272A] rounded-lg text-xs text-zinc-300 focus:border-white focus:outline-none"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Statuses</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>

            {/* Difficulty Pills */}
            <div className="flex bg-[#09090B] p-0.5 border border-[#27272A] rounded-lg gap-0.5">
              {['all', 'easy', 'medium', 'hard'].map((diff) => (
                <button
                  key={diff}
                  className={`px-3 py-1 text-xs font-semibold rounded-md capitalize transition-all ${
                    filters.difficulty === diff 
                      ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/50' 
                      : 'text-zinc-450 hover:text-zinc-200 hover:bg-white/5'
                  }`}
                  onClick={() => setFilters({...filters, difficulty: diff})}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Tags Select */}
            <select
              className="select select-sm select-bordered bg-[#09090B] border-[#27272A] rounded-lg text-xs text-zinc-300 capitalize focus:border-white focus:outline-none"
              value={filters.tag}
              onChange={(e) => setFilters({...filters, tag: e.target.value})}
            >
              <option value="all">All Tags</option>
              <option value="array">Array</option>
              <option value="linkedList">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dp">Dynamic Programming</option>
            </select>
          </div>

          {/* Right Side: Total Matching Count */}
          <div className="text-xs text-zinc-550 font-medium whitespace-nowrap self-end md:self-center">
            Showing <span className="text-white font-bold">{filteredProblems.length}</span> problems
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="loading loading-spinner loading-lg text-[#E4E4E7]"></span>
            <p className="text-sm text-zinc-500">Loading problem directory...</p>
          </div>
        )}

        {/* Problems List Card Grid */}
        {!loading && (
          <div className="grid gap-3">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem, index) => {
                const isSolved = solvedProblems.some(sp => sp._id === problem._id);
                return (
                  <div 
                    key={problem._id} 
                    className="group relative bg-[#18181B] hover:bg-[#202024] border border-[#27272A] hover:border-zinc-700 rounded-lg transition-all duration-200 overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-5 gap-4"
                  >
                    <div className="flex items-start gap-4">
                      {/* Solved Status Indicator Icon */}
                      <div className="mt-1">
                        {isSolved ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-[#09090B] border border-[#27272A] flex items-center justify-center text-zinc-700">
                          </div>
                        )}
                      </div>

                      {/* Problem Header Information */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-xs font-mono text-zinc-550">#{100 + index}</span>
                          <h2 className="text-base font-semibold text-zinc-200 group-hover:text-white transition-colors">
                            <NavLink to={`/problem/${problem._id}`}>
                              {problem.title}
                            </NavLink>
                          </h2>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-semibold uppercase tracking-wider ${getDifficultyBadgeColor(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                          {problem.tags && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-2xs font-medium bg-zinc-800 text-zinc-300 border border-[#27272A] capitalize">
                              {problem.tags}
                            </span>
                          )}
                          <span className="text-xs text-zinc-555 flex items-center gap-1 ml-1">
                            <svg className="w-3.5 h-3.5 text-zinc-650" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Acceptance: 58.4%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <button 
                        onClick={() => setSelectedProblem(problem)}
                        className="btn btn-xs bg-[#09090B] hover:bg-zinc-900 text-zinc-300 border-[#27272A] rounded-md capitalize px-3"
                      >
                        Quick view
                      </button>
                      <NavLink 
                        to={`/problem/${problem._id}`}
                        className="btn btn-xs bg-white hover:bg-zinc-200 border-none text-black font-semibold rounded-md capitalize px-3 shadow-sm"
                      >
                        Solve
                      </NavLink>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-16 border border-dashed border-[#27272A] rounded-xl bg-[#18181B]/10 text-center p-8">
                <svg className="w-12 h-12 text-zinc-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="text-base font-semibold text-zinc-300">No problems found</h3>
                <p className="text-sm text-zinc-555 mt-1 max-w-xs">Try adjusting your filters or search query to find matching problems.</p>
                <button 
                  onClick={() => setFilters({ difficulty: 'all', tag: 'all', status: 'all', search: '' })}
                  className="btn btn-sm bg-[#09090B] hover:bg-zinc-900 text-zinc-300 border-[#27272A] mt-4 rounded-md"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Slide-out problem preview Drawer */}
      {selectedProblem && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity" 
            onClick={() => setSelectedProblem(null)}
          ></div>
          
          {/* Drawer content body */}
          <div className="relative w-full max-w-lg bg-[#09090B] border-l border-[#27272A] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto text-zinc-200">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#27272A] pb-4 mb-5">
                <span className="text-xs font-mono text-zinc-555">Problem Preview</span>
                <button 
                  onClick={() => setSelectedProblem(null)}
                  className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Title & Metadata */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">{selectedProblem.title}</h2>
                <div className="flex gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getDifficultyBadgeColor(selectedProblem.difficulty)}`}>
                    {selectedProblem.difficulty}
                  </span>
                  {selectedProblem.tags && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-800 text-zinc-300 border border-[#27272A] capitalize">
                      {selectedProblem.tags}
                    </span>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Solved: {solvedProblems.some(sp => sp._id === selectedProblem._id) ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              {/* Problem Description Drawer Content */}
              <div className="space-y-4 text-sm text-zinc-300 leading-relaxed border-t border-[#27272A] pt-5">
                <h4 className="font-semibold text-white text-base">Description</h4>
                <p>
                  Given a set of coding conditions, your task is to design a solver that yields the optimal solution within resource constraints.
                </p>
                
                {/* Visual Example card */}
                <div className="bg-[#18181B] rounded-xl p-4 border border-[#27272A] font-mono text-xs text-zinc-400 mt-4 space-y-2">
                  <p><span className="text-white">Input:</span> nums = [2,7,11,15], target = 9</p>
                  <p><span className="text-emerald-400">Output:</span> [0,1]</p>
                  <p><span className="text-zinc-550 font-semibold">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-[#27272A] pt-4 mt-8 flex gap-3">
              <button 
                onClick={() => setSelectedProblem(null)}
                className="btn btn-sm btn-ghost hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 flex-1 rounded-md"
              >
                Close Preview
              </button>
              <NavLink 
                to={`/problem/${selectedProblem._id}`}
                className="btn btn-sm bg-white hover:bg-zinc-200 text-black border-none font-bold flex-1 rounded-md shadow-sm"
              >
                Open in Workspace
              </NavLink>
            </div>
          </div>
        </div>
      )}
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    </div>
  );
}

const getDifficultyBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
<<<<<<< HEAD
    case 'easy': return 'badge-success';
    case 'medium': return 'badge-warning';
    case 'hard': return 'badge-error';
    default: return 'badge-neutral';
=======
    case 'easy':   return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'medium': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'hard':   return 'bg-rose-500/10 text-rose-455 border border-rose-500/20';
    default:       return 'bg-zinc-800 text-zinc-400 border border-[#27272A]';
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
  }
};

export default Homepage;