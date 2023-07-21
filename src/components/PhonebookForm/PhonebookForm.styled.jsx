import styled from '@emotion/styled';

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 1px solid black;
  padding: 15px;
`;

const Label = styled.label`
  margin-top: 15px;
  margin-bottom: 5px;
  &:first-of-type {
    margin-top: 0;
  }
`;

const FormButton = styled.button`
  align-self: start;
  min-width: 100px;
  margin-top: 15px;
  cursor: pointer;
`;

export { FormContainer, Label, FormButton };
