const allowedOrigins = [
    "http://127.0.0.1:5173",
    "http://0.0.0.0:5173",
    "http://localhost:5173", // development
    "https://theprojecthub.vercel.app", // vercel production
    "https://theprojecthubserver.onrender.com",
    "https://projecthub.gautamashutosh.com", // production
    "https://pink-energetic-caridea.cyclic.app", // cyclic deployment
    "https://projecthubbackend.gautamashutosh.com" // aws deployment
];
  
module.exports = allowedOrigins;
    