import Card from "../ui/Card";
import CardBody from "../ui/CardBody";
import CardTitle from "../ui/CardTitle";

interface TrackerSettingsTypes {

};

const TrackerSettings: React.FC<TrackerSettingsTypes> = ({
    
}) => {
    return (
        <Card>
            <CardTitle title="Your Tracker" />
            <CardBody className="gap-0">
                <div className="flex p-6 border-neutral-200/60">
                    <div>
                        <div className="relative size-10 rounded-full bg-primary">
                            <div className="absolute top-10 left-5 size-6 rounded-bl-xl border-l-[1.5px] border-b-[1.5px]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-primary font-semibold">Type of applications</div>
                    </div>
                </div>
                <div className="flex p-6 border-neutral-200/60">
                    <div>
                        <div className="relative size-10 rounded-full bg-primary">
                            <div className="absolute top-10 left-5 size-6 rounded-bl-xl border-l-[1.5px] border-b-[1.5px]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-primary font-semibold">documents</div>
                    </div>
                </div>
                <div className="flex p-6 border-neutral-200/60">
                    <div>
                        <div className="relative size-10 rounded-full bg-primary">
                            <div className="absolute top-10 left-5 size-6 rounded-bl-xl border-l-[1.5px] border-b-[1.5px]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-primary font-semibold">Programs</div>
                    </div>
                </div>
                <div className="flex p-6 border-neutral-200/60">
                    <div>
                        <div className="relative size-10 rounded-full bg-primary">
                            <div className="absolute top-10 left-5 size-6 rounded-bl-xl border-l-[1.5px] border-b-[1.5px]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-primary font-semibold">Schedules</div>
                    </div>
                </div>
                <div className="flex p-6 border-neutral-200/60">
                    <div>
                        <div className="relative size-10 rounded-full bg-primary">
                            <div className="absolute top-10 left-5 size-6 rounded-bl-xl border-l-[1.5px] border-b-[1.5px]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-primary font-semibold">Status</div>
                    </div>
                </div>
                <div className="flex p-6 border-neutral-200/60">
                    <div>
                        <div className="relative size-10 rounded-full bg-primary">
                            <div className="absolute top-10 left-5 size-6 rounded-bl-xl border-l-[1.5px] border-b-[1.5px]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-primary font-semibold">Progress?</div>
                    </div>
                </div>
            </CardBody>

        </Card>
    )
};

export default TrackerSettings;