const displayInitials = (name: string) => {
    return name.split(" ").map(word => word.charAt(0).toUpperCase()).join("")
};

export default displayInitials;