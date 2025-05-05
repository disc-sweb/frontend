const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5050';

//check if token stored in localStorage
const getAuthToken = () => localStorage.getItem('authToken');

//upload course
export const uploadCourse = async (videoFile) => {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('videoFile', videoFile);

  const response = await fetch(`${backendUrl}/courses/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to upload course');

  return response.json();
};

//get one course
export const getCourseById = async (courseId) => {
  const token = getAuthToken();

  const response = await fetch(`${backendUrl}/courses/${courseId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Failed to fetch course');

  return response.json();
};

//get all courses
export const getAllCourses = async () => {
  const response = await fetch(`${backendUrl}/courses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Failed to fetch all courses');

  return response.json();
};

//edit course
export const editCourse = async (courseId, videoFile) => {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('videoFile', videoFile);

  const response = await fetch(`${backendUrl}/courses/${courseId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to edit course');

  return response.json();
};

//delete course
export const deleteCourse = async (courseId) => {
  const token = getAuthToken();

  const response = await fetch(`${backendUrl}/courses/${courseId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Failed to delete course');

  return response.json();
};

///purchase course
export const purchaseCourse = async (purchaseData) => {
  const response = await fetch(`${backendUrl}/courses/purchaseCourse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(purchaseData),
  });

  if (!response.ok) throw new Error('Failed to purchase course');

  return response.json();
};

//get user courses
export const getUserCourses = async (userData) => {
  const response = await fetch(`${backendUrl}/courses/getUserCourses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error('Failed to fetch user courses');

  return response.json();
};
