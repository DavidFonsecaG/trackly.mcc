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
                <div className="flex flex-col p-6 text-sm border-y-[1.5px] border-neutral-200/60">
                    <div className="flex items-center">
                        <div className="size-10 rounded-full bg-primary"></div>
                        <div className="ml-4 text-primary font-semibold">Type of applications</div>
                    </div>
                    <div className="flex h-10">
                        <div className="ml-5 size-8 rounded-bl-sm border-b-[1.5px] border-l-[1.5px] border-neutral-200/60"></div>
                        <div className="flex ml-1 text-primary items-end">Type of applications</div>
                    </div>
                </div>
            </CardBody>

        </Card>
    )
};

export default TrackerSettings;