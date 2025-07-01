import StudentDetail from "../components/StudentDetail";
import StudentList from "../components/StudentList";
import EditStudentDialog from "../components/ui/EditStudentDialog";
import Toast from "../components/ui/Toast";
import { useAppContext } from "../context/AppContext";

function TrackerPage() {
    const { selectedStudent, editStudent, notification, setNotification, deleted, setDeleted, setStudent } = useAppContext();    

    const handleUndo = () => {
        if(deleted){
            setStudent(deleted?.deletedStudent, deleted?.deletedStudentDocument);
            setDeleted(null);
        }
        setNotification(null);
    };
       
    return (
        <div className="flex flex-col w-full min-h-fit h-full pl-3 pr-1.5 pb-3 md:pl-0 md:pr-3 md:pb-4">
            <StudentList />
            {selectedStudent && <StudentDetail />}
            {editStudent && <EditStudentDialog />}
            {notification && <Toast message={notification} action={handleUndo} duration={10000}/>}
        </div>
    );
};

export default TrackerPage;