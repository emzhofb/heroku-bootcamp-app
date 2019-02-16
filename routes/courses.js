var express = require('express');
var router = express.Router();
const models = require('../models')
const { checkAuth } = require('../middlewares/auth')

/* GET users listing. */
// menampilkan data dari tabel course di database ke views => courses => index
router.get('/', checkAuth, function(req, res, next) {
    models.Course.findAll().then(courses => {
        // render fungsinya sama kaya redirect yakni pindah (bedanya redirect ngelink ke router, render ngambil dari view)
        res.render('courses/index', {courses: courses})
        // courses di passing datanya ke views => courses => index
    }).catch(err => {
        res.render('courses/index')
    })
});

// get untuk mengambil course
router.get('/create', checkAuth, (req, res) => {
    // redirect ke views => courses => index
    res.render('courses/create')
})

// menambah course ke database
router.post('/create', (req, res) => {
    // mengambil name dari courses
    const { name } = req.body
    // membuat baru untuk course
    models.Course.create({name}).then(courses => {
        // redirect ke page course
        res.redirect('/courses')
    }).catch(err => {
        // menampilkan error
        console.log(err)
        res.redirect('/courses')
    })
})

router.get('/delete/:id', checkAuth, (req, res) => {
    // buat variable baru untuk menampung id course yang akan di edit
    const courseId = req.params.id
    // mencari course yang sama dengan id coursenya
    models.Course.findOne({
        where: {
            id: courseId
        }
    }).then(courses => {
        // menghapus course yang sesuai dengan id yang di ambil
        return courses.destroy()
    }).then(courses => {
        res.redirect('/courses')
    }).catch(err => {
        res.redirect('/courses')
    })
})

router.get('/edit/:id', checkAuth, (req, res) => {
    // membuat variable baru untuk menampung id coursenya
    const courseId = req.params.id
    // mengambil name dari course di databasenya
    const { name } = req.body
    // mencari course yang sama dengan id course yang di pilih
    models.Course.findOne({
        where: {
            id: courseId
        }
    }).then(courses => {
        // mempassing data course ke views => edit
        res.render('courses/edit', {courses: courses})
    }).catch(err => {
        console.log(err)
        res.render('/courses')
    })
})

router.post('/edit/:id', (req, res) => {
    // membuat variable baru yang menampung id coursenya
    const courseId = req.params.id
    // membuat variable baru untuk menampung name dari coursenya
    const { name } = req.body
    // mencari course yang sama dengan idnya
    models.Course.findOne({
        where: {
            id: courseId
        }
    }).then(courses => {
        // merubah name dari coursenya
        return courses.update({
            name
        })
    }).then(updateCourses => {
        // kembali ke page course
        res.redirect('/courses')
    }).catch(err => {
        console.log(err)
        res.redirect('/courses')
    })
})

module.exports = router;
