import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
<<<<<<< HEAD
        setSubmissions(response.data);
=======
        const raw = response.data;
        if (Array.isArray(raw)) {
          setSubmissions(raw);
        } else if (raw && Array.isArray(raw.submissions)) {
          setSubmissions(raw.submissions);
        } else if (raw && Array.isArray(raw.data)) {
          setSubmissions(raw.data);
        } else {
          console.warn('Unexpected submissions response shape:', raw);
          setSubmissions([]);
        }

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'badge-success';
<<<<<<< HEAD
      case 'wrong': return 'badge-error';
      case 'error': return 'badge-warning';
      case 'pending': return 'badge-info';
      default: return 'badge-neutral';
=======
      case 'wrong':    return 'badge-error';
      case 'error':    return 'badge-warning';
      case 'pending':  return 'badge-info';
      default:         return 'badge-neutral';
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    }
  };

  const formatMemory = (memory) => {
<<<<<<< HEAD
=======
    if (!memory) return 'N/A';
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
<<<<<<< HEAD
=======
    if (!dateString) return 'N/A';
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Submission History</h2>
<<<<<<< HEAD
      
=======

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
      {submissions.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>No submissions found for this problem</span>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Runtime</th>
                  <th>Memory</th>
                  <th>Test Cases</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, index) => (
                  <tr key={sub._id}>
                    <td>{index + 1}</td>
                    <td className="font-mono">{sub.language}</td>
                    <td>
                      <span className={`badge ${getStatusColor(sub.status)}`}>
<<<<<<< HEAD
                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      </span>
                    </td>
                    
                    <td className="font-mono">{sub.runtime}sec</td>
                    <td className="font-mono">{formatMemory(sub.memory)}</td>
                    <td className="font-mono">{sub.testCasesPassed}/{sub.testCasesTotal}</td>
                    <td>{formatDate(sub.createdAt)}</td>
                    <td>
                      <button 
                        className="btn btn-s btn-outline"
=======
                        {sub.status
                          ? sub.status.charAt(0).toUpperCase() + sub.status.slice(1)
                          : 'Unknown'}
                      </span>
                    </td>
                    <td className="font-mono">{sub.runtime ?? 'N/A'} sec</td>
                    <td className="font-mono">{formatMemory(sub.memory)}</td>
                    <td className="font-mono">{sub.testCasesPassed ?? 0}/{sub.testCasesTotal ?? 0}</td>
                    <td>{formatDate(sub.createdAt)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline"
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        Code
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
<<<<<<< HEAD
            Showing {submissions.length} submissions
=======
            Showing {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
          </p>
        </>
      )}

      {/* Code View Modal */}
      {selectedSubmission && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-4">
              Submission Details: {selectedSubmission.language}
            </h3>
<<<<<<< HEAD
            
=======

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`badge ${getStatusColor(selectedSubmission.status)}`}>
                  {selectedSubmission.status}
                </span>
                <span className="badge badge-outline">
<<<<<<< HEAD
                  Runtime: {selectedSubmission.runtime}s
=======
                  Runtime: {selectedSubmission.runtime ?? 'N/A'} s
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
                </span>
                <span className="badge badge-outline">
                  Memory: {formatMemory(selectedSubmission.memory)}
                </span>
                <span className="badge badge-outline">
<<<<<<< HEAD
                  Passed: {selectedSubmission.testCasesPassed}/{selectedSubmission.testCasesTotal}
                </span>
              </div>
              
=======
                  Passed: {selectedSubmission.testCasesPassed ?? 0}/{selectedSubmission.testCasesTotal ?? 0}
                </span>
              </div>

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
              {selectedSubmission.errorMessage && (
                <div className="alert alert-error mt-2">
                  <div>
                    <span>{selectedSubmission.errorMessage}</span>
                  </div>
                </div>
              )}
            </div>
<<<<<<< HEAD
            
            <pre className="p-4 bg-gray-900 text-gray-100 rounded overflow-x-auto">
              <code>{selectedSubmission.code}</code>
            </pre>
            
            <div className="modal-action">
              <button 
=======

            <pre className="p-4 bg-gray-900 text-gray-100 rounded overflow-x-auto">
              <code>{selectedSubmission.code}</code>
            </pre>

            <div className="modal-action">
              <button
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
                className="btn"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;