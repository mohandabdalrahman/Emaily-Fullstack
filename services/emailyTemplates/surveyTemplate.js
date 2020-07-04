module.exports = ({ body,id }) => {
  return `
  <html>
  <body>
    <div className="center">
    <h3>i would like your input</h3>
    <p>Please answer the following questions</p>
    <p>${body}</p>
    <div><a href="http://localhost:3000/api/surveys/${id}/yes">Yes</a></div>
    <div><a href="http://localhost:3000/api/surveys/${id}/no">No</a></div>
    </div>
  </body>
  ${body}
  </html>`
}