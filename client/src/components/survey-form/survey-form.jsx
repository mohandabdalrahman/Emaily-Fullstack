import React from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../survey-field/survey-field';
import { Link } from 'react-router-dom';
import checkEmails from '../../utils/validateEmails';
export const fields = [
  { name: 'title', label: 'Survey Title' },
  { name: 'subject', label: 'Subject' },
  { name: 'body', label: 'Email Body' },
  { name: 'recipients', label: 'Recipients List' },
];
const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  const renderFields = () => {
    return fields.map(({ name, label }) => (
      <Field
        type="text"
        component={SurveyField}
        name={name}
        label={label}
        key={name}
      />
    ));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        {renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal  btn-flat white-text right">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};
const validate = (values) => {
  const errors = {};
  errors.recipients = checkEmails(values.recipients || '');
  fields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `you must provide ${name}`;
    }
  });
  return errors;
};

export default reduxForm({
  form: 'surveyForm',
  destroyOnUnmount: false,
  validate,
})(SurveyForm);
