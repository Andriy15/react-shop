import { addDoc } from '@firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection } from '@firebase/firestore';
import { IFeedback } from '../models/models';

function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState('');
  const [id, setId] = useState(0);

  const generateId = () => {
    setId((prev) => prev + 1);
  }

  const addFeedback = async (feedback: IFeedback) => {
    const docRef = await addDoc(collection(db, "feedbacks"), feedback)
    console.log("Document written with ID: ", docRef.id)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFeedback({ text: feedbackText, date: new Date().toString() });
    setFeedbackText('')
    generateId()
  };

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
        Submit Feedback
      </button>
    </form>
  );
}

export default FeedbackForm
