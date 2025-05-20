import SidebarMenu from "../components/SidebarMenu";
import StudentDetail from "../components/StudentDetail";
import TableCard from "../components/TableCard";
import { useAppContext } from "../context/AppContext";


function TrackerPage() {
    const { selectedStudent } = useAppContext();
    const context = useAppContext();
    console.log(context);
       
    return (
        <div className="flex w-full h-full">
            <SidebarMenu />
            <TableCard />
            {selectedStudent && <StudentDetail />}
        </div>
    )
}

export default TrackerPage;