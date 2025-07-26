import Overview from "../components/dashboard/Overview";

function DashboardPage() {
       
    return (
        <div className="flex flex-col w-full min-h-fit h-full pl-3 pr-1.5 pb-3 md:pl-0 md:pr-3 md:pb-4">
            <Overview />
        </div>
    );
};

export default DashboardPage;