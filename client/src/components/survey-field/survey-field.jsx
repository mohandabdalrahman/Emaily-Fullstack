import React from 'react';
const SurveyField = ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" {...input} />
      <div className="red-text">{touched && error}</div>
    </div>
  );
};

export default SurveyField;
