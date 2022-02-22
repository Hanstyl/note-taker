// Required Packages

const fs = require('fs');
const path = require('path');



// Makes New Notes

const newNotes = (body, noteArr) => {
    const notes = body;
    noteArr.push(notes);

    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(noteArr, null, 2)
    );
    return notes;
};


// Export
module.exports = { newNotes }