import { useRef, useState } from 'react'
import type {
  ActivityResult,
  QuizQuestion,
} from '../../types/calendar'

interface QuizProps {
  quiz: QuizQuestion
  onComplete: (result: ActivityResult) => void
}

// Viser ét spørgsmål og melder resultatet tilbage efter besvarelse.
function Quiz({ quiz, onComplete }: QuizProps) {
  const hasSubmitted = useRef(false)

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleSubmit() {
    if (selectedAnswer === null || hasSubmitted.current) return

    hasSubmitted.current = true
    setIsSubmitted(true)

    const isCorrect = selectedAnswer === quiz.correctAnswer
    const reward = quiz.reward

    onComplete({
      tickets:
        isCorrect && reward.type === 'ticket' ? reward.value : 0,
      discountPercent:
        isCorrect && reward.type === 'discount' ? reward.value : 0,
    })
  }

  return (
    <div className="quiz-game">
      <img
        className="quiz-image"
        src={quiz.image}
        alt={quiz.imageAlt}
      />

      <h2 className="quiz-question">{quiz.question}</h2>

      <div className="quiz-answers">
        {quiz.answers.map((answer, index) => (
          <button
            key={index}
            type="button"
            className={
              `quiz-answer${selectedAnswer === index ? ' selected' : ''}`
            }
            onClick={() => setSelectedAnswer(index)}
            aria-pressed={selectedAnswer === index}
            disabled={isSubmitted}
          >
            {answer}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="quiz-submit"
        onClick={handleSubmit}
        disabled={selectedAnswer === null || isSubmitted}
      >
        {isSubmitted ? 'Du har svaret' : 'Afgiv svar'}
      </button>
    </div>
  )
}

export default Quiz
