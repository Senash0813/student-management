const router = require("express").Router();
let Student = require("../Models/student.js");

router.route("/add").post((req,res)=>{
    
    const name = req.body.name ;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender
    })

    newStudent.save().then(()=>{
        res.json("Student Added")
    }).catch((err)=>{
        console.log(err);
    })
    
});

router.route("/").get((req,res)=>{

    Student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const {name, age, gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }

    const update = await Student.findByIdAndUpdate(userId, updateStudent).then(()=>{
        res.status(200).send({status: "Student Updated"})
    }).catch((err)=>{
        console.log(err);
        req.status(500).send({status: "Student update Failed", error: err.message});
    })

})

router.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Student Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Student record delete failed", error: err.message});
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let userId = req.params.id;

    const user = await Student.findById(userId).then((student)=>{
        res.status(200).send({status: "Student Details Fetched",student})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Student fetch Failed", error: err.message});
    })
})


module.exports = router;