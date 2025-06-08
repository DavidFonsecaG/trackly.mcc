import type { FC } from "react";
import { useAppContext } from "../../context/AppContext";

interface ProgressBarProps {
    studentId: string;
};

const ProgressBar: FC<ProgressBarProps> = ({ studentId }) => {
    const { getStudentDocuments } = useAppContext();
    
    const getCompletionPercentage = (studentId: string) => {
        const studentDoc = getStudentDocuments(studentId)
        if (!studentDoc) return 0;
        
        const requiredDocs = studentDoc.filter((doc) => doc.required);
        if (requiredDocs.length === 0) return 0;
        
        const submittedRequiredDocs = requiredDocs.filter((doc) => doc.submitted);
        return Math.round((submittedRequiredDocs.length / requiredDocs.length ) * 100);
    };

    const percentage = getCompletionPercentage(studentId);

    const colors = {
        incomplete: 'bg-rose-500',
        complete: 'bg-green-600',
        pending: 'bg-amber-400',
    };

    const getColor = () => {
        if (percentage === 100)
            return "complete"
        if (percentage < 99 && percentage > 30)
            return "pending"
        else return "incomplete"
    }

    return (
        <div className="flex items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full">
                <div 
                    className={`h-2 rounded-full ${colors[getColor() as keyof typeof colors]}`} 
                    style={{width: `${percentage}%`}}
                ></div>
            </div> 
            <p className="hidden sm:flex text-end">{percentage}%</p>
        </div>
    );
};

export default ProgressBar;