const { Router } = require('express'); 
const LogEntry = require('../models/LogEntry'); 

const router = Router(); 

router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries); 
    } catch (error) {
        next(error); 
    }
}); 

router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body); 
        const savedEntry = await logEntry.save(); 
        res.json(savedEntry); 
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422); 
        }
        next(error); 
    }
});

router.delete('/:id', async (req, res) => {
    const deleteLog = await LogEntry.findByIdAndDelete(req.params.id); 
    res.send(deleteLog); 
});

module.exports = router;  