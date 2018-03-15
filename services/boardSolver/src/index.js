import { writeFile } from "fs";
import { execFile } from "child_process";
import express from "express";
import bodyParser from "body-parser";
import tmp from "tmp";
import cors from "cors";

import { success } from "./lib/log";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.post("/submit-board", (req, res) => {
  tmp.file({ postfix: ".js" }, (errCreatingTmpFile, path) => {
    writeFile(path, req.body.code, errWritingFile => {
      if (errWritingFile) {
        res.send(errWritingFile);
      } else {
        execFile("node", [path], (errExecutingFile, stdout, stderr) => {
          if (errExecutingFile) {
            let stderrFormatted = stderr.split("\n");
            stderrFormatted.shift();
            stderrFormatted = stderrFormatted.join("\n");
            res.send(stderrFormatted);
          } else {
            res.write(JSON.stringify(stdout));
            res.send();
          }
        });
      }
    });
  });
});

app.listen(PORT, success(`board solver service is listening on port ${PORT}`));
