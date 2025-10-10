const path = require('path');
const fs = require('fs');

const deleteFile = async (fileName) => {
    try {
        const filePath = path.join(__dirname, '..', process.env.IMG_DIR || 'img', fileName);
        if (fs.existsSync(filePath)) {
            fs.accessSync(filePath);
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        throw new Error('File deletion failed: ' + err.message);
    }
};

module.exports = {
    deleteFile
};