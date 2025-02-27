import React, { useState } from "react";

interface Submission {
  id: number;
  user: string;
  points: number;
  makeCodeUrl: string;
}

const initialSubmissions: Submission[] = [
  {
    id: 1,
    user: "Nathanael Ann",
    points: 102,
    makeCodeUrl: "https://makecode.com/tutorial-tool",
  },
  {
    id: 2,
    user: "Bryan Yang",
    points: 83,
    makeCodeUrl: "https://makecode.com/tutorial-tool",
  },
  {
    id: 3,
    user: "Daniel Yang",
    points: 80,
    makeCodeUrl: "https://makecode.com/tutorial-tool",
  },
  // Add more submissions as needed
];

const AdminPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

  const handleApprove = (id: number) => {
    if (window.confirm("Are you sure you want to APPROVE this submission?")) {
      // Replace with approval logic (e.g. update state or send API request)
      alert(`Submission ${id} approved.`);
    }
  };

  const handleDisapprove = (id: number) => {
    if (window.confirm("Are you sure you want to DISAPPROVE this submission?")) {
      // Replace with disapproval logic (e.g. update state or send API request)
      alert(`Submission ${id} disapproved.`);
    }
  };

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-4xl font-bold">Admin Page</h1>
      </header>
      <main>
        <h2 className="text-2xl font-bold mb-4">Submissions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-400">
              <tr>
                <th className="px-6 py-3 text-left text-white font-bold uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-white font-bold uppercase">
                  Points Earned
                </th>
                <th className="px-6 py-3 text-left text-white font-bold uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-b hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <a
                      href={submission.makeCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {submission.user}
                    </a>
                  </td>
                  <td className="px-6 py-4">{submission.points}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleApprove(submission.id)}
                      className="mr-4 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                    >
                      ✔️
                    </button>
                    <button
                      onClick={() => handleDisapprove(submission.id)}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
