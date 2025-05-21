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
    courseType: '',
    language: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormState = { ...formState, [name]: value };

    // Clear video file if changing from Online to other course types
    if (name === 'courseType' && value !== 'Online') {
      updatedFormState.videoFile = '';
    }

    setFormState(updatedFormState);
    setError('');

    const isComplete = Object.entries(updatedFormState).every(
      ([key, value]) => {
        if (key === 'videoFile') {
          // Only validate video for Online courses
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

      // Clean up the price field
      if (formData.has('price')) {
        const price = formData.get('price');
        formData.delete('price');
        formData.append('price', price.replace('$', ''));
      }

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
            title='COURSE IMAGE'
            name='imageFile'
            value={formState.imageFile}
            onChange={handleChange}
            required
          />
          <Input.Text
            title='PRICE'
            name='price'
            placeholder='$0.00'
            value={formState.price ? formState.price : ''}
            onChange={(e) => {
              let value = e.target.value;
              // Remove dollar sign if present
              if (value.startsWith('$')) {
                value = value.slice(1);
              }

              // Allow only numbers and one decimal point
              if (value === '' || value === '.') {
                setFormState((prev) => ({
                  ...prev,
                  price: value === '.' ? '$0.' : '',
                }));
                return;
              }

              // Check if input is a valid price format
              if (/^\d*\.?\d{0,2}$/.test(value)) {
                setFormState((prev) => ({
                  ...prev,
                  price: `$${value}`,
                }));
              }
            }}
            required
            style={{
              position: 'relative',
            }}
          />
          {formState.courseType === 'Online' && (
            <Input.Video
              title='COURSE VIDEO'
              name='videoFile'
              value={formState.videoFile}
              onChange={handleChange}
              required
            />
          )}
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
