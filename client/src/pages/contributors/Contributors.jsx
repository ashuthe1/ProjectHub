import React from 'react';
import {ContributorProfile} from "../../components";
import './Contributors.css';

const Data = {
    "users": [
       {
        "id": 1,
       },
       {
        "id": 2,
       },
       {
        "id": 3,
       },
       {
        "id": 4,
       }
    ]
}
const userProfile = {
  "login": "ashuthe1",
  "_id": "65ca7adaa6a15735302cf9bf",
  "avatar_url": "https://avatars.githubusercontent.com/u/86846633?v=4",
  "url": "https://api.github.com/users/ashuthe1",
  "html_url": "https://github.com/ashuthe1",
  "followers_url": "https://api.github.com/users/ashuthe1/followers",
  "following_url": "https://api.github.com/users/ashuthe1/following{/other_user}",
  "gists_url": "https://api.github.com/users/ashuthe1/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/ashuthe1/starred{/owner}{/repo}",
  "repos_url": "https://api.github.com/users/ashuthe1/repos",
  "events_url": "https://api.github.com/users/ashuthe1/events{/privacy}",
  "received_events_url": "https://api.github.com/users/ashuthe1/received_events",
  "type": "User",
  "name": "Ashutosh Gautam",
  "blog": "ashutoshgautam.dev",
  "location": "https://github.com/ashuthe1",
  "email": "ashutoshgautam.work@gmail.com",
  "bio": "Upcoming SWE Intern @Cisco🔸5🌟CodeChef🔸Expert @CodeForces 🔸Ex Backend Developer @Rablo🔸ICPC Regionalist'23🔸Problem Setter at iMochaWorks",
  "public_repos": 74,
  "followers": 30,
  "following": 149
}
const Contributors = () => {
  return (
    <div className="user-list">
      {Data.users.map((user) => (
        <ContributorProfile key={user.id} data={userProfile} />
      ))}
    </div>
  );
};

export default Contributors;