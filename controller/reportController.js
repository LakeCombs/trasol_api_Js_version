const asyncHandler = require("express-async-handler");
const Report = require("../model/reportModel");
const User = require("../model/userModel");

const createReport = asyncHandler(async (req, res) => {
  const { userId, reporterType, caseId, title, content } = req.body;
  if (!userId) {
    throw new Error("Sorry you are not logged in, login to report");
  }
  if (!title || !content || !reporterType || !caseId) {
    throw new Error("Please fill in all the required field");
  }

  try {
    const newReport = await Report.create({
      userId,
      reporterType,
      caseId,
      title,
      content,
    });

    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          reports: newReport._id,
        },
      }
    );

    return res.status(200).json(newReport);
  } catch (error) {
    res.status(400).json(error);
  }
});

const getAUserReport = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const getUserReport = await Report.find({
      userId: { $eq: userId },
    })
      .populate("userId", "-password")
      .exec();

    return res.status(200).json(getUserReport);
  } catch (error) {
    res.status(400).json(error);
  }
});

const getSingleReport = asyncHandler(async (req, res) => {
  try {
    const findingSingleReport = await Report.findById(req.params.id);
    res.status(200).json(findingSingleReport);
  } catch (error) {
    res.status(404).json(error);
  }
});

const editSingleReport = asyncHandler(async (req, res) => {
  const { reporterType, caseId, title, content } = req.body;
  try {
    const newReport = {
      reporterType,
      caseId,
      title,
      content,
    };
    const deleteSingleReport = await Report.findByIdAndDelete(
      req.params.id,
      newReport,
      { new: true }
    );
    return res.status(200).json(deleteSingleReport);
  } catch (error) {
    res.status(404).json(error);
  }
});

const deleteAReport = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const deletingReport = await Report.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate({});

    res.status(202).json(deletingReport);
  } catch (error) {
    res.status(404).json(error);
  }
});

const getAllReport = asyncHandler(async (req, res) => {
  try {
    const allReport = await Report.find().populate("userId", "-password");
    return res.status(200).json(allReport);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = {
  createReport,
  getAllReport,
  getAUserReport,
  deleteAReport,
  getSingleReport,
  editSingleReport,
};
