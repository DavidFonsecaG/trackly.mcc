import StudentDetail from "../components/StudentDetail";
import StudentList from "../components/StudentList";
import Toast from "../components/ui/Toast";
import { useAppContext } from "../context/AppContext";

function TrackerPage() {
    const { selectedStudent, notification, setNotification } = useAppContext();
       
    return (
        <div className="relative flex flex-col w-full min-h-fit h-full pl-3 pr-1.5 pb-3 md:pl-0 md:pr-3 md:pb-4">
            <StudentList />
            {selectedStudent && <StudentDetail />}
            {notification && <Toast message={notification} onClose={() => setNotification(null)} action={{"name":"undo?", "func":()=>{console.log("undo")}}} duration={7000}/>}
        </div>
    );
};

export default TrackerPage;