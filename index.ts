import express from "express";
import bodyParser from "body-parser";
import { Validator } from "express-json-validator-middleware";
import { getCollection } from "./utils/mongo";
import { validationErrorMiddleware } from "./utils/validator";
import { requestSchema } from "./schemas/requestSchema";
const { validate } = new Validator({});

const app = express();

// create application/json parser
const jsonParser = bodyParser.json();

app.get("/", (req, res) => {
  console.log("The application is listening on port 3000!");
  res.status(200).send();
});

app.post(
  "/",
  jsonParser,
  // validate the json schema, this assure us that the request is in the right format
  validate({ body: requestSchema }),
  async (req, res) => {
    try {
      const coll = await getCollection("records");

      /*
        This pipeline contains 3 stages
        1. First of all we match all the records that matches the date restriction
        2. Only in the second step we calculate the sum of the counts array, this sould save us some time
        3. Now that we know the totalCount we can filter out all the totalCount out of the range
      */
      const records = await coll
        .aggregate([
          {
            $match: {
              createdAt: {
                $gt: new Date(req.body.startDate),
                $lt: new Date(req.body.endDate),
              },
            },
          },
          {
            $addFields: {
              totalCount: { $sum: "$counts" },
            },
          },
          {
            $match: {
              totalCount: {
                $gt: req.body.minCount,
                $lt: req.body.maxCount,
              },
            },
          },
          {
            $project: {
              _id: 0,
              key: 1,
              createdAt: 1,
              totalCount: 1,
            },
          },
        ])
        .toArray();

      res.status(200).send({ code: 0, msg: "success", records: records });
    } catch (err) {
      console.error(err);
      // handling any server error
      res.status(500).send({ code: 2, msg: "internal server error" });
    }
  }
);

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});

app.use(validationErrorMiddleware);
module.exports = app;
