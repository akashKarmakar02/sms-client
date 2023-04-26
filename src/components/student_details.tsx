import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Student from "./student";
import Skeleton from "./skeleton";

function StudentDetails() {
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [isPending, setIsPending] = useState(true);

  const params = useParams();
  const id = params["id"];

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:8000/student/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setEmail(data["email"]);
          setCourse(data["course"]);
          setRollNo(data["roll_no"]);
          setFirstName(data["name"].split(" ")[0]);
          setLastName(data["name"].split(" ")[1]);
          setAddress(data["address"]);
          setPhone(data["phone_no"]);
          setIsPending(false);
        });
    }, 1000);
  });
  return (
    <>
      {!isPending && (
        <Student
          email={email}
          firstName={firstName}
          lastName={lastName}
          rollNo={rollNo}
          phone={phone}
          course={course}
          address={address}
        />
      )}
      {isPending && <Skeleton />}
    </>
  );
}

export default StudentDetails;
