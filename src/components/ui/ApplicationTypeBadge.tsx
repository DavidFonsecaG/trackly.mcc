const ApplicationTypeBadge: React.FC<{ type: string }> = ({ type }) => {
    const colors = {
        abroad: 'bg-indigo-700/5 text-indigo-700 border-indigo-700/15',
        COS: 'bg-blue-700/5 text-blue-700 border-blue-700/15',
        'transfer-in': 'bg-teal-700/5 text-teal-700 border-teal-700/15',
        domestic: 'bg-orange-600/5 text-orange-600 border-orange-600/15',
        reinstatement: 'bg-pink-700/5 text-pink-700 border-pink-700/15',
    };

    const displayText = type.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return (
        <span className={`px-2 py-1 rounded-md text-[0.6rem] border-[1.5px] ${colors[type as keyof typeof colors]}`}>
        {displayText}
        </span>
    );
};

export default ApplicationTypeBadge;