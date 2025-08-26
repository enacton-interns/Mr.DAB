const mongoose = require("mongoose");
const TimeEntry = require("../models/TimeEntry");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");

exports.getAllTimeEntries = async (req, res) => {
  try {
    const userId = req.session.userId;
    const entries = await TimeEntry.find({ userId }).populate(
      "projectId",
      "name"
    );
    res.status(200).json(entries);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch time entries", error: err.message });
  }
};

exports.logTime = async (req, res) => {
  try {
    const { projectId, hours, description, date } = req.body;

    const entry = new TimeEntry({
      projectId,
      userId: req.session.userId,
      hours,
      description,
      date: date || new Date(),
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: "Failed to log time" });
  }
};

exports.getTimeEntriesForProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const entries = await TimeEntry.find({
      projectId,
      userId: req.session.userId,
    });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch time entries" });
  }
};

exports.updateTimeEntry = async (req, res) => {
  const { id } = req.params;
  const { hours, description } = req.body;

  try {
    const entry = await TimeEntry.findById(id);
    if (!entry) return res.status(404).json({ error: "Time entry not found" });

    entry.hours = hours ?? entry.hours;
    entry.description = description ?? entry.description;

    await entry.save();
    res.status(200).json({ message: "Time entry updated", entry });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update time entry" });
  }
};

exports.deleteTimeEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await TimeEntry.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ error: "Time entry not found" });

    res.status(200).json({ message: "Time entry deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete time entry" });
  }
};

exports.getSummary = async (req, res) => {
  const userId = req.session.userId;

  try {
    const summary = await TimeEntry.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$projectId",
          totalHours: { $sum: "$hours" },
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "_id",
          as: "projectDetails",
        },
      },
      {
        $unwind: "$projectDetails",
      },
      {
        $project: {
          projectId: "$_id",
          projectName: "$projectDetails.name",
          totalHours: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(summary);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to generate summary", error: err.message });
  }
};

exports.exportTimeEntries = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: "Authentication required." });
    }

    // 1. Get the optional filter parameters from the query string
    const { startDate, endDate, projectId } = req.query;

    // 2. Build the query object dynamically
    const query = { userId: userId };

    if (projectId) {
      query.projectId = projectId;
    }

    if (startDate && endDate) {
      // Ensure the end date includes the whole day
      const endOfDay = new Date(endDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      query.date = {
        $gte: new Date(startDate),
        $lte: endOfDay,
      };
    }

    // 3. Use the dynamic query to find the entries
    const entries = await TimeEntry.find(query)
      .populate("projectId", "name")
      .lean();

    if (!entries.length) {
      return res
        .status(404)
        .json({ error: "No time entries found for the selected criteria." });
    }

    // The rest of your code remains the same, as it was already correct!
    const plainEntries = entries.map((entry) => ({
      id: entry._id.toString(),
      projectName: entry.projectId ? entry.projectId.name : "No Project",
      hours: entry.hours,
      description: entry.description,
      date: new Date(entry.date).toISOString().split("T")[0], // Format date as YYYY-MM-DD
    }));

    const fields = ["id", "projectName", "hours", "description", "date"];
    const parser = new Parser({ fields });
    const csv = parser.parse(plainEntries);

    const exportDir = path.join(__dirname, "..", "exports");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const fileName = `export-${Date.now()}.csv`;
    const filePath = path.join(exportDir, fileName);

    fs.writeFileSync(filePath, csv);

    res.status(200).json({
      message: "Data exported successfully and saved on the server.",
      filePath: filePath, // Sending back the path for confirmation
    });
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ error: "Failed to export time entries." });
  }

  // /exports (gets all entries for the user)
  // /exports?projectId=653a9f... (gets entries for a specific project)
  // /exports?startDate=2023-10-01&endDate=2023-10-31 (gets entries for October)
  // /exports?projectId=653a9f...&startDate=2023-10-01&endDate=2023-10-31 (gets entries for a specific project in October)
};
