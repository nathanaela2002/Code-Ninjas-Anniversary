import React, { useState, useEffect } from "react";

interface Submission {
  id: string;
  username: string;
  submissionLink: string;
  timeSubmitted: string;
  approved: boolean | null;
}

const AdminPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/submissions`,
          {
            credentials: "include",
          },
        );
        if (response.ok) {
          const data = await response.json();
          setSubmissions(
            data.filter(
              (submission: Submission) => submission.approved !== true,
            ),
          );
        } else {
          const errorData = await response.json();
          console.error("Error fetching submissions: ", errorData.message);
        }
      } catch (err) {
        console.error("Error fetching submissions: ", err);
      }
    };

    fetchSubmissions();
  }, []);

  const handleApprove = async (id: string) => {
    if (window.confirm("Are you sure you want to APPROVE this submission?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/submissions/${id}`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ decision: "approve" }),
          },
        );
        if (response.ok) {
          setSubmissions((prev) =>
            prev.filter((submission) => submission.id !== id),
          );
          alert(`Submission ${id} approved.`);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (err) {
        console.error("Error approving submission: ", err);
      }
    }
  };

  const handleDisapprove = async (id: string) => {
    const userFeedback = window.prompt(
      "Enter a short message for disapproval:",
    );
    console.log("user feedback: ", userFeedback);

    if (
      window.confirm("Are you sure you want to DISAPPROVE this submission?")
    ) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/submissions/${id}`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              decision: "disapprove",
              feedback: userFeedback,
            }),
          },
        );
        if (response.ok) {
          setSubmissions((prev) =>
            prev.filter((submission) => submission.id !== id),
          );
          alert(`Submission ${id} disapproved.`);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (err) {
        console.error("Error disapproving submission: ", err);
      }
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
                  Submission Link
                </th>
                <th className="px-6 py-3 text-left text-white font-bold uppercase">
                  Created At
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
                  <td className="px-6 py-4">{submission.username}</td>

                  <td className="px-6 py-4">
                    <a
                      href={submission.submissionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {submission.submissionLink}
                    </a>
                  </td>
                  <td className="px-6 py-4">{submission.timeSubmitted}</td>
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
