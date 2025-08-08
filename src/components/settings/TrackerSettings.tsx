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
            <CardBody>
                <div>Type of applications</div>
                <div>documents</div>
                <div>Programs</div>
                <div>Schedules</div>
                <div>Status</div>
                <div>Progress?</div>
            </CardBody>

        </Card>
    )
};

export default TrackerSettings;