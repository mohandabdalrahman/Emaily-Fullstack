import React from 'react';
import { connect } from 'react-redux';
import { fields } from '../survey-form/survey-form';
import { submitSurvey } from '../../redux/actions/index';
const SurveyFormReview = (
  {
    onCancel,
    form: {
      surveyForm: { values },
    },
    submitSurvey,
  }
) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {fields.map(({ name, label }) => {
        return (
          <div key={name}>
            <label>{label}</label>
            <p>{values[name]}</p>
          </div>
        );
      })}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>

      <button
        className="green white-text btn-flat"
        onClick={() => submitSurvey(values)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};
const mapStateToProps = ({ form }) => {
  return {
    form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitSurvey: (values) => dispatch(submitSurvey(values)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SurveyFormReview);
