const router = require("express").Router();
const JwtController = require("../controllers/JwtController");

router.post("/get-token", JwtController.getToken);
router.post("/verify-token", JwtController.verifyToken);
router.post("/refresh-token", JwtController.refreshToken);
router.post("/revoke-user-token/:username",JwtController.revokeUserToken);
router.post("revoke-refresh-tokens", JwtController.revokeAllRefreshTokens);

module.exports = router;
