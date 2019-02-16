var express = require('express');
var router = express.Router();
const models = require('../models')
const { checkAuth } = require('../middlewares/auth')

/* GET users listing. */
// menampilkan data dari tabel student di database ke views => students => index
router.get('/', checkAuth, function(req, res, next) {
    // passing students include course
    models.Student.findAll({include: [{model: models.Course}]}).then(students => {
        models.Course.findAll().then(courses => {
            // render fungsinya sama kaya redirect yakni pindah (bedanya redirect ngelink ke router, render ngambil dari view)
            res.render('students/index', {students: students, courses: courses})
            // students di passing datanya ke views => students => index
        }).catch(err => {
            console.log(err)
            res.render('students/index')
        })
    })
});

// mengambil student
router.get('/create', checkAuth, (req, res) => {
    models.Course.findAll().then(courses => {
        // redirect ke views => students => index
        res.render('students/create', {courses: courses})
    }).catch(err => {
        console.log(err)
        res.render('students/create')
    })
})

// menambah students ke database
router.post('/create', (req, res) => {
    // mengambil data dari students
    const { name, courseId } = req.body
    // membuat students baru
    models.Student.create({name, courseId}).then(students => {
        // redirect ke views => students
        res.redirect('/students')
    }).catch(err => {
        // menampilkan error
        console.log(err)
        res.redirect('/students')
    })
})

router.get('/delete/:id', checkAuth, (req, res) => {
    // buat variable baru untuk menampung id student yang akan di hapus
    const studentId = req.params.id
    // mencari student yang sama dengan id nya
    models.Student.findOne({
        where: {
            id: studentId
        }
    }).then(students => {
        // menghapus student yang sesuai dengan id yang di ambil
        return students.destroy()
    }).then(students => {
        res.redirect('/students')
    }).catch(err => {
        console.log(err)
        res.redirect('/students')
    })
})

module.exports = router;
