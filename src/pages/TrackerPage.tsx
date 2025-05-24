import StudentDetail from "../components/StudentDetail";
import StudentList from "../components/StudentList";
import { useAppContext } from "../context/AppContext";


function TrackerPage() {
    const { selectedStudent } = useAppContext();
       
    return (
        <div className="flex flex-col w-full min-h-fit pr-2.5 pb-4">
            <StudentList />
            {selectedStudent && <StudentDetail />}
        </div>
    )
}

export default TrackerPage;