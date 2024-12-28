import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function UpdateCourse() {
  const { currentUser } = useSelector((state) => state.user);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    previewVideoUrl: "",
    previewText: "",
    createdBy: currentUser._id,
    price: 0,
    userHasAccess: false,
    isFree: false,
    level: "Beginner",
    domain: "",
    duration: 1,
    sections: [],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  // Gestion des changements dans les champs de base du cours
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData({
      ...courseData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageSubmit = (e) => {
    if(file && file.size > 0) {
      setUploading(true);
      setImageUploadError(false);
      storeImage(file);
    } else {
      setImageUploadError("enregistrez d'abord une image");
      setUploading(false);
    }
  }

  const storeImage = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setImageUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setCourseData({ ...courseData, imageUrl: downloadURL });
            setImageUploadError(false);
            setUploading(false);
          })
          .catch(err => {
            setImageUploadError("Échec du téléchargement de l'image (l'image doit faire moins de 2 Mo)");
            setUploading(false);
          })
      }
    );
  }

  // Need to delete from Firebase
  const handleRemoveImage = () => {
    setCourseData({
      ...courseData,
      imageUrl: ''
    });
  }

  // Ajout d'une section
  const addSection = () => {
    setCourseData({
      ...courseData,
      sections: [...courseData.sections, { title: "", chapters: [], quiz: null }],
    });
  };

  // Gestion des modifications dans les sections
  const handleSectionChange = (index, e) => {
    const sections = [...courseData.sections];
    sections[index][e.target.name] = e.target.value;
    setCourseData({ ...courseData, sections });
  };

  // Ajout d'un chapitre dans une section
  const addChapter = (sectionIndex) => {
    const sections = [...courseData.sections];
    sections[sectionIndex].chapters.push({ title: "", segments: [] });
    setCourseData({ ...courseData, sections });
  };

  // Gestion des modifications dans les chapitres
  const handleChapterChange = (sectionIndex, chapterIndex, e) => {
    const sections = [...courseData.sections];
    sections[sectionIndex].chapters[chapterIndex][e.target.name] = e.target.value;
    setCourseData({ ...courseData, sections });
  };

  // Ajout d'un segment (texte, vidéo, fichier) dans un chapitre
  const addSegment = (sectionIndex, chapterIndex) => {
    const sections = [...courseData.sections];
    sections[sectionIndex].chapters[chapterIndex].segments.push({ type: "text", content: "" });
    setCourseData({ ...courseData, sections });
  };

  // Gestion des modifications dans les segments
  const handleSegmentChange = (sectionIndex, chapterIndex, segmentIndex, e) => {
    const sections = [...courseData.sections];
    sections[sectionIndex].chapters[chapterIndex].segments[segmentIndex][e.target.name] = e.target.value;
    setCourseData({ ...courseData, sections });
  };

  // Gestion des modifications dans le quiz
  const handleQuizChange = (sectionIndex, e) => {
    const sections = [...courseData.sections];
    sections[sectionIndex].quiz[e.target.name] = e.target.value;
    setCourseData({ ...courseData, sections });
  }

  // Ajout d'un quiz
  const addQuiz = (sectionIndex) => {
    const sections = [...courseData.sections];
    sections[sectionIndex].quiz = { title: "", questions: [] };
    setCourseData({ ...courseData, sections });
  };

  // Ajout d'une question dans le quiz
  const addQuestion = (sectionIndex) => {
    const sections = [...courseData.sections];
    sections[sectionIndex].quiz.questions.push({ 
      question: "", 
      options: ["", "", "", ""], 
      correctAnswer: [] 
    });
    setCourseData({ ...courseData, sections });
  };

  // Gestion des modifications dans les questions du quiz
  const handleQuestionChange = (sectionIndex, qIndex, e) => {
    const sections = [...courseData.sections];
    sections[sectionIndex].quiz.questions[qIndex][e.target.name] = e.target.value;
    setCourseData({ ...courseData, sections });
  };

  // Gestion des options de réponse dans une question du quiz
  const handleOptionChange = (sectionIndex, qIndex, optionIndex, e) => {
    const sections = [...courseData.sections];
    sections[sectionIndex].quiz.questions[qIndex].options[optionIndex] = e.target.value;
    setCourseData({ ...courseData, sections });
  };

  // Gestion de la sélection des réponses correctes
  const toggleCorrectAnswer = (sectionIndex, qIndex, optionIndex) => {
    const sections = [...courseData.sections];
    const correctAnswers = sections[sectionIndex].quiz.questions[qIndex].correctAnswer;
    if (correctAnswers.includes(optionIndex)) {
      // Supprime l'option si elle est déjà dans les réponses correctes
      sections[sectionIndex].quiz.questions[qIndex].correctAnswer = correctAnswers.filter((i) => i !== optionIndex);
    } else {
      // Ajoute l'option aux réponses correctes
      sections[sectionIndex].quiz.questions[qIndex].correctAnswer.push(optionIndex);
    }
    setCourseData({ ...courseData, sections });
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const courseId = params.id;
      const res = await fetch(`/api/courses/get/${courseId}`);
      const data = await res.json();

      if(data.success === false) {
        console.log(data.message);
        return;
      }
      console.log(data);
      // setCourseData(data);
    };

    fetchCourse();
  }, []);

  // Envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(courseData.imageUrl.length === 0) return setError("Please add an image for the course");
      setLoading(true);
      setError(false);
      const res = await fetch(`${API_URL}/api/courses/create`, {
        method: "POST",
        credentials: "include",
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData),
      });

      const data = await res.json();
      setLoading(false);

      if(data.success === false) {
        setError(data.message);
        alert("Erreur lors de la création du cours");
      }
      
      navigate(`/${data.course._id}/info`);

    } catch (error) {
      setError(error.message);
      setLoading(false)
      alert("Erreur lors de la création du cours");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-5 my-8 bg-white rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">modifier le cours</h1>
      <form onSubmit={handleSubmit}>
        {/* Informations de base du cours */}
        <div className="mb-6">
          <label className="block text-gray-700">Titre du cours :</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700">Description :</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Video de presentation du cours :</label>
          <input
            type='url'
            name="previewVideoUrl"
            value={courseData.previewVideoUrl}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Résumer :</label>
          <textarea
            name="previewText"
            value={courseData.previewText}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* <div className="mb-6">
          <label className="block text-gray-700">Image URL :</label>
          <input
            type="text"
            name="imageUrl"
            value={courseData.imageUrl}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div> */}

        {/* Prix et gratuité */}
        <div className="flex gap-12 items-center">
          <div className="flex">
            <label className="block text-gray-700 pr-2">Gratuit :</label>
            <input
              type="checkbox"
              name="isFree"
              checked={courseData.isFree}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Oui</label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Prix (en XOF) :</label>
            <input
              type="number"
              name="price"
              value={courseData.isFree ? courseData.price = 0 : courseData.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              disabled={courseData.isFree} // Désactive le champ si 'isFree' est coché
            />
          </div>
        </div>

        {/*  */}

        <div className="mb-6">
          <label className="block text-gray-700">Niveau :</label>
          <select name="level" value={courseData.level} onChange={handleChange} className='w-full p-3 border rounded-lg mb-2' required>
            <option value="Beginner">Beginner</option>
            <option value="intermediate">intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Domaine :</label>
          <input
            type="text"
            name="domain"
            value={courseData.domain}
            placeholder='Domain (ex: Informatique, Marketing)'
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Durée du cours (en heures) :</label>
          <input
            type="number"
            name="duration"
            min="1"
            value={courseData.duration}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* Upload image */}

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Image : 
            <span className='font-normal text-gray-600 ml-2'>l'image doit être la couverture du cours</span>
          </p>
          <div className="flex gap-4">
            <input onChange={(e) => setFile(e.target.files[0])} className='p-3 border border-gray-300 rounded w-full' type="file" id='image' accept='image/*'/>
            <button disabled={uploading} type="button" onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              {uploading ? 'Loading...' : 'Upload'}
            </button>
          </div>
          <p className='text-sm self-center'>
            {
              imageUploadError ? (
                <span className="text-red-700">{imageUploadError}</span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">{`Uploading ${filePerc} %`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">Image successfully uploaded</span>
              ) : ''
            }
          </p>
          {
            courseData.imageUrl && <div className="flex justify-between p-2 border items-center">
              <img src={courseData.imageUrl} alt="course cover" className="w-20 h-20 object-contain rounded-lg"/>
              <button onClick={handleRemoveImage} type="button" className="text-red-700 p-2 uppercase hover:opacity-75">Delete</button>
            </div>
          }
        </div>

        {/* Sections */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Parties :</h2>
          {courseData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <label className="block text-gray-700">Titre de la partie :</label>
              <input
                type="text"
                name="title"
                value={section.title}
                onChange={(e) => handleSectionChange(sectionIndex, e)}
                className="w-full p-2 border rounded-lg mb-4"
              />

              {/* Chapitres */}
              <button
                type="button"
                onClick={() => addChapter(sectionIndex)}
                className="bg-green-500 text-white px-3 py-2 rounded-lg mb-4"
              >
                Ajouter un chapitre
              </button>
              {section.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className="mb-4 p-3 border rounded-lg bg-gray-100">
                  <label className="block text-gray-700">Titre du chapitre :</label>
                  <input
                    type="text"
                    name="title"
                    value={chapter.title}
                    onChange={(e) => handleChapterChange(sectionIndex, chapterIndex, e)}
                    className="w-full p-2 border rounded-lg mb-4"
                  />

                  {/* Segments */}
                  <button
                    type="button"
                    onClick={() => addSegment(sectionIndex, chapterIndex)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg mb-4"
                  >
                    Ajouter un segment
                  </button>
                  {chapter.segments.map((segment, segmentIndex) => (
                    <div key={segmentIndex} className="mb-2">
                      <select
                        name="type"
                        value={segment.type}
                        onChange={(e) => handleSegmentChange(sectionIndex, chapterIndex, segmentIndex, e)}
                        className="w-full p-2 border rounded-lg mb-2"
                      >
                        <option value="text">Texte</option>
                        <option value="video">Vidéo</option>
                        <option value="file">Fichier</option>
                      </select>
                      <input
                        type="text"
                        name="content"
                        value={segment.content}
                        onChange={(e) => handleSegmentChange(sectionIndex, chapterIndex, segmentIndex, e)}
                        placeholder="Contenu (texte ou URL)"
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              ))}

              {/* Quiz */}
              <button
                type="button"
                onClick={() => addQuiz(sectionIndex)}
                className="bg-yellow-500 text-white px-3 py-2 rounded-lg mb-4"
              >
                Ajouter un quiz
              </button>
              {section.quiz && (
                <div className="p-4 bg-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold">Quiz</h3>
                  <div className="">
                    <label className="block">Titre du quiz :</label>
                    <input
                      type="text"
                      name="title"
                      value={section.quiz.title}
                      onChange={(e) => handleQuizChange(sectionIndex, e)}
                      className="w-full p-2 border rounded-lg mb-4"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => addQuestion(sectionIndex)}
                    className="bg-amber-500 text-white px-3 py-2 rounded-lg mb-4"
                  >
                    Ajouter une question
                  </button>
                  {section.quiz.questions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-4 p-3 border rounded-lg bg-gray-100">
                      <label className="block">Question : </label>
                      <input 
                        type="text" 
                        name="question"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(sectionIndex, qIndex, e)}
                        className="w-full p-2 border rounded-lg mb-4"
                      />

                      <h4 className="text-gray-600">Options :</h4>
                      {q.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(sectionIndex, qIndex, optionIndex, e)}
                            placeholder={`Option ${optionIndex + 1}`}
                            className="w-full p-2 border rounded-lg mr-2"
                          />
                          <input
                            type="checkbox"
                            checked={q.correctAnswer.includes(optionIndex)}
                            onChange={() => toggleCorrectAnswer(sectionIndex, qIndex, optionIndex)}
                            className="mr-2"
                          />
                          <label>Correct</label>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Bouton pour ajouter une nouvelle section */}
          <button
            type="button"
            onClick={addSection}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Ajouter une partie
          </button>
        </div>

        {/* Soumission du formulaire */}
        <button disabled={loading || uploading} type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg mt-8 hover:opacity-90 disabled:opacity-80">
          {loading ? 'enregistrement...' : 'modifier le cours'}
        </button>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </form>
    </div>
  );
}
