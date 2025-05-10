import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Form, FormTitle } from 'common/components/form/Form';
import { Input } from 'common/components/form/Input';
import SubmitButton from 'common/components/form/SubmitButton';
import { RedSpan } from 'common/components/form/styles';
import { StyledForm, StyledPage } from 'pages/account/styles';

export default function CourseUpload() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formState, setFormState] = useState({
    title: '',
    price: '',
    description: '',
    imageFile: '',
    videoFile: '',
    formLink: '',
    courseType: 'Online',
  });

  const handleChange = (e) => {
    const updatedFormState = { ...formState, [e.target.name]: e.target.value };
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
      const response = await fetch(`${BACKEND_URL}/courses/upload`, {
        method: 'POST',
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
            title='COURSE IMAGE'
            name='imageFile'
            value={formState.imageFile}
            onChange={handleChange}
            required
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
            title='COURSE VIDEO'
            name='videoFile'
            value={formState.videoFile}
            onChange={handleChange}
            required
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
