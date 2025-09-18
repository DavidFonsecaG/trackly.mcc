import { useAppContext } from "../context/AppContext";
import StudentList from "../components/studentList/StudentList";
import StudentDetail from "../components/ui/StudentDetail";
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
        <div className="flex flex-col w-full min-h-fit h-full px-3 pb-3 md:pb-4 lg:pl-0">
            <StudentList />
            {selectedStudent && <StudentDetail />}
            {editStudent && <EditStudentDialog />}
            {addStudent && <AddStudentDialog />}
            {notification && <Toast message={notification} action={handleUndo} duration={10000}/>}
        </div>
    );
};

export default TrackerPage;