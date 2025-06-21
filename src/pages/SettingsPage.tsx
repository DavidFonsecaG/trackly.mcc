

function DashboardPage() {
       
    return (
        <div className="relative flex flex-col w-full min-h-fit h-full pl-3 pr-1.5 pb-3 md:pl-0 md:pr-3 md:pb-4">
            <div className="flex w-full">
                <div className="flex flex-col min-w-full p-3 shadow-sm bg-card rounded-3xl">
                    <div className="p-3 flex items-center justify-between rounded-t-3xl">
                        <div className="flex flex-col gap-1">
                            <h2 className="md:text-xl font-semibold">Settings</h2>
                        </div>
                        <div className="flex gap-2">                        
                            <div className="hidden lg:flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 bg-white dark:bg-gray-900">
                                <label  className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-3 h-3 text-primary/50 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="text" id="table-search-users" className="text-xs/5 block p-2 ps-10 border rounded-full w-80 bg-background dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;