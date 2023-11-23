import Controller from "../controllers/controller.js"
import express from 'express'
import { isvalid } from "../middlewares/middleware_validUsers.js"

const router = express.Router()

router.get("/test_session",Controller.test_session)

router.get("/signup",Controller.signup_get)

router.post("/signup",Controller.signup_post)

router.get("/login",Controller.login_get)

router.post("/login",Controller.login_post)

router.get("/dashboard",isvalid,Controller.dashboard_get)

export default router