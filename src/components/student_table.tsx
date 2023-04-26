import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function StudentTable() {
  const [studentList, setStudentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    fetch("http://localhost:8000/student", { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data!");
        }
        return res.json();
      })
      .then((data) => {
        setStudentList(data);
        console.log(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Aborted");
        } else {
          console.log(err.message);
        }
      });
  }, [navigate]);

  function handleDelete(id: number) {
    fetch("http://localhost:8000/delete-student/" + id, {
      method: "DELETE",
    }).then(() => {
      fetch("http://localhost:8000/student")
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch data!");
          }
          return res.json();
        })
        .then((data) => {
          setStudentList(data);
          console.log(data);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Aborted");
          } else {
            console.log(err.message);
          }
        });
    });
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-800 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              RollNo
            </th>
            <th scope="col" className="px-6 py-3">
              Course
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student) => {
            return (
              <tr
                key={student["id"]}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <Link to={`/student/${student["id"]}`}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {student["name"]}
                  </th>
                </Link>
                <td className="px-6 py-4">{student["email"]}</td>
                <td className="px-6 py-4">{student["roll_no"]}</td>
                <td className="px-6 py-4">{student["course"]}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/update/${student["id"]}`}
                    className="font-medium  text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student["id"])}
                    className="font-medium text-blue-600 mx-2 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
