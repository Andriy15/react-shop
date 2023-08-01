import FeedbackForm from './Feedback.form';
import { useFeedbacks } from './hooks/feedback.hook';
import { Trans } from '@lingui/macro';

function Feedback() {

    const { feedbacks } = useFeedbacks()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8"><Trans>Feedback</Trans></h1>
      <FeedbackForm />
      <div className="mt-8 container">
        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold text-gray-800"><Trans>All Feedbacks from customers</Trans></span>
        </div>
        {feedbacks.map((feedback) => (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4 overflow-auto">
            <p className="text-sm text-gray-500 mb-2">{feedback.date}</p>
            <div className="flex items-center mb-2">
              <span className="text-gray-700">{feedback.email}</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{feedback.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feedback
