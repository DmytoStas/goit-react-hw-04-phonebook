import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Component } from 'react';
import { FormContainer, Label, FormButton } from './PhonebookForm.styled';

class PhonebookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  schema = Yup.object().shape({
    name: Yup.string()
      .required('Name required')
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Invalid name'
      ),
    number: Yup.string()
      .length(9)
      .required('Number required')
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d/,
        'Invalid number'
      ),
  });

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (values, actions) => {
    this.props.onSubmit(values);

    actions.resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={this.state}
        validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        <Form autoComplete="off">
          <FormContainer>
            <Label htmlFor="name">Name</Label>
            <Field
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            />
            <ErrorMessage name="name" />

            <Label htmlFor="number">Number</Label>
            <Field
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            />
            <ErrorMessage name="number" />
            <FormButton type="submit">Add contact</FormButton>
          </FormContainer>
        </Form>
      </Formik>
    );
  }
}

export default PhonebookForm;
