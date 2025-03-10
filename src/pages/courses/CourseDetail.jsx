import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const CourseDetailContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 40px auto;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }

  .course-image {
    width: 100%;
    height: 400px;
    background-color: #f5f5f5;
    object-fit: cover;
  }

  .course-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .course-id-badge {
    display: inline-block;
    background-color: #f2f2f2;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }

  .course-content {
    padding: 30px;
    display: flex;
    flex-direction: column;
  }

  .course-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #333;
  }

  .course-subtitle {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }

  .course-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    padding-top: 20px;
    border-top: 1px solid #eaeaea;
  }

  .info-item {
    display: flex;
    flex-direction: column;
  }

  .info-label {
    font-weight: 600;
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
  }

  .info-value {
    color: #777;
    font-size: 16px;
  }

  .course-price {
    font-weight: 700;
    font-size: 24px;
    color: #333;
    margin-bottom: 16px;
    &::before {
      content: '$';
    }
  }

  .course-description {
    font-size: 16px;
    line-height: 1.7;
    color: #555;
    margin-bottom: 30px;
  }

  .course-button {
    background-color: #2d9cdb;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    align-self: center;
    transition: background-color 0.3s;
    margin-top: auto;
    width: 50%;
  }

  .course-button:hover {
    background-color: #2180b9;
  }

  .back-link {
    display: inline-block;
    margin-top: 30px;
    color: #2d9cdb;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .loading-container {
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #666;
  }
`;

const CourseDetail = () => {
  // Get the courseId parameter from the URL
  const { courseId } = useParams();

  // State to store course data
  const [courseData, setCourseData] = useState(null);

  // State for loading status
  const [loading, setLoading] = useState(true);

  // Fetch course data based on the ID
  useEffect(() => {
    // This would be your actual API call
    // Example: const fetchCourse = async () => {
    //   try {
    //     const response = await fetch(`/api/courses/${courseId}`);
    //     const data = await response.json();
    //     setCourseData(data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching course:', error);
    //     setLoading(false);
    //   }
    // };
    // fetchCourse();

    // Simulated API call for demonstration
    const fetchCourse = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data - replace with actual API call
        const mockCourseData = {
          id: courseId,
          title: `Advanced Web Development ${courseId}`,
          subtitle: 'Master modern frameworks and backend technologies',
          duration: '10 weeks (60 hours)',
          level: 'Advanced',
          instructor: 'Prof. Michael Chen',
          credits: '4',
          price: 199.99,
          description:
            'This comprehensive course takes your web development skills to the next level. You will learn to build scalable applications using modern JavaScript frameworks like React and backend technologies including Node.js and Express. The course includes hands-on projects that simulate real-world development scenarios, helping you build a professional portfolio of work.',
          imageSrc: 'https://example.com/images/course-image.jpg', // Replace with your image path
        };

        setCourseData(mockCourseData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <CourseDetailContainer>
        <div className='loading-container'>Loading course information...</div>
      </CourseDetailContainer>
    );
  }

  return (
    <CourseDetailContainer>
      <img
        className='course-image'
        src={courseData.imageSrc || '/placeholder-image.jpg'}
        alt={courseData.title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.backgroundColor = '#f5f5f5';
          e.target.style.display = 'block';
          e.target.style.minHeight = '300px';
          e.target.style.textIndent = '-9999px';
        }}
      />
      <div className='course-content'>
        <div className='course-header'>
          <div>
            <div className='course-id-badge'>Course ID: {courseData.id}</div>
            <h1 className='course-title'>{courseData.title}</h1>
            <p className='course-subtitle'>{courseData.subtitle}</p>
          </div>
          <p className='course-price'>{courseData.price.toFixed(2)}</p>
        </div>

        <div className='course-info-grid'>
          <div className='info-item'>
            <span className='info-label'>Duration</span>
            <span className='info-value'>{courseData.duration}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Level</span>
            <span className='info-value'>{courseData.level}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Instructor</span>
            <span className='info-value'>{courseData.instructor}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Credits</span>
            <span className='info-value'>{courseData.credits}</span>
          </div>
        </div>

        <div className='course-description'>
          <p>{courseData.description}</p>
        </div>

        <button className='course-button'>Enroll Now</button>

        <Link to='/courses' className='back-link'>
          ← Back to All Courses
        </Link>
      </div>
    </CourseDetailContainer>
  );
};

export default CourseDetail;
