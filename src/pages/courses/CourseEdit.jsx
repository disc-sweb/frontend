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
    formLink: '',
    courseType: 'Online',
  });

  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
  const token = localStorage.getItem('authToken');

  const handleChange = (e) => {
    const updatedFormState = { ...formState, [e.target.name]: e.target.value };
    console.log('Updated form state:', updatedFormState);
    setFormState(updatedFormState);
    setError('');

    const isComplete = Object.values(updatedFormState).every((value) => {
      if (value instanceof File) {
        return true; // File is present
      }
      return typeof value === 'string' && value.trim() !== '';
    });

    setIsFormComplete(isComplete);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log('Submitting form...', formState);
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
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
        console.log('response: ', data);
        setFormState({
          title: data.title,
          price: data.price.toString(),
          description: data.description,
          formLink: data.form_link,
          courseType: data.course_type,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        console.log('Course data fetched successfully');
      }
    };

    fetchCourse();
  }, [courseId, token, backendUrl]);

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
          <Input.Image
            title='NEW COURSE IMAGE'
            name='imageFile'
            value={formState.imageFile}
            onChange={handleChange}
          />
          <Input.Text
            title='PRICE'
            name='price'
            placeholder='Enter course price'
            value={formState.price}
            onChange={handleChange}
            required
          />
          <Input.Video
            title='NEW COURSE VIDEO'
            name='videoFile'
            value={formState.videoFile}
            onChange={handleChange}
          />
          <Input.Text
            title='GOOGLE FORM LINK'
            name='formLink'
            placeholder='Enter the link to Google Form for course registration'
            value={formState.formLink}
            onChange={handleChange}
            required
          />
          <SubmitButton
            disabled={!isFormComplete || isSubmitting}
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Uploading' : 'Submit'}
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
