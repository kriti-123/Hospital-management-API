const express = require('express');
const deptController = require('../../../controller/api/v1/dept')

const router = express.Router();

router.post('/addDept',deptController.addDept);

module.exports = router;