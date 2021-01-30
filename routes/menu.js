const router = require("express").Router();
const Menus = require("../model/Menus");
const mongoose = require("mongoose");

router.post("/savemenu", async (req, res) => {
  console.log(req.body);
  const menu = new Menus({
    Type: req.body.type,
    CategoryName: req.body.category,
  });

  await menu.save().then((data) => {
    res.json({ success: true });
  });
});

router.get("/getmenus", (req, res) => {
  Menus.find().then((data) => {
    res.send(data);
  });
});

router.post("/addsubdrop", async (req, res) => {
  const { selecteddropdwnholder, subdropdownmenu } = req.body;
  console.log(req.body);

  const data = await Menus.updateOne(
    { CategoryName: selecteddropdwnholder },
    {
      $push: {
        SubCategory: {
          _id: new mongoose.Types.ObjectId().toHexString(),
          Name: subdropdownmenu,
        },
      },
    }
  );
  if (data) {
    res.send(data);
  }
});

module.exports = router;
