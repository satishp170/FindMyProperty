// src/api/mockApi.js

export const fetchUserListings = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', title: '3BHK in Delhi' },
        { id: '2', title: 'Villa in Goa' },
      ]);
    }, 1000);
  });
};

export const fetchLikedProperties = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '3', title: '2BHK in Bangalore' },
        { id: '4', title: 'Studio in Pune' },
      ]);
    }, 1000);
  });
};
