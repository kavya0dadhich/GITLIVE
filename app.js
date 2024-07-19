const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const CronJob = require("cron").CronJob;
const TASK_MODUL = require("./model/task");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", async (req, res) => {
  const findArray = await TASK_MODUL.find({ sendMSG: true });
  console.log(findArray, "hello");
  if (findArray) {
    res.render("homePage", { findArray });
    console.log(findArray, "if");
  } else {
    console.log(findArray, "else");
    res.render("homePage", { findArray });
  }
});

app.post("/tasks", async (req, res) => {
  const { task, time } = req.body;
  console.log(time);
  var sendMSG = false;
  if (time) {
    let [inputHours, inputMinutes] = time.split(":").map(Number);
    console.log(inputHours, inputMinutes);
    const job = new CronJob(`${inputMinutes} ${inputHours} * * *`, async () => {
      console.log(job);
      const client = require("twilio")(
        process.env.AccountSID,
        process.env.AuthToken
      );
      const message = await client.messages.create({
        from: process.env.FROMNUMBER,
        to: process.env.TONUMBER,
        body: task,
      });
      console.log(message.sid);
      const data = {
        task,
        time,
        sendMSG: true,
      };
      const created = await TASK_MODUL.create(data);
    });
    job.start();
    res.redirect("/home");
  } else {
    res.redirect("/home");
  }
});

app.get("/deleteAll", async (req, res) => {
  const tasks = await TASK_MODUL.find({ sendMSG: true });
  console.log(tasks);
  tasks.forEach(async (task) => {
    task.sendMSG = false;
    await task.save();
  });
  res.redirect("/home");
});

app.set("view engine", "ejs");
app.listen(process.env.PORTNM, () =>
  console.log(`Server is searted on localhost:${3000}`)
);
