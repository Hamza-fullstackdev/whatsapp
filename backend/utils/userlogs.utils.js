import fs from "fs";
export const userLogs = (req, res, next) => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const content = `-->User created at: ${year}-${month}-${day} At ${hours}-${minutes}-${seconds}
    --> Name: ${req.body.fname} ${req.body.lname}
    --> Country: ${req.body.country}
    --> Phone: ${req.body.phone}
    --> About: ${req.body.about}

    `;
  fs.appendFile("user-logs.txt", content, (err) => {
    console.log(err);
  });
  console.log("User Logs Created Successfully");
};
