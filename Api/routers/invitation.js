const router = require('express').Router();
const {sentInvitation, getAllInvitaions} = require("../controllers/invitation")

router.post("/sent-invitation/:userId/:roomId/:guestId",sentInvitation);
router.get("/invitations/:userId",getAllInvitaions);

module.exports = router