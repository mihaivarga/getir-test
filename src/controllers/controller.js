const records = require('../models/model.js');
const {validationResult} = require("express-validator");

exports.getData = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    records.aggregate([{
        $redact: {
            $cond: [{
                $and: [
                    {$gt: ['$createdAt', new Date(req.body.startDate)]},
                    {$lt: ["$createdAt", new Date(req.body.endDate)]},
                    {$gt: [{$sum: "$counts"}, req.body.minCount]},
                    {$lt: [{$sum: "$counts"}, req.body.maxCount]}
                ]
            }, "$$KEEP", "$$PRUNE"]
        }
    }]).then(items => {
        res.send(items);
    });
}
