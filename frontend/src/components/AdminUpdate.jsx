import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axiosClient from '../utils/axiosClient';

const DIFFICULTIES = ['easy', 'medium', 'hard'];
const LANGUAGES = ['javascript', 'python'];

const defaultTestCase = () => ({ input: '', output: '', explanation: '' });
const defaultStartCode = () => LANGUAGES.map(lang => ({ language: lang, initialCode: '' }));
const defaultSolution = () => LANGUAGES.map(lang => ({ language: lang, completeCode: '' }));



const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get('/problem/getAllProblem');
        const list = Array.isArray(data) ? data
          : Array.isArray(data?.data) ? data.data
          : Array.isArray(data?.problems) ? data.problems
          : [];
        setProblems(list);
      } catch (err) {
        setError(err?.response?.data || 'Failed to fetch problems');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filtered = problems.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tags?.toLowerCase().includes(search.toLowerCase())
  );

  const diffColor = (d) => {
    if (d === 'easy') return 'badge-success';
    if (d === 'medium') return 'badge-warning';
    return 'badge-error';
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="alert alert-error max-w-md"><span>{error}</span></div>
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Update Problem</h1>
        <p className="text-gray-500">Select a problem to edit</p>
      </div>

      <input
        className="input input-bordered w-full mb-6"
        placeholder="Search by title or tag..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <div className="alert alert-info"><span>No problems found.</span></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td className="font-medium">{p.title}</td>
                  <td>
                    <span className={`badge ${diffColor(p.difficulty)}`}>
                      {p.difficulty}
                    </span>
                  </td>
                  <td><span className="badge badge-outline">{p.tags}</span></td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/admin/update/${p._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const UpdateProblemForm = () => {
  const navigate = useNavigate();


  const id = window.location.pathname.split('/').pop();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    difficulty: 'easy',
    tags: '',
    visibleTestCases: [defaultTestCase()],
    hiddenTestCases: [defaultTestCase()],
    startCode: defaultStartCode(),
    referenceSolution: defaultSolution(),
  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get(`/problem/problemById/${id}`);
        if (!data) { setError('Problem not found'); return; }
        setForm({
          title: data.title || '',
          description: data.description || '',
          difficulty: data.difficulty || 'easy',
          tags: data.tags || '',
          visibleTestCases: data.visibleTestCases?.length ? data.visibleTestCases : [defaultTestCase()],
          hiddenTestCases: data.hiddenTestCases?.length ? data.hiddenTestCases : [defaultTestCase()],
          startCode: data.startCode?.length ? data.startCode : defaultStartCode(),
          referenceSolution: data.referenceSolution?.length ? data.referenceSolution : defaultSolution(),
        });
      } catch (err) {
        setError('Failed to load problem');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const setField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const updateTestCase = (type, index, field, value) => {
    const updated = [...form[type]];
    updated[index] = { ...updated[index], [field]: value };
    setField(type, updated);
  };
  const addTestCase = (type) => setField(type, [...form[type], defaultTestCase()]);
  const removeTestCase = (type, index) => {
    if (form[type].length === 1) return;
    setField(type, form[type].filter((_, i) => i !== index));
  };

  const updateCode = (key, index, field, value) => {
    const updated = [...form[key]];
    updated[index] = { ...updated[index], [field]: value };
    setField(key, updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await axiosClient.put(`/problem/updateProblem/${id}`, form);
      setSuccess(true);
      setTimeout(() => navigate('/admin/update'), 1500);
    } catch (err) {
      const msg = err?.response?.data || err?.message || 'Update failed';
      setError(typeof msg === 'string' ? msg : 'Update failed. Check your reference solution.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/update')} className="btn btn-ghost btn-sm">
          ← Back
        </button>
        <div>
          <h1 className="text-3xl font-bold">Edit Problem</h1>
          <p className="text-gray-500 text-sm">Changes will be validated against test cases before saving</p>
        </div>
      </div>

      {error && <div className="alert alert-error mb-6"><span>{error}</span></div>}
      {success && <div className="alert alert-success mb-6"><span>✅ Problem updated! Redirecting...</span></div>}

      <form onSubmit={handleSubmit} className="space-y-8">

        {}
        <section className="card bg-base-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b border-base-300 pb-2">Basic Info</h2>

          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Title</span></label>
            <input
              className="input input-bordered w-full"
              value={form.title}
              onChange={e => setField('title', e.target.value)}
              placeholder="e.g. Two Sum"
              required
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Description</span></label>
            <textarea
              className="textarea textarea-bordered w-full h-36"
              value={form.description}
              onChange={e => setField('description', e.target.value)}
              placeholder="Problem description..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Difficulty</span></label>
              <select
                className="select select-bordered w-full"
                value={form.difficulty}
                onChange={e => setField('difficulty', e.target.value)}
              >
                {DIFFICULTIES.map(d => (
                  <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Tags</span></label>
              <input
                className="input input-bordered w-full"
                value={form.tags}
                onChange={e => setField('tags', e.target.value)}
                placeholder="e.g. Array, HashMap"
                required
              />
            </div>
          </div>
        </section>

        {}
        <TestCaseSection
          title="Visible Test Cases"
          subtitle="Shown to users as examples"
          cases={form.visibleTestCases}
          onChange={(i, f, v) => updateTestCase('visibleTestCases', i, f, v)}
          onAdd={() => addTestCase('visibleTestCases')}
          onRemove={(i) => removeTestCase('visibleTestCases', i)}
        />

        {}
        <TestCaseSection
          title="Hidden Test Cases"
          subtitle="Used for grading only"
          cases={form.hiddenTestCases}
          onChange={(i, f, v) => updateTestCase('hiddenTestCases', i, f, v)}
          onAdd={() => addTestCase('hiddenTestCases')}
          onRemove={(i) => removeTestCase('hiddenTestCases', i)}
        />

        {}
        <section className="card bg-base-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b border-base-300 pb-2">
            Start Code <span className="text-sm font-normal text-gray-500">— boilerplate shown to users</span>
          </h2>
          {form.startCode.map((sc, i) => (
            <div key={sc.language}>
              <label className="label">
                <span className="label-text font-medium capitalize">{sc.language}</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-32 font-mono text-sm"
                value={sc.initialCode}
                onChange={e => updateCode('startCode', i, 'initialCode', e.target.value)}
                placeholder={`Starter code for ${sc.language}...`}
              />
            </div>
          ))}
        </section>

        {}
        <section className="card bg-base-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b border-base-300 pb-2">
            Reference Solution <span className="text-sm font-normal text-gray-500">— validated against test cases on save</span>
          </h2>
          {form.referenceSolution.map((rs, i) => (
            <div key={rs.language}>
              <label className="label">
                <span className="label-text font-medium capitalize">{rs.language}</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-40 font-mono text-sm"
                value={rs.completeCode}
                onChange={e => updateCode('referenceSolution', i, 'completeCode', e.target.value)}
                placeholder={`Complete solution in ${rs.language}...`}
                required
              />
            </div>
          ))}
        </section>

        {}
        <div className="flex justify-end gap-4 pb-10">
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/admin/update')}>
            Cancel
          </button>
          <button
            type="submit"
            className={`btn btn-primary min-w-40 ${submitting ? 'loading' : ''}`}
            disabled={submitting}
          >
            {submitting ? 'Validating & Saving...' : 'Update Problem'}
          </button>
        </div>

      </form>
    </div>
  );
};


const TestCaseSection = ({ title, subtitle, cases, onChange, onAdd, onRemove }) => (
  <section className="card bg-base-200 p-6 space-y-4">
    <h2 className="text-lg font-semibold border-b border-base-300 pb-2">
      {title} <span className="text-sm font-normal text-gray-500">— {subtitle}</span>
    </h2>
    {cases.map((tc, i) => (
      <div key={i} className="bg-base-100 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm">Case {i + 1}</span>
          <button
            type="button"
            className="btn btn-xs btn-error btn-outline"
            onClick={() => onRemove(i)}
            disabled={cases.length === 1}
          >
            Remove
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label"><span className="label-text text-xs">Input</span></label>
            <textarea
              className="textarea textarea-bordered font-mono text-sm h-20"
              value={tc.input}
              onChange={e => onChange(i, 'input', e.target.value)}
              placeholder="e.g. nums = [2,7,11,15], target = 9"
              required
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text text-xs">Expected Output</span></label>
            <textarea
              className="textarea textarea-bordered font-mono text-sm h-20"
              value={tc.output}
              onChange={e => onChange(i, 'output', e.target.value)}
              placeholder="e.g. [0,1]"
              required
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text text-xs">Explanation (optional)</span></label>
          <input
            className="input input-bordered input-sm w-full"
            value={tc.explanation}
            onChange={e => onChange(i, 'explanation', e.target.value)}
            placeholder="Brief explanation..."
          />
        </div>
      </div>
    ))}
    <button type="button" className="btn btn-sm btn-outline w-full" onClick={onAdd}>
      + Add Test Case
    </button>
  </section>
);

export { ProblemList, UpdateProblemForm };