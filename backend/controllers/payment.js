const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

exports.processPayment = async (req, res) => {
  const { userId, courseId, paymentDetails } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (course.isFree) {
      return res.status(400).json({ error: "This course is free, no payment required." });
    }

    // Simuler l'intégration avec Orange Money
    const paymentValid = simulateOrangeMoneyPayment(paymentDetails);
    if (!paymentValid) {
      return res.status(402).json({ error: "Payment failed." });
    }

    // Inscrire l'utilisateur
    const enrollment = new Enrollment({
      userId,
      courseId,
      dateEnrolled: new Date(),
      status: "Active",
      progress: {
        completedSections: [],
        quizScores: [],
        progressPercentage: 0,
      },
    });

    await enrollment.save();

    res.status(201).json({ message: "Payment successful and enrollment completed." });
  } catch (err) {
    console.error("Erreur lors du traitement du paiement :", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Simulation de paiement avec Orange Money (à remplacer par une intégration réelle)
function simulateOrangeMoneyPayment(paymentDetails) {
  return paymentDetails && paymentDetails.amount > 0;
}