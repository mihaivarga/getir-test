const records = require('./model.js');

exports.getData = (req, res) => {
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
