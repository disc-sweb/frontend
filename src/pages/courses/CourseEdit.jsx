import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Form, FormTitle } from 'common/components/form/Form';
import { Input } from 'common/components/form/Input';
import SubmitButton from 'common/components/form/SubmitButton';
import { RedSpan } from 'common/components/form/styles';
import { StyledForm, StyledPage } from 'pages/account/styles';

export default function CourseUpload() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [error, setError] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formState, setFormState] = useState({
    title: '',
    price: '',
    description: '',
    form_link: '',
    courseType: '',
    language: '', // Add this field
  });

  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
  const token = localStorage.getItem('authToken');

  // Update handleChange function to handle video visibility
  const handleChange = (e) => {
    console.log('Current form state:', formState);
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'price') {
      // Remove dollar sign if present for validation
      if (value.startsWith('$')) {
        updatedValue = value.slice(1);
      }

      // Allow only numbers and one decimal point
      if (updatedValue === '' || updatedValue === '.') {
        updatedValue = updatedValue === '.' ? '$0.' : '$';
      }

      // Check if input is a valid price format
      if (/^\d*\.?\d{0,2}$/.test(updatedValue)) {
        updatedValue = `$${updatedValue}`;
      } else {
        updatedValue = parseFloat(updatedValue).toFixed(2);
        if (isNaN(updatedValue)) {
          updatedValue = '';
        } else {
          updatedValue = `$${updatedValue}`;
        }
      }
    }
    console.log('Updated value:', updatedValue);
    const updatedFormState = { ...formState, [name]: updatedValue };

    // Clear video file if changing from Online to other course types
    if (name === 'courseType' && value !== 'Online') {
      updatedFormState.videoFile = '';
    }

    console.log('Updated form state:', updatedFormState);

    // Debug validation for each field
    Object.entries(updatedFormState).forEach(([key, value]) => {
      let isValid = false;
      if (key === 'videoFile') {
        isValid =
          updatedFormState.courseType !== 'Online' ||
          value instanceof File ||
          (typeof value === 'string' && value.trim() !== '');
      } else {
        isValid =
          value instanceof File ||
          (typeof value === 'string' && value.trim() !== '');
      }
      console.log(
        `Field ${key}: ${isValid ? 'Valid' : 'Invalid'} - Value:`,
        value
      );
    });

    const isComplete = Object.entries(updatedFormState).every(
      ([key, value]) => {
        if (key === 'videoFile') {
          return (
            updatedFormState.courseType !== 'Online' ||
            value instanceof File ||
            value.trim() !== ''
          );
        }
        if (value instanceof File) {
          return true;
        }
        return typeof value === 'string' && value.trim() !== '';
      }
    );

    setFormState(updatedFormState);
    setError('');
    setIsFormComplete(isComplete);
    console.log('Form complete:', isComplete);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      Object.entries(formState).forEach(([key, value]) => {
        if (key === 'price') {
          // Remove dollar sign and convert to number
          formData.append(key, value.replace('$', ''));
        } else {
          formData.append(key, value);
        }
      });

      const BACKEND_URL =
        process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${BACKEND_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log('Server response: ', data);

      if (response.ok) {
        // Navigate to courses page on successful submission
        navigate('/courses');
      } else {
        setError(data.message || 'Failed to upload course');
      }
    } catch (error) {
      console.error('Error uploading course:', error);
      setError('Failed to upload course');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Simulated API call for demonstration
    const fetchCourse = async () => {
      try {
        const BACKEND_URL =
          process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('User not logged in.');
        const response = await fetch(`${BACKEND_URL}/courses/${courseId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Course not found');
        }
        const data = await response.json();
        console.log('Raw response:', data);

        const courseData = data;
        delete courseData.owner;
        courseData.price = `$${courseData.price}`;

        console.log('Processed course data:', courseData);

        const newState = {
          title: courseData.title,
          price: courseData.price,
          description: courseData.description,
          form_link: courseData.form_link,
          courseType: courseData.course_type,
          language: courseData.language,
        };

        setFormState(newState);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        console.log('Course data fetched successfully');
      }
    };

    fetchCourse();
  }, [courseId, token, backendUrl]);

  // Update the form JSX to conditionally render video input
  return (
    <StyledPage>
      <StyledForm>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Course Information</FormTitle>
          {error && <RedSpan>{error}</RedSpan>}
          <Input.Text
            title='TITLE'
            name='title'
            placeholder='Enter course title'
            value={formState.title}
            onChange={handleChange}
            required
          />
          <Input.LongText
            title='DESCRIPTION'
            name='description'
            placeholder='Enter course description'
            value={formState.description}
            onChange={handleChange}
            required
          />
          <Input.Radio
            title='COURSE TYPE'
            name='courseType'
            options={[
              { value: 'In-Person', label: 'In-Person' },
              { value: 'Online', label: 'Online' },
              { value: 'Virtual', label: 'Virtual' },
            ]}
            value={formState.courseType}
            onChange={handleChange}
            required
          />
          <Input.Radio
            title='LANGUAGE'
            name='language'
            options={[
              { value: 'English', label: 'English' },
              { value: 'Spanish', label: 'Spanish' },
            ]}
            value={formState.language}
            onChange={handleChange}
            required
          />
          <Input.Image
            title='NEW COURSE IMAGE'
            name='imageFile'
            value={formState.imageFile}
            onChange={handleChange}
          />
          <Input.Text
            title='PRICE'
            name='price'
            placeholder='$0.00'
            value={formState.price || '$'}
            onChange={handleChange}
            required
            style={{
              position: 'relative',
            }}
          />
          {formState.courseType === 'Online' && (
            <Input.Video
              title='NEW COURSE VIDEO'
              name='videoFile'
              value={formState.videoFile}
              onChange={handleChange}
            />
          )}
          <Input.Text
            title='GOOGLE FORM LINK'
            name='formLink'
            placeholder='Enter the link to Google Form for course registration'
            value={formState.form_link}
            onChange={handleChange}
            required
          />
          <SubmitButton
            disabled={!isFormComplete || isSubmitting}
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Uploading' : 'Save Changes'}
          </SubmitButton>
          <SubmitButton
            onClick={() => navigate('/courses')}
            ascancel={true}
            disabled={isSubmitting}
          >
            Cancel
          </SubmitButton>
        </Form>
      </StyledForm>
    </StyledPage>
  );
}
