import React, { useState } from 'react';
import SurveyForm from '../survey-form/survey-form';
import SurveyFormReview from '../survey-form-review/survey-form-review';
import { reduxForm } from 'redux-form';
const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);
  return (
    <>
      {showFormReview ? (
        <SurveyFormReview onCancel={() => setShowFormReview(false)} />
      ) : (
        <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />
      )}
    </>
  );
};

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
