import React from 'react';

import {
  deleteCourse,
  editCourse,
  getAllCourses,
  getCourseById,
  getUserCourses,
  purchaseCourse,
  uploadCourse,
} from 'common/api/courses';

const TestPage = () => {
  // all the test functions from above
  const testUploadCourse = async () => {
    const fileInput = document.querySelector('#videoUploadInput'); // assuming you have an <input type="file" id="videoUploadInput" />
    const file = fileInput.files[0];

    try {
      const result = await uploadCourse(file);
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Upload failed:', error.message);
    }
  };

  const testGetCourseById = async () => {
    try {
      const result = await getCourseById('1');
      console.log('Fetched course:', result);
    } catch (error) {
      console.error('Failed to fetch course:', error.message);
    }
  };

  const testGetAllCourses = async () => {
    try {
      const result = await getAllCourses();
      console.log('All courses:', result);
    } catch (error) {
      console.error('Failed to fetch all courses:', error.message);
    }
  };

  const testEditCourse = async () => {
    const fileInput = document.querySelector('#videoEditInput'); // assuming another <input type="file" id="videoEditInput" />
    const file = fileInput.files[0];

    try {
      const result = await editCourse('2', file);
      console.log('Edit successful:', result);
    } catch (error) {
      console.error('Edit failed:', error.message);
    }
  };

  const testDeleteCourse = async () => {
    try {
      const result = await deleteCourse('2');
      console.log('Course deleted:', result);
    } catch (error) {
      console.error('Failed to delete course:', error.message);
    }
  };

  const testGetUserCourses = async () => {
    try {
      const userData = {
        userId: '21aa790f-f004-422f-9a0b-b6e7cebda981',
      };

      const result = await getUserCourses(userData);
      console.log('User courses:', result);
    } catch (error) {
      console.error('Failed to fetch user courses:', error.message);
    }
  };

  const testPurchaseCourse = async () => {
    try {
      const purchaseData = {
        userId: '21aa790f-f004-422f-9a0b-b6e7cebda981',
        courseId: '1',
      };

      const result = await purchaseCourse(purchaseData);
      console.log('Purchase successful:', result);
    } catch (error) {
      console.error('Purchase failed:', error.message);
    }
  };

  return (
    <div>
      <input type='file' id='videoUploadInput' />
      <button onClick={testUploadCourse}>Test Upload</button>

      <input type='file' id='videoEditInput' />
      <button onClick={testEditCourse}>Test Edit</button>

      <button onClick={testGetCourseById}>Test Get Course By ID</button>
      <button onClick={testGetAllCourses}>Test Get All Courses</button>
      <button onClick={testDeleteCourse}>Test Delete Course</button>
      <button onClick={testPurchaseCourse}>Test Purchase Course</button>
      <button onClick={testGetUserCourses}>Test Get User Courses</button>
    </div>
  );
};

export default TestPage;
