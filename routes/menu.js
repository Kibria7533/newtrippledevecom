const router = require("express").Router();
const Menus = require("../model/Menus");

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

module.exports = router;
