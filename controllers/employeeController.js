const express = require('express');
let router = express.Router();
const Employee = require('../models/employee.modal.js')

function handleValidationError(err, body) {
 for (field in err.errors) {
  switch (err.errors[field].path) {
   case 'fullName':
    body['fullNameError'] = err.errors[field].message;
    break;
   case 'email':
    body['emailError'] = err.errors[field].message;
    break;
   default:
    break;
  }
 }
}


router.get('/', (req, res) => {
 res.render('employee/addOrEdit', {
  viewTitle: "Insert Employee"
 })
})

router.post('/', (req, res) => {
 console.log(req.body)
 if (req.body._id == '') {
  insertRecord(req, res);
 } else {
  updateRecord(req, res);
 }

})

router.get('/list', (req, res) => {
 Employee.find((err, docs) => {
  if (!err) {
   console.log(docs)
   res.render('employee/list', {
    list: docs
   })
  }
 })
})
function insertRecord(req, res) {
 let employee = new Employee();
 employee.fullName = req.body.fullName;
 employee.email = req.body.email;
 employee.mobile = req.body.mobile;
 employee.city = req.body.city;
 employee.save((err, doc) => {
  if (!err) {
   res.redirect('employee/list');
  }
  else {
   if (err.name == 'ValidationError') {
    handleValidationError(err, req.body);
    res.render('employee/addOrEdit', {
     viewTitle: "Insert Employee",
     employee: req.body
    })
   }
   else
    console.log('error during record insertion' + err);
  }
 });
}

router.get('/:id', (req, res) => {
 Employee.findById(req.params.id, (err, doc) => {
  if (!err) {
   res.render("employee/addOrEdit", {
    viewTitle: "Update Employee",
    employee: doc
   })
  }
 })
})

function updateRecord(req, res) {
 Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
  if (!err) {
   res.redirect('employee/list');
  }
  else {
   if (err.name == 'ValidationError') {
    handleValidationError(err, req.body);
    res.render('employee/addOrEdit', {
     viewTitle: "Update Employee",
     employee: req.body
    })
   }
   else
    console.log('error during record insertion' + err);
  }
 })
}

router.get('/delete/:id', (req, res) => {
 Employee.findByIdAndRemove(req.params.id, (err, doc) => {
  if (!err) {
   res.redirect('/employee/list');
  }
  else {
   if (err.name == 'ValidationError') {
    handleValidationError(err, req.body);
    res.render('employee/addOrEdit', {
     viewTitle: "Update Employee",
     employee: req.body
    })
   }
   else
    console.log('error during record insertion' + err);
  }
 })
})
module.exports = router;