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
router.post("/deletesubcategory", async (req, res) => {
  const { subcategory } = req.body;
  const data = await Menus.updateOne(
    { "SubCategory.Name": subcategory },
    { $pull: { SubCategory: { Name: subcategory } } }
  );

  if (data) {
    res.json({ success: true });
  }
});

router.get("/deletecategory/:id", async (req, res) => {
  const data = await Menus.findByIdAndRemove({ _id: req.params.id });
  if (data) {
    res.send({ success: true });
  }
});

router.post("/editsubdrop", async (req, res) => {
  const { oldsubcategory, editableubdrop } = req.body;
  const data = await Menus.updateOne(
    { "SubCategory.Name": oldsubcategory },
    {
      $set: {
        "SubCategory.$": { Name: editableubdrop },
      },
    }
  );
  if (data) {
    res.json({ success: true });
  }
});
module.exports = router;
