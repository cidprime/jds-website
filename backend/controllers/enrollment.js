const Enrollment = require('../models/Enrollment');

exports.enrollAndTrackProgress = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Vérifie si l'utilisateur est déjà inscrit
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ error: "Déjà inscrit à ce cours." });
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
    res.status(201).json({ message: "Inscription réussie avec suivi de progression"});

  } catch (err) {
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


