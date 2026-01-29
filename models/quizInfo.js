class QuizInfo {
  constructor(id, title, color, imageUrl, tags, questionCount, createdBy) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.imageUrl = imageUrl;
    this.tags = Array.isArray(tags) ? [...tags] : [];
    this.questionCount = questionCount;
    this.createdBy = createdBy;
  }
}

export default QuizInfo;
