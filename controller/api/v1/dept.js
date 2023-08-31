const Dept = require('../../../models/department');
/*dept add controller*/
module.exports.addDept = async function (req, res) {
      const dept = await Dept.findOne({ dept: req.body.deptName });
        if (!dept) {
            const doc = await Dept.create(req.body);
            if(doc){
               return res.status(200).json({ message: "successfully inserted to databse", doc: doc });
            }
            return res.status(401).json({ error: true, msg: 'error occured during creation' });
        }
        return res.status(401).send({ error: true, msg: 'error occured during creation' });

}


 




