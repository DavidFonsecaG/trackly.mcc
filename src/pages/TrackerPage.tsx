import StudentDetail from "../components/StudentDetail";
import StudentList from "../components/StudentList";
import { useAppContext } from "../context/AppContext";

function TrackerPage() {
    const { selectedStudent } = useAppContext();
       
    return (
        <div className="flex flex-col w-full min-h-fit pl-3 pr-1.5 md:pl-0 md:pr-3">
            <StudentList />
            {selectedStudent && <StudentDetail />}
        </div>
    );
};

export default TrackerPage;