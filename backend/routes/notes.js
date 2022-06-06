const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Note-CRUD Routes



// 1# Route: Notes-Fetching


router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Error Occured!");
    }
});



// 2# Route: Notes-Adding


router.post('/addnote', [

    // Validation: Title, Desc

    body('title', 'Please enter atleast 3 characters.').isLength({ min: 3 }),
    body('desc', 'Please enter atleast 5 characters.').isLength({ min: 5 }),

], fetchuser, async (req, res) => {
    try {

        // Throws an error if validation fails

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Creating note in DB

        const note = await Note.create({
            userId: req.userId,
            title: req.body.title,
            desc: req.body.desc,
            tag: req.body.tag
        });

        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Error Occured!");
    }
});



// 2# Route: Notes-updating


router.put('/updatenote/:id', [

    // Validation: Title, Desc

    body('title', 'Please enter atleast 3 characters.').isLength({ min: 3 }),
    body('desc', 'Please enter atleast 5 characters.').isLength({ min: 5 }),

], fetchuser, async (req, res) => {

    try {

        // Validation: if note exists & if user is auth

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not Found');
        }
        else if (note.userId.toString() !== req.userId) {
            return res.status(401).send('Not Allowed');
        }

        // Updating note in DB

        const updatedNote = {
            title: req.body.title,
            desc: req.body.desc,
            tag: req.body.tag
        };

        note = await Note.findByIdAndUpdate(req.params.id, { $set: updatedNote }, { new: true });
        res.json({ note });

    }
    catch (error) {
        console.error(error);
        res.status(500).send("An Error Occured!");
    }
});



// 3# Route: Notes-Delete


router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        // Validation: if note exists & if user is auth

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not Found');
        }
        else if (note.userId.toString() !== req.userId) {
            return res.status(401).send('Not Allowed');
        }

        // Deleting note in DB

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("An Error Occured!");
    }
});
module.exports = router;