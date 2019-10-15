import data from './data'

const topList = {
    getAll() {
        return new Promise(function(resolve, reject) {
            resolve({"data":data});
        });
    }
}

export default topList;