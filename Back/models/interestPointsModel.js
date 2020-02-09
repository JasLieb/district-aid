const validator = require('validator');
// TODO use validator 

const newPoint = (name,location,type) => {
    return {
        id: 0,
        name: name,
        location: location,
        type: type,
        creationDate: Date.now(),
        dueDate: null
    };
};

module.exports = {
    newPoint
};