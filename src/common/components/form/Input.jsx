import React, { useState } from 'react';

import { Icon } from 'assets/icons/icons';
import PropTypes from 'prop-types';

import {
  IconContainer,
  InputContainer,
  InputName,
  InputTitle,
  PasswordContainer,
  RedSpan,
  StyledFileInput,
  StyledInput,
  StyledTextArea,
} from './styles';

TitledInput.propTypes = {
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
function TitledInput({ title, required, children }) {
  return (
    <InputContainer>
      <InputName>
        <InputTitle>{title}</InputTitle>
        {required && <RedSpan>*</RedSpan>}
      </InputName>
      {children}
    </InputContainer>
  );
}

const InputPropTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
};

TextField.propTypes = InputPropTypes;
function TextField(props) {
  props.placeholder ??= 'Text Here';
  return <StyledInput type='text' {...props} />;
}

InputText.propTypes = {
  title: PropTypes.string.isRequired,
  ...InputPropTypes,
};
function InputText({ title, ...rest }) {
  return (
    <TitledInput title={title} required={rest.required}>
      <TextField {...rest} />
    </TitledInput>
  );
}

PasswordField.propTypes = InputPropTypes;
function PasswordField(props) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PasswordContainer>
      <StyledInput type={showPassword ? 'text' : 'password'} {...props} />
      <IconContainer onClick={toggleShowPassword}>
        {showPassword ? <Icon.eyeClosed /> : <Icon.eye />}
      </IconContainer>
    </PasswordContainer>
  );
}

InputPassword.propTypes = {
  title: PropTypes.string.isRequired,
  ...InputPropTypes,
};
function InputPassword({ title, ...rest }) {
  return (
    <TitledInput title={title} required={rest.required}>
      <PasswordField {...rest} />
    </TitledInput>
  );
}

LongTextField.propTypes = InputPropTypes;
function LongTextField(props) {
  props.placeholder ??= 'Text Here';
  return <StyledTextArea {...props} />;
}

InputLongText.propTypes = {
  title: PropTypes.string.isRequired,
  ...InputPropTypes,
};
function InputLongText({ title, ...rest }) {
  return (
    <TitledInput title={title} required={rest.required}>
      <LongTextField {...rest} />
    </TitledInput>
  );
}

InputImage.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

function InputImage({ title, required, onChange }) {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
    onChange(event);
  };

  return (
    <TitledInput title={title} required={required}>
      <StyledFileInput hasFile={!!fileName}>
        <input type='file' accept='image/*' onChange={handleFileChange} />
        {!fileName ? (
          <span>
            <span>Upload Image</span>
          </span>
        ) : (
          <span>
            <span>{fileName}</span>
          </span>
        )}
      </StyledFileInput>
    </TitledInput>
  );
}

InputVideo.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

function InputVideo({ title, required, onChange }) {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
    onChange(event);
  };

  return (
    <TitledInput title={title} required={required}>
      <StyledFileInput hasFile={!!fileName}>
        <input type='file' accept='video/*' onChange={handleFileChange} />
      </StyledFileInput>
    </TitledInput>
  );
}

export const Input = {
  Text: InputText,
  Password: InputPassword,
  LongText: InputLongText,
  Image: InputImage,
  Video: InputVideo,
};
