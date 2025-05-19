function TrackerPage() {
    const chevron = <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    const chevronUpDown = <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path></svg>
  
    return (
    <div className="flex w-full h-full overflow-hidden">
        <div className="flex flex-col px-4 pb-4 justify-between h-full">
            <div className="flex flex-col gap-3">
                <a href="/#" className="flex size-9 items-center justify-center bg-card rounded-lg shadow-">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                </a>
            </div>
            <div>
                <div className="flex flex-col w-9 p-1 bg-card rounded-full items-center gap-1">
                    <button className="flex size-7 rounded-full items-center justify-center text-primary/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                    </button>
                    <button className="flex size-7 bg-background rounded-full items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                    </button>
                </div> 
            </div>
        </div>
        <div className="flex pr-4 w-full gap-2 overflow-auto">
            <div className="bg-card rounded-3xl w-full">
                <div className="px-4 py-6 flex items-center justify-between bg-card rounded-3xl sticky top-0">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold">Applications</h2>
                    </div>
                    <div className="flex gap-2">                        
                        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 bg-white dark:bg-gray-900">
                            <label  className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-3 h-3 text-primary/50 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="text" id="table-search-users" className="text-xs block p-2 ps-10 border rounded-full w-80 bg-background dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"/>
                            </div>
                        </div>
                        <div className="flex border rounded-full py-2 px-4 text-xs bg-primary text-card items-center gap-1">
                            Filter
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-6 text-sm text-start h-screen">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400 ">
                            <thead className=" dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-4 text-sm font-normal border-b cursor-pointer hover:text-blue-500">
                                        <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none">
                                            Student
                                            {chevronUpDown}
                                        </p>
                                    </th>
                                    <th scope="col" className="px-4 py-4 text-sm font-normal border-b cursor-pointer hover:text-blue-500">
                                        <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none">
                                            Schedule
                                            {chevronUpDown}
                                        </p>
                                    </th>
                                    <th scope="col" className="px-4 py-4 text-sm font-normal border-b cursor-pointer hover:text-blue-500">
                                        <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none">
                                            Completion
                                            {chevronUpDown}
                                        </p>
                                    </th>
                                    <th scope="col" className="px-4 py-4 text-sm font-normal border-b cursor-pointer hover:text-blue-500">
                                        <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none">
                                            Last Updated
                                            {chevronUpDown}
                                        </p>
                                    </th>
                                    <th scope="col" className="px-4 py-4 border-b">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-primary/50">
                                <tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 transition-colors cursor-pointer dark:hover:bg-gray-600">
                                    <th scope="row" className="flex items-center px-4 py-2 whitespace-nowrap dark:text-white">
                                        <div>
                                            <p className="text-sm text-primary font-semibold">Neil Sims</p>
                                            <p className="font-normal">English as a Second Language</p>
                                        </div>  
                                    </th>
                                    <td className="px-4 py-2"><div><p className="text-primary">4 day</p><p>Morning</p></div></td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-gray-200 rounded-full"><div className="w-1/4 bg-yellow-200 h-2 rounded-full"></div></div> 
                                            <p className="text-end">25%</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">May 18, 2025</td>
                                    <td className="px-4 py-2">{chevron}</td>
                                </tr>

                                <tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 transition-colors cursor-pointer dark:hover:bg-gray-600">
                                    <th scope="row" className="flex items-center px-4 py-2 whitespace-nowrap dark:text-white">
                                        <div>
                                            <p className="text-sm text-primary font-semibold">David Fonseca</p>
                                            <p className="font-normal">English as a Second Language</p>
                                        </div>  
                                    </th>
                                    <td className="px-4 py-2"><div><p className="text-primary">4 day</p><p>Morning</p></div></td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-gray-200 rounded-full"><div className="w-4/4 bg-green-300 h-2 rounded-full"></div></div> 
                                            <p className="text-end">100%</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">May 18, 2025</td>
                                    <td className="px-4 py-2">{chevron}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>


                </div>
            </div>


        </div>
    </div>
  )
}

export default TrackerPage;