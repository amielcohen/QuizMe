class Quiz {
  constructor(id, question, answers, quizInfoId) {
    this.id = id;
    this.quizInfoId = quizInfoId;
    this.question = question;
    this.answers = answers.map((a, index) => ({
      text: a.text,
      isCorrect: index === 0, // assumes correct answer is first
    }));
  }
}

export default Quiz;
