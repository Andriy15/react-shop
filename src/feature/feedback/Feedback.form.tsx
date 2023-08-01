import { addDoc } from '@firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection } from '@firebase/firestore';
import { IFeedback } from '../feedback/Feedback.models';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@firebase/auth';
import {app} from '../../firebase';
import invariant from 'tiny-invariant';
import { Trans } from '@lingui/macro';

function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState('')
  const [id, setId] = useState(0)
  const auth = getAuth(app)
  const [user] = useAuthState(auth)

  const generateId = () => {
    setId((prev) => prev + 1);
  }

  const addFeedback = async (feedback: IFeedback) => {
    await addDoc(collection(db, "feedbacks"), feedback)
    window.location.reload() 
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    invariant(feedbackText.length > 0, 'Feedback text must be longer than 0 characters')
    addFeedback({ text: feedbackText, date: new Date().toString(), email: user?.email });
    setFeedbackText('')
    generateId()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full"
        placeholder="Enter your feedback..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
      >
        <Trans>Submit Feedback</Trans>
      </button>
    </form>
  );
}

export default FeedbackForm
