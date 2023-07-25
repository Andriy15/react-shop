import FeedbackForm from './Feedback.form';
import { db } from '../../firebase';
import { collection, getDocs } from '@firebase/firestore';
import { IFeedback } from '../feedback/Feedback.models';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useFeedbacks } from './hooks/feedback.hook';

function Feedback() {

    const { feedbacks } = useFeedbacks()

    const [feedback, setFeedback] = useState<IFeedback[]>([])

    const ref = useRef(null)
    const isInView = useInView(ref)

    useEffect(() => {
        setFeedback(feedbacks)
    }, [isInView])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Feedback</h1>
      <FeedbackForm />
      <div className="mt-8 container">
        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold text-gray-800">All Feedbacks from customers</span>
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
