import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from 'common/contexts/UserContext';

import DeleteDialog from './DeleteDialog';

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
    flex: 1;
    height: 100%;
  }

  .card-title {
    font-size: 20px; /* Increased from 18px */
    font-weight: 600;
    margin-bottom: 8px; /* Increased from 5px */
    color: #333;
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

  .card-type {
    font-size: 14px;
    color: #666;
    background-color: #f0f0f0;
    padding: 4px 12px;
    border-radius: 12px;
    display: inline-block;
    margin-bottom: 12px;
  }
`;

const CourseCard = ({
  course_id,
  course_title,
  course_price,
  course_description,
  course_image,
  course_type,
  courseOwner,
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleGoToCourse = () => {
    navigate(`/courses/${course_id}`);
  };

  const handleEditCourse = () => {
    //UPDATE WITH RIGHT PATH
    navigate(`/courses/edit/${course_id}`);
  };

  const handleDeleteCourse = async (course_id) => {
    try {
      const BACKEND_URL =
        process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      console.log('Attempting to delete course ID:', course_id);
      // console.log('Calling:', `${BACKEND_URL}/courses/${course_id}`);
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${BACKEND_URL}/courses/${course_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Status:', response.status);
      const data = await response.json();
      console.log('Response:', data);

      if (!response.ok) {
        console.error('Failed to delete course:', data.error || data.message);
        return;
      }
      navigate(`/courses`);
      // Optionally trigger a re-fetch or remove the course from UI state
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('An unexpected error occurred while deleting the course.');
    }
  };

  const handleDeleteConfirm = async () => {
    await handleDeleteCourse(course_id);
    setShowDeleteDialog(false);
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

              <button
                onClick={() => setShowDeleteDialog(true)}
                className='delete'
              >
                <FaTrash color='red' />
              </button>
            </div>
          )}
        </div>
        <span className='card-type'>{course_type}</span>
        <p className='card-price'>{course_price.toFixed(2)}</p>
        <p className='card-description'>{course_description}</p>
        <button className='card-button' onClick={handleGoToCourse}>
          {courseOwner ? 'Go to Course' : 'View Course'}
        </button>
      </div>
      {showDeleteDialog && (
        <DeleteDialog
          title='Delete Course'
          message={`Are you sure you want to delete "${course_title}"? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </StyledComponent>
  );
};
CourseCard.propTypes = {
  course_id: PropTypes.number.isRequired,
  course_title: PropTypes.string.isRequired,
  course_price: PropTypes.number.isRequired,
  course_description: PropTypes.string.isRequired,
  course_image: PropTypes.string.isRequired,
  course_type: PropTypes.string.isRequired,
  courseOwner: PropTypes.bool.isRequired,
};
CourseCard.defaultProps = {
  course_description: 'No description provided',
  course_type: 'Online', // Add default value
};

export default CourseCard;
