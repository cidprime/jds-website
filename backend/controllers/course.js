const Course = require('../models/Course');
const Section = require('../models/Section');
const Chapter = require('../models/Chapter');
const Quiz = require('../models/Quiz');

const errorHandler = require('../utils/errorHandler');
const fs = require('fs').promises;

/**
 * Retrieves all courses from the database and sends a JSON response with the courses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves once the operation is complete.
 */
exports.getAllCourses = async (req, res, next) => {
  const { theme } = req.query;

  try {
    let courses;

    if(theme) {
      courses = await Course.find({ theme })
        .select('-sections')
        .populate({
          path: 'createdBy', select: 'firstname lastname'
        });
  
    } else {
      courses = await Course.find()
        .select('-sections')
        .populate({
          path: 'createdBy', select: 'firstname lastname'
        });
    }

    return res.json(courses);

  } catch(err) {
    next(err);
  }

};


/**
 * Retrieves a specific course content based on the provided course ID.
 * 
 * @param {Object} req - The request object containing the course ID in the parameters.
 * @param {Object} res - The response object to send back the course content.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {Object} The JSON response with the course content or an error message if the course is not found.
 */
exports.getCourseContent = async (req, res, next) => {
  try{
    const course = await Course.findById(req.params.id)
      .select('-imageUrl')
      .populate({
        path: 'createdBy', select: 'firstname lastname'
      })
      .populate({
        path: 'sections',
        populate: [
          {
            path: 'chapters'
          }
        ]
      });
    
    if (!course) return res.status(404).send('Course content not found.');

    res.status(200).json(course);

  } catch(err) {
    next(err);
  }
};

/**
 * Retrieves information for a specific course based on the provided course ID.
 * 
 * @param {Object} req - The request object containing the course ID in the parameters.
 * @param {Object} res - The response object to send back the course information.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {Object} The course information (title, description,imageUrl, price, level, duration, rating, createdBy, syllabus) if found, or an error message if the course is not found.
 */
exports.getCourseInfo = async (req, res, next) => {
  try{
    const course = await Course.findById(req.params.id)
      .select('-imageUrl')
      .populate({
        path: 'createdBy', select: 'firstname lastname avatar'
      })
      .populate({
        path: 'sections', select: 'title chapters',
        populate: {
          path: 'chapters', select: 'title'
        }
      });
    
    if (!course) return next(errorHandler(404, 'Course not found'));
    
    res.json(course);

  } catch(err) {
    next(err);
  }
};

async function addReview(courseId, userId, rating) {
  try {
    // Trouver le cours à mettre à jour
    const course = await Course.findById(courseId);

    if (!course) return next(errorHandler(404, 'Course not found'));

    // Vérifier si l'utilisateur a déjà laissé un avis (facultatif, pour éviter les doublons)
    const existingReview = course.reviews.find(review => review.userId.toString() === userId);
    if (existingReview) {
      return { error: "Vous avez déjà laissé un avis sur ce cours" };
    }

    // Ajouter l'avis au tableau des avis
    const newReview = {
      userId,
      rating,
    };
    course.reviews.push(newReview);

    // Mettre à jour le nombre de reviews et la note moyenne
    course.numberOfReviews = course.reviews.length;
    const totalRating = course.reviews.reduce((sum, review) => sum + review.rating, 0);
    course.rating = totalRating / course.numberOfReviews;

    // Sauvegarder le cours mis à jour
    await course.save();
    
    return { success: true, message: "Votre avis a été ajouté avec succès" };
  } catch (err) {
    next(err);
  }
}


exports.createCourse = async (req, res, next) => { 
  const courseData = req.body;
  const { title, description, imageUrl, previewVideoUrl, previewText, createdBy, price, isFree, level, domain, duration, sections } = courseData;

  try {
    const sectionIds = []; // Stockage des ObjectId des sections pour le cours

    // Création des sections avec chapitres et quiz
    for (const sectionData of sections) {
      const chapterIds = []; // Stockage des ObjectId des chapitres pour chaque section

      // Création des chapitres
      for (const chapterData of sectionData.chapters) {
        const chapter = new Chapter(chapterData);
        await chapter.save();
        chapterIds.push(chapter._id); // Ajout de l'ObjectId du chapitre créé
      }

      // Création du quiz (si présent dans la section)
      let quizId = null;
      if (sectionData.quiz) {
        const quiz = new Quiz(sectionData.quiz);
        await quiz.save();
        quizId = quiz._id;
      }

      // Création de la section avec les chapitres et le quiz associés
      const section = new Section({
        title: sectionData.title,
        chapters: chapterIds, // Références aux chapitres créés
        quiz: quizId, // Référence au quiz créé
      });
      await section.save();
      sectionIds.push(section._id); // Ajout de l'ObjectId de la section créée
    }

    // Création du cours avec toutes les sections associées
    const course = new Course({
      title,
      description,
      imageUrl,
      previewVideoUrl,
      previewText,
      createdBy,
      price,
      isFree,
      level,
      domain,
      duration,
      sections: sectionIds, // Ajoute les références des sections(partie) créées
    });

    await course.save();

    return res.status(201).json({ message: 'Course created successfully' });
    // return { success: true, course };

  } catch (err) {
    // console.error("Erreur lors de la création du cours complet :", error);
    // return { success: false, error: "Erreur lors de la création du cours complet" };
    next(err);
  }
};

/**
 * Modify a course based on the request data.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response indicating success or failure of course modification.
 */
exports.modifyCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if(!course) return next(errorHandler(404, 'Course not found'));

    const courseUpdated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(courseUpdated);

  } catch (err) {
    next(err);
  }
};


/**
 * Deletes a course based on the provided course ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response indicating the result of the deletion operation.
 */
exports.deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) return next(errorHandler(404, 'Course not found'));

    await Course.findByIdAndDelete(courseId);
    res.json("Course deleted successfully");

  } catch (error) {
    next(err);
  }
};