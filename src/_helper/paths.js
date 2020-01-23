let pathList;

exports.setPath = (paths = []) => {
    pathList = paths;
};

exports.getPath = () => {
    return pathList;
}