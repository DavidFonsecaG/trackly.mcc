import SidebarMenu from "../components/SidebarMenu";
import StudentDetail from "../components/StudentDetail";
import StudentList from "../components/StudentList";
import { useAppContext } from "../context/AppContext";


function TrackerPage() {
    const { selectedStudent } = useAppContext();
       
    return (
        <div className="flex w-full h-full">
            <SidebarMenu />
            <StudentList />
            {selectedStudent && <StudentDetail />}
        </div>
    )
}

export default TrackerPage;