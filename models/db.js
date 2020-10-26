const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:Password@cluster0.rxgaf.mongodb.net/EmployeeDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
 if (!err) { console.log('pass mongodb connection') }
}
)