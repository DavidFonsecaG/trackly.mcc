import { ArrowDown, User, UserCheck } from "lucide-react";

const students = ["Gladyce", "John", "David", "Mark"]
const total_apps = [
    {"type": "Abroad", "amount": 4},
    {"type": "Transfer In", "amount": 4},
    {"type": "Change Of Status", "amount": 4},
    {"type": "COEL", "amount": 4},
    {"type": "Domestic", "amount": 4},
    {"type": "Reinstatement", "amount": 4},
    {"type": "Abroad Approved", "amount": 4},
    {"type": "COS Approved", "amount": 4}
]
function Overview() {
       
    return (
        <div className="flex w-full gap-4">
            <div className="w-full">
                {/* card 1 */}
                <div className="flex flex-col w-full p-3 shadow-sm bg-card rounded-3xl">
                    <div className="p-3 flex items-center justify-between rounded-t-3xl">
                        <div className="flex flex-col gap-1">
                            <h2 className="md:text-xl font-semibold">Overview</h2>  
                        </div>
                    </div>
                    <div className="flex w-full text-sm text-start bg-card rounded-b-3xl pt-3 md:pb-6">
                        <div className="flex rounded-4xl p-1.5 bg-background/30 w-full border-[1.5px]">
                            <div className="flex flex-col w-1/2 rounded-3xl p-6 cursor-pointer bg-card shadow-sm">
                                <div className="flex gap-3 mb-2 items-center text-base/none font-semibold">
                                    <User className="size-5"/>
                                    <span>In Progress</span>
                                </div>
                                <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch max-md:gap-1">
                                    <span className="text-6xl/tight font-medium">23</span>
                                    <div>
                                        <div className="inline-flex items-center gap-1 px-1.5 rounded-lg h-7 text-red-400 bg-red-400/10 border-[1.5px] border-red-400">
                                            <ArrowDown className="inline-flex size-4"/>
                                            36.8%
                                        </div>
                                        <div className="mt-1 text-body-2 text-primary/50 max-md:text-caption">vs last month</div></div>
                                </div>
                            </div>

                            <div className="flex flex-col w-1/2 rounded-3xl p-6 cursor-pointer ">
                                <div className="flex gap-3 mb-2 items-center text-base/none font-semibold text-primary/50">
                                    <UserCheck className="size-5"/>
                                    <span>Completed</span>
                                </div>
                                <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch max-md:gap-1">
                                    <span className="text-6xl/tight font-medium">0</span>
                                    <div>
                                        <div className="inline-flex items-center gap-1 px-1.5 rounded-lg h-7 text-red-400 bg-red-400/10 border-[1.5px] border-red-400">
                                            <ArrowDown className="inline-flex size-4"/>
                                            36.8%
                                        </div>
                                        <div className="mt-1 text-body-2 text-primary/50 max-md:text-caption">vs last month</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-5 max-lg:px-3 max-lg:py-4">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 ">
                                <div className="text-[1.125rem] font-medium tracking-[-0.01em]">857 new customers today!</div>
                            </div>
                            <div className="text-body-2 text-t-secondary">Send a welcome message to all new customers.</div>
                        </div>
                        <div className="relative before:hidden after:hidden before:absolute before:-left-6 before:top-0 before:bottom-0 before:z-3 before:w-10 before:bg-linear-to-r before:from-b-surface2 before:to-transparent before:pointer-events-none after:absolute after:-right-6 after:top-0 after:bottom-0 after:z-3 after:w-10 after:bg-linear-to-l after:from-b-surface2 after:to-transparent after:pointer-events-none max-md:before:block max-md:after:block">
                            <div className="flex max-md:overflow-auto max-md:-mx-6 max-md:px-6 max-md:scrollbar-none">

                                {students.map((name) => (
                                    <div className="flex-1 px-1 py-8 text-center max-3xl:nth-[n+6]:hidden max-[1349px]:nth-[n+5]:hidden max-md:shrink-0 max-md:flex-auto max-md:w-30 max-md:!block">
                                        <div className="">
                                            <img alt="Gladyce" loading="lazy" width="64" height="64" decoding="async" data-nimg="1" className="inline-block align-top opacity-0 transition-opacity opacity-100 size-16 rounded-full object-cover opacity-100"  srcSet="/_next/image?url=%2Fimages%2Favatars%2F1.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Fimages%2Favatars%2F1.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Fimages%2Favatars%2F1.png&amp;w=128&amp;q=75"/>
                                        </div>
                                        <div className="mt-4 text-button text-t-secondary max-md:truncate">{name}</div>
                                    </div>
                                ))}

                                <div className="flex-1 px-2 py-8 text-center max-md:shrink-0 max-md:flex-auto max-md:w-30">
                                    <a className="group inline-flex flex-col justify-center items-center" href="/customers">
                                        <div className="flex justify-center items-center size-16 rounded-full border border-s-stroke2 transition-colors group-hover:border-s-highlight group-hover:shadow-depth">
                                            <svg className="inline-flex size-6 fill-t-secondary transition-colors group-hover:fill-t-primary" width="24" height="24" viewBox="0 0 24 24"><path d="M14.94 7.47l2.586 2.586a2.75 2.75 0 0 1 0 3.889L14.94 16.53a.75.75 0 1 1-1.061-1.061l2.586-2.586a1.26 1.26 0 0 0 .115-.133L6.41 12.75a.75.75 0 1 1 0-1.5h10.172a1.26 1.26 0 0 0-.116-.134L13.88 8.53A.75.75 0 0 1 14.94 7.47z"></path></svg>
                                        </div>
                                        <div className="mt-4 text-button text-t-secondary transition-colors group-hover:text-t-primary">View all</div>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-md">
                {/* card 2 */}
                <div className="flex flex-col w-full p-3 shadow-sm bg-card rounded-3xl">
                    <div className="flex items-center h-12 max-lg:pl-3 p-3">
                        <div className="md:text-lg font-semibold">Total Applications</div>
                    </div>
                    <div className="pt-3 ">
                        <div className="flex flex-col gap-1">
                            {total_apps.map((app) => (
                                <a className="group relative flex items-center p-3 cursor-pointer font-semibold rounded-3xl hover:bg-background/30 hover:inset-ring-[1.5px] hover:inset-ring-neutral-200" href="/shop/details">
                                    <div className="box-hover"></div>
                                    <div className="relative z-2 flex shrink-0 size-16 rounded-xl bg-blue-100 items-center justify-center">
                                        <span>A</span>
                                    </div>
                                    <div className="relative z-2 grow max-w-56.5 px-5 line-clamp-2 text-sub-title-1 max-2xl:px-3 max-lg:pl-5">{app.type}</div>
                                    <div className="relative z-2 flex flex-col items-end shrink-0 ml-auto text-right">
                                        <span className="mb-1 text-sub-title-1">{app.amount}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;