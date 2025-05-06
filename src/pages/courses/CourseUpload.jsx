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

  const [formState, setFormState] = useState({
    title: '',
    price: '',
    description: '',
    courseImage: '',
    courseVideo: '',
    googleFormLink: '',
  });

  const handleChange = (e) => {
    const updatedFormState = { ...formState, [e.target.name]: e.target.value };
    setFormState(updatedFormState);
    setError('');

    const isComplete = Object.values(updatedFormState).every(
      (value) => value.trim() !== ''
    );
    setIsFormComplete(isComplete);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            name='courseImage'
            value={formState.courseImage}
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
            name='courseVideo'
            value={formState.courseVideo}
            onChange={handleChange}
            required
          />
          <Input.Text
            title='GOOGLE FORM LINK'
            name='googleFormLink'
            placeholder='Enter the link to Google Form for course registration'
            value={formState.googleFormLink}
            onChange={handleChange}
            required
          />
          <SubmitButton disabled={!isFormComplete}>Submit</SubmitButton>
          <SubmitButton onClick={() => navigate('/courses')} ascancel={true}>
            Cancel
          </SubmitButton>
        </Form>
      </StyledForm>
    </StyledPage>
  );
}
