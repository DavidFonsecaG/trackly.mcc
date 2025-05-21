const ApplicationTypeBadge: React.FC<{ type: string }> = ({ type }) => {
    const colors = {
        abroad: 'bg-purple-50 text-purple-700',
        COS: 'bg-blue-50 text-blue-700',
        'transfer-in': 'bg-teal-50 text-teal-700',
        domestic: 'bg-orange-50 text-orange-700',
        reinstatement: 'bg-pink-50 text-pink-700',
    };

    const displayText = type.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return (
        <span className={`px-2 py-1 rounded-full text-[0.6rem] ${colors[type as keyof typeof colors]}`}>
        {displayText}
        </span>
    );
};

export default ApplicationTypeBadge;