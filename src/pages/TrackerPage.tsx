import { useAppContext } from "../context/AppContext";
import StudentList from "../components/StudentList";
import StudentDetail from "../components/StudentDetail";
import EditStudentDialog from "../components/ui/EditStudentDialog";
import AddStudentDialog from "../components/ui/AddStudentDialog";
import Toast from "../components/ui/Toast";

function TrackerPage() {
    const { 
        selectedStudent, 
        editStudent,
        addStudent, 
        notification, 
        setNotification, 
        deleted, 
        setDeleted, 
        setStudent 
    } = useAppContext();    

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
            {addStudent && <AddStudentDialog />}
            {notification && <Toast message={notification} action={handleUndo} duration={10000}/>}
        </div>
    );
};

export default TrackerPage;