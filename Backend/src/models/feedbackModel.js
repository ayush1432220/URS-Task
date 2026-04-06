class Feedback {
  constructor({ id, name, email, message, submittedAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.message = message;
    this.submittedAt = submittedAt;
  }
}

module.exports = Feedback;
