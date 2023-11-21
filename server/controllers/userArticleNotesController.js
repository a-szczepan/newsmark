const db = require("../database/db");
const UserNotes = require("../models/userArticleNotesModel")(
  db.sequelize,
  db.Sequelize
);
const Annotation = require("../models/annotationModel")(
  db.sequelize,
  db.Sequelize
);

const findNote = async (query) => await UserNotes.findOne(query);

const findAnnotations = async (query) => await Annotation.findAll(query);

const createAnnotation = async (data) => {
  try {
    const newAnnotation = await Annotation.create({ ...data, valid: true });
    return newAnnotation.toJSON();
  } catch (e) {
    console.log(e);
  }
};

const createUserNote = async (data) => {
  try {
    const newNote = await UserNotes.create({ ...data, valid: true });
    return newNote.toJSON();
  } catch (e) {
    console.log(e);
  }
};

const updateUserNote = async (update, query) =>
  await UserNotes.update(update, query);

const updateAnnotation = async (update, query) =>
  await Annotation.update(update, query);

exports.addNote = async (req, res) => {
  const { title, selectedText, color, note, articleUrl } = req.body;
  const { email } = res.locals.user;
  const url = articleUrl.replace(/[%]/g, "/");

  let userNote = await findNote({
    where: { articleUrl: url, userEmail: email },
    raw: true,
  });

  if (userNote === null) {
    const annotation = await createAnnotation({
      userEmail: email,
      articleUrl: url,
      title,
      selectedText,
      color,
      note,
    });

    const newNote = await createUserNote({
      userEmail: email,
      articleUrl: url,
      annotations: annotation ? [annotation.id] : [],
    });

    return res.status(200).send(newNote);
  } else {
    const annotation = await createAnnotation({
      userEmail: email,
      articleUrl: url,
      title,
      selectedText,
      color,
      note,
    });

    await updateUserNote(
      {
        annotations: annotation
          ? userNote.annotations.concat([annotation.id])
          : userNote.annotation,
      },
      { where: { userEmail: email, articleUrl: url } }
    ).then(async () => {
      userNote = await findNote({
        where: { articleUrl: url, userEmail: email },
        raw: true,
      });
    });
    return res.status(200).send(userNote);
  }
};

exports.getArticleNotes = async (req, res) => {
  const url = req.query.url.replace(/[%]/g, "/");
  const { email } = res.locals.user;

  const userNote = await findNote({
    where: { articleUrl: url, userEmail: email },
    raw: true,
  });

  if (userNote === null) return res.status(404).send({ message: "Not found" });

  return res.status(200).send(userNote);
};

exports.getArticleAnnotations = async (req, res) => {
  const url = req.query.url.replace(/[%]/g, "/");
  const { email } = res.locals.user;

  const articleAnnotations = await findAnnotations({
    where: { articleUrl: url, userEmail: email },
    raw: true,
  });

  if (articleAnnotations === null)
    return res.status(404).send({ message: "Not found" });

  return res.status(200).send(articleAnnotations);
};

exports.updateAnnotation = async (req, res) => {
  const { title, selectedText, color, note, articleUrl } = req.body;
  const annotationId = req.params.id;
  const { email } = res.locals.user;

  console.log("tutaj", annotationId, email)

  await updateAnnotation(
    { title, selectedText, color, note },
    { where: { id: annotationId } }
  ).then(async () => {
    //maybe return only updated (?)
    const annotations = await findAnnotations({
      where: { articleUrl, userEmail: email },
      raw: true,
    });
    return res.status(200).send(annotations);
  });
};

exports.deleteAnnotation = async (req, res) => {
  const annotationId = req.params.id;
  const { email } = res.locals.user;

  try {
    const annotation = await Annotation.findByPk(annotationId);
    const articleUrl = annotation.articleUrl;

    if (!annotation) {
      throw new Error("Annotation not found");
    }

    await annotation.destroy();

    await findNote({
      where: { articleUrl, userEmail: email },
      raw: true,
    }).then(
      async (userNote) =>
        await updateUserNote(
          {
            annotations: userNote.annotations.filter(
              (item) => item !== annotationId
            ),
          },
          { where: { userEmail: email, articleUrl } }
        )
    );

    return { success: true, message: "Annotation deleted successfully" };
  } catch (error) {
    console.error("Error deleting annotation:", error.message);
    return { message: "Error deleting annotation" };
  }
};

exports.bookmark = async (req, res) => {
  const url = req.query.url.replace(/[%2F]/g, "/");
  const { email } = res.locals.user;

  let userNote = await findNote({
    where: { articleUrl: url, userEmail: email },
    raw: true,
  });

  if (userNote === null) {
    const newNote = createUserNote({
      userEmail: email,
      articleUrl: url,
      isBookmarked: true,
      annotations: [],
    });

    return res.status(200).send(newNote);
  } else {
    await updateUserNote(
      { isBookmarked: true },
      { where: { userEmail: email, articleUrl: url } }
    ).then(async () => {
      userNote = await findNote({
        where: { articleUrl: url, userEmail: email },
        raw: true,
      });
    });
    return res.status(200).send(userNote);
  }
};

exports.unmark = async (req, res) => {
  const url = req.query.url.replace(/[%2F]/g, "/");
  const { email } = res.locals.user;
  await updateUserNote(
    { isBookmarked: false },
    { where: { userEmail: email, articleUrl: url } }
  ).then(async () => {
    userNote = await findNote({
      where: { articleUrl: url, userEmail: email },
      raw: true,
    });
  });
  return res.status(200).send(userNote);
};
