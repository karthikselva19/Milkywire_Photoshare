const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    id: String,
    comment: String,
    time: String,
});

module.exports = mongoose.model('Image', imageSchema, 'comments');
