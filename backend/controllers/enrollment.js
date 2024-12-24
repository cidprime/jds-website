const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

exports.enrollAndTrackProgress = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Vérifier si l'utilisateur est déjà inscrit
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: "User already registered", status: "registered"});
    }

    // Récupère le cours pour vérifier s'il est gratuit ou payant
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Si le cours est payant, on renvoie un message indiquant qu’un paiement est requis
    if (!course.isFree) {
      return res.status(200).json({ message: "payment required", status: "payment_required" });
    }

    // Crée un nouveau document Enrollment pour l'inscription et le suivi
    const NewEnrollment = new Enrollment({
      userId,
      courseId,
      dateEnrolled: new Date(),
      status: "Active",
      progress: {
        completedSections: [],
        quizScores: [],
        progressPercentage: 0
      }
    });

    await NewEnrollment.save();
    res.status(201).json({ message: "Successful registration", status: "registered"});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.checkEnrollment = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const enrollment = await Enrollment.findOne({ userId, courseId });

    if (enrollment) {
      return res.status(200).json({ isEnrolled: true });
    } else {
      return res.status(200).json({ isEnrolled: false });
    }
  } catch (err) {
    console.error("Erreur lors de la vérification de l'inscription :", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getAllEnrollments = async (req, res, next) => {
  try{
    const enrollment = await Enrollment.find();
    if(!enrollment) return res.status(404).json({ message: 'Not found' });

    return res.json({ enrollment });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}


exports.getUserEnrollment = async (req, res, next) => {
  try{
    const userId = req.params.id;
    return await UserCourse.find({ userId })
      .populate('courseId', 'title description') 
      .populate('progress.completedSections')
      .exec();

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}


// exports.createEnrollment = async (req, res, next) => {
//   // use matchedData to verified the data in req here
//   try{
//     const newEnrollment = new Enrollment({
//       ...req.body
//     });

//     await newEnrollment.save();
//     return res.status(201).json({ message: 'Enrollment created successfully' });

//   } catch(err) {
//     res.status(400).json({ error: err.message });
//   }
// }


exports.modifyEnrollment = async (req, res, next) => {
  try{
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findById(enrollmentId);
    if(!enrollment) return res.status(404).json({ message: 'Not found' });

    await Enrollment.findByIdAndUpdate(enrollmentId, { ...req.body }, { new: true, runValidators: true });
    return res.json({ message: 'modified enrollment' });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}


exports.deleteEnrollment = async (req, res, next) => {
  try{
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findById(enrollmentId);
    if(!enrollment) return res.status(404).json({ message: 'Not found' });

    await Enrollment.findByIdAndDelete(enrollmentId);
    return res.json({ message: 'Enrollment deleted successfully' });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}