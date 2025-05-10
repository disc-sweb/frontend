import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from 'common/contexts/UserContext';

const StyledComponent = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 500px; /* Increased from 450px */
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .card-image {
    width: 100%;
    min-width: 470px; /* Increased from 420px */
    height: 300px; /* Increased from 260px */
    background-color: #f5f5f5;
    object-fit: cover;
  }

  .card-content {
    padding: 24px; /* Increased from 20px */
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 20px; /* Increased from 18px */
    font-weight: 600;
    margin-bottom: 8px; /* Increased from 5px */
    color: #333;
  }

  .card-duration {
    font-size: 14px; /* Increased from 12px */
    color: #666;
    margin-bottom: 10px; /* Increased from 8px */
  }

  .card-price {
    font-weight: 600;
    font-size: 18px; /* Added font-size */
    color: #333;
    margin-bottom: 16px; /* Increased from 12px */
    &::before {
      content: '$';
    }
  }

  .card-description {
    font-size: 15px; /* Increased from 14px */
    line-height: 1.6; /* Increased from 1.5 */
    color: #555;
    margin-bottom: 24px; /* Increased from 20px */
  }

  .card-button {
    background-color: #2d9cdb;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px; /* Increased from 8px 16px */
    font-size: 15px; /* Increased from 14px */
    cursor: pointer;
    align-self: center; /* Changed from flex-middle to center */
    transition: background-color 0.3s;
    margin-top: auto;
    width: 60%; /* Added width to make button more prominent */
  }

  .card-button:hover {
    background-color: #2180b9;
  }

  .admin-controls button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }

  .admin-controls button.edit svg {
    fill: green;
  }

  .admin-controls button.delete svg {
    fill: red;
  }
`;

const CourseCard = ({
  course_id,
  course_title,
  course_duration,
  course_price,
  course_description,
  course_image,
}) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGoToCourse = () => {
    navigate(`/courses/${course_id}`);
  };

  const handleEditCourse = () => {
    //UPDATE WITH RIGHT PATH
    navigate(`/admin/edit-course/${course_id}`);
  };

  const handleDeleteCourse = async (course_id) => {
    try {
      const response = await fetch(`/api/courses/${course_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to delete course:', data.error || data.message);
        alert(`Failed to delete course: ${data.error || data.message}`);
        return;
      }

      alert('Course deleted successfully!');
      // Optionally trigger a re-fetch or remove the course from UI state
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('An unexpected error occurred while deleting the course.');
    }
  };

  return (
    <StyledComponent>
      <img
        className='card-image'
        src={course_image}
        alt={`Cover for ${course_title}`}
      />
      <div className='card-content'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 className='card-title'>{course_title}</h3>
          {user?.admin_access && (
            <div
              className='admin-controls'
              style={{ display: 'flex', gap: '10px' }}
            >
              <button onClick={handleEditCourse} className='edit'>
                <FaEdit color='green' />
              </button>

              <button onClick={handleDeleteCourse} className='delete'>
                <FaTrash color='red' />
              </button>
            </div>
          )}
        </div>
        <p className='card-duration'>{course_duration}</p>
        <p className='card-price'>{course_price.toFixed(2)}</p>
        <p className='card-description'>{course_description}</p>
        <button className='card-button' onClick={handleGoToCourse}>
          Go To Course
        </button>
      </div>
    </StyledComponent>
  );
};
CourseCard.propTypes = {
  course_id: PropTypes.number.isRequired,
  course_title: PropTypes.string.isRequired,
  course_duration: PropTypes.string.isRequired,
  course_price: PropTypes.number.isRequired,
  course_description: PropTypes.string.isRequired,
  course_image: PropTypes.string.isRequired,
};
CourseCard.defaultProps = {
  course_description: 'No description provided',
};

export default CourseCard;
