import FeedbackForm from './FeedbackForm';
import { db } from '../firebase';
import { collection, getDocs } from '@firebase/firestore';
import { IFeedback } from '../models/models';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@firebase/auth';
import {app} from '../firebase';

function Feedback() {
    const auth = getAuth(app)
    const [user] = useAuthState(auth)

    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])

    const ref = useRef(null)
    const isInView = useInView(ref)

    useEffect(() => {
        getFeedbacks()
    }, [isInView])

    const getFeedbacks = async () => {
        const feedbacksCol = collection(db, "feedbacks")
        const snapshot = await getDocs(feedbacksCol)
        const feedbacks = snapshot.docs.map(doc => doc.data() as IFeedback)
        setFeedbacks(feedbacks)

        getFeedbacks()
    }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Feedback</h1>
      <FeedbackForm />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {feedbacks.map((feedback) => (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-2">{feedback.date}</p>
            <p className="text-lg font-semibold mb-4">{feedback.text}</p>
            <div className="flex items-center">
              <span className="text-gray-700">{user?.displayName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feedback
