const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
  const invalidEamils = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => regularExpression.test(email) === false)

  if (invalidEamils.length) return `These emails are invalid ${invalidEamils}`
  return;
}