import React from 'react';
import {ContributorProfile} from "../../components";

const Data = {
    "users": [
        {
        "id": 1,
        "name": "John Doe",
        "profilePicture": "https://filmfare.wwmindia.com/content/2024/feb/kiaraadvanidon311708765541.jpg",
        "about": "Full Stack Developer",
        "totalStars": 100,
        "skills": ["HTML", "CSS", "JavaScript"]
        },
        {
        "id": 2,
        "name": "Jane Doe",
        "profilePicture": "https://filmfare.wwmindia.com/content/2024/feb/kiaraadvanidon311708765541.jpg",
        "about": "Frontend Developer",
        "totalStars": 200,
        "skills": ["React", "Redux", "JavaScript"]
        },
        {
        "id": 3,
        "name": "John Smith",
        "profilePicture": "https://filmfare.wwmindia.com/content/2024/feb/kiaraadvanidon311708765541.jpg",
        "about": "Backend Developer",
        "totalStars": 300,
        "skills": ["Node.js", "Express", "MongoDB"]
        }
    ]
}
const Contributors = () => {

  return (
    <div className="user-list">
      {Data.users.map((user) => (
        <ContributorProfile key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Contributors;