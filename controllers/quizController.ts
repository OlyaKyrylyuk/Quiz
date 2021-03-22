import { Request, Response, NextFunction } from "express";
import Quiz from "./../models/quiz";
import Answer from "./../models/answer";
import secret_token from "../security/secret_token";

export let getApiDocumentation = (req: Request, res: Response) => {
  res.send("Main page");
};

export let getAllQuizesAdmin = async (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  let quizes = await Quiz.find((err: string) => {
    if (err) {
      res.send("Error!");
    } else {
      console.log("Data is found");
    }
  });
  res.render("quizes/admin/all", { quizes: quizes });
};

export let getAllQuizesUser = async (req: Request, res: Response) => {
  let quizes = await Quiz.find((err: string) => {
    if (err) {
      res.send("Error!");
    } else {
      console.log("Data is found");
    }
  });
  res.render("quizes/user/all_quizes", { quizes: quizes });
};

export let getFormAddQuiz = async (req: Request, res: Response) => {
  var token: string = secret_token();
  res.header("Bearer", token);
  await Quiz.find((err: string) => {
    if (err) {
      res.send("Error!");
    } else {
      console.log("Data is found");
    }
  });
  res.render("quizes/admin/add_quiz");
};

export let addQuiz = (req: Request, res: Response, next: NextFunction) => {
  const quiz_data = new Quiz({
    name: req.body.name,
    link: req.body.link,
  });
  quiz_data.save().then((result) => {
    res.redirect("/questions/add/quiz/" + result._id);
  });
};

export let statistics = (req: Request, res: Response) => {
  console.log("hd");
  let count: any = [];
  let answers_count: Number = 0;
  var token: string = secret_token();
  res.header("Bearer", token);
  Quiz.find()
    .then(async (res) => {
      await res.forEach(async (element) => {
        answers_count = await Answer.find()
          .where("quiz_id")
          .equals(element._id)
          .countDocuments();
        console.log("name:" + element.name + " count:" + answers_count);
        await count.push({ name: element.name, count: answers_count });
      });
    })
    .then(() => {
      let n: ReturnType<typeof setTimeout>;
      let f = () => {
        //console.log("countt"+count)
        res.render("statistics", { data: count });
      };
      n = setTimeout(f, 6000);
      //res.render('statistics',{data: count})
    });

  //res.render('statistics',{})
};
