const albumModel = require("../model/albumModel")
const mongoose = require("mongoose");

// Show all albums
async function getAll(req, res) {
    try {
        const albums = await albumModel.find()

        // If there are no albums
        if (albums.length == 0) return res.status(404).json({ error: "There are no albums in the database" })

        res.status(200).json(albums)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" + error })
    }
}

// Show albums by title
async function getByTitle(req, res) {
    try {
        // Select where title == title and return all of them
        const albums = await albumModel.find({ title: req.params.title })

        // If title is not found
        if (albums.length == 0) return res.status(404).json({ error: "Album title not found" })

        res.status(200).json(albums)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" + error })
    }
}

// Show albums by id
async function getById(req, res) {
    try {
        // Check if the id is a valid format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Not a valid ID format.' })

        // Select where title == title and return all of them
        const albums = await albumModel.findOne({ _id: req.params.id })

        // If id was not found
        if (albums.length == 0) return res.status(404).json({ error: "Album id not found" })

        res.status(200).json(albums)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" + error })
    }
}

// Create a new album
async function add(req, res) {
    try {
        // Create a new album object
        let albumNew = new albumModel({
            title: req.body.title,
            artist: req.body.artist,
            year: req.body.year
        });

        // Find if the album is in the DB
        const albums = await albumModel.find({
            title: req.body.title,
            artist: req.body.artist,
            year: req.body.year
        })

        // If the album EXISTS in the DB
        if (albums.length > 0) return res.status(409).json({ error: "The album is already in the database" })

        // If not create
        albumModel.insertMany(albumNew)  // add to the db
        res.status(201).json(albums) // return as a JSON object + HTTP-status code 201 (created).   

    } catch (error) {
        res.status(500).json({ error: "Server error" + error })
    }
}

// Update an album
async function update(req, res) {
    try {
        console.log(req.body.id, req.body.title, req.body.artist, req.body.year);

        const album = await albumModel
            .findByIdAndUpdate(
                req.params.id,
                {
                    title: req.body.title,
                    artist: req.body.artist,
                    year: req.body.year
                },
                { new: true });

        // !album == true when album is NULL bc album null == false
        if (!album) return res.status(404).json({ error: 'ID not found' });

        res.status(200).json(album)
    } catch (error) {

        res.status(500).json({ error: "Server error" + error })
    }
}

// Delete an album
async function remove(req, res) {
    try {        
        const album = await albumModel.findByIdAndRemove(req.params.id);

        if (!album) return res.status(404).json({ error: 'ID not found' });
    
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ error: "Server error" + error })
    }
}

module.exports = { getAll, getByTitle, add, update, remove, getById };