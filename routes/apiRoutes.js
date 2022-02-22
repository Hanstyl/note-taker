// Dependencies
const express = require("express");
const router = express.Router();
const { generateNewNotes, newNotes } = require("../lib/notes");
const fs = require("fs");



// GET Request
router.get("/notes", (req, res) => {
    fs.readFile("./db/db.json", (error, notes) => {
        if (error) {
            return res.json(error)
        }
        notes = JSON.parse(notes)
        res.json(notes)
    });
});


// POST Request
router.post("/notes", (req, res) => {
    fs.readFile("./db/db.json", (error, notes) => {
        if (error) {
            return res.json(error)
        }
        notes = JSON.parse(notes)


        req.body.id = notes.length.toString();

        const makeNewNotes = newNotes(req.body, notes)
        res.json(newNotes)
    });
});


// Delete Request
router.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id
    console.log(noteId)

    fs.readFile("./db/db.json", (error, notes) => {
        if (error) {
            return console.log(error)
        }
        notes = JSON.parse(notes)

        notes = notes.filter(val => val.id !== noteId)

        fs.writeFile("./db/db.json", JSON.stringify(notes), (error, data) => {
            if (error) {
                return error
            }
            res.json(notes)
        })
    })
});

module.exports = router;