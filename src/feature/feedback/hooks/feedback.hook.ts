import { useEffect, useState } from 'react';
import { IFeedback } from '../Feedback.models';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'

export function useFeedbacks() {
    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
    
    const getFeedbacks = async () => {
        const feedbacksCol = collection(db, "feedbacks")
        const snapshot = await getDocs(feedbacksCol)
        const feedbacks = snapshot.docs.map(doc => doc.data() as IFeedback)
        setFeedbacks(feedbacks)
    }
    
    useEffect(() => {
        getFeedbacks()
    }, [])
    
    return { feedbacks }
}