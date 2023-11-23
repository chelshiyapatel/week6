import express from 'express'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

class Controller {
    static test_session = (req, res) => {
        console.log(req.session)
        req.session.user_name = "chelshiya"
        req.session.user_msg = "Working fine with sessions!!!!!!!!!!!"
        console.log(req.session)
        delete req.session.user_msg
        console.log(req.session)
        console.log(`user name to session object : ${req.session.user_name}`)
        res.send("Welcome from the Test Route in user registration.......")
    }

    static signup_get = (req, res) => {
        // console.log(`user name in sign_up from session object : ${req.session.user_name}`)

        const usr_new = req.session.usr_new
        delete req.session.usr_new

        const msg_new = req.session.msg_new
        delete req.session.msg_new
        res.render("signup.ejs", { usr_new, msg_new })
    }

    static signup_post = async (req, res) => {
        try {
            const formData = req.body;

            console.log(formData)

            const match_user_in_db = await userModel.findOne({ email: formData.email })


            // if(match_user_in_db) {
            //     req.session.err = "User already exists"
            //     req.session.exname = match_user_in_db.name
            //     req.redirect("/login")
            // }
            if (!match_user_in_db) {
                // res.send("Not an existing user")
                const hashed_pwd = await bcrypt.hash(formData.pwd, 10)

                console.log(hashed_pwd)

                const newUser = new userModel({
                    name: formData.name,
                    email: formData.email,
                    pwd: hashed_pwd
                })

                const newUser_saved = await newUser.save()

                req.session.saved_name = newUser_saved.name
                req.session.saved_msg = "Registration successfully!!!"

                res.redirect("login")
                // console.log(newUser_saved)
                // res.send(newUser_saved)
                // res.send(hashed_pwd)
            }
            else {
                req.session.user_ex = match_user_in_db.name
                req.session.msg_ex = "You are an existing user please login"

                res.redirect("login")
                // res.send("existing user")
            }
        }
        catch (err) {
            console.err
        }
    }

    static login_get = (req, res) => {

        const saved_name = req.session.saved_name

        delete req.session.saved_name

        const saved_msg = req.session.saved_msg

        delete req.session.saved_msg

        const user_ex = req.session.user_ex
        delete req.session.user_ex

        const msg_ex = req.session.msg_ex
        delete req.session.msg_ex

        // req.session.usr_valid_email = form_data.email
        // req.session.wrg_pwd_msg = "Please Enter a valid Password"

        const usr_valid_email = req.session.usr_valid_email
        delete req.session.usr_valid_email

        const wrg_pwd_msg = req.session.wrg_pwd_msg
        delete req.session.wrg_pwd_msg


        res.render("login.ejs", { saved_name, saved_msg, user_ex, msg_ex, usr_valid_email, wrg_pwd_msg })
    }

    static login_post = async (req, res) => {

        try {

            const form_data = req.body
            const user_matched = await userModel.findOne({ email: form_data.email })

            if (!user_matched) {

                req.session.usr_new = form_data.email
                req.session.msg_new = "Please sign up First to Login !!!!!!"
                // use this varibles in sign_get
                res.redirect("signup")
            }
            else {

                const pwd_matched = await bcrypt.compare(form_data.pwd, user_matched.pwd)

                if (pwd_matched) {
                    req.session.isValidated = true
                    // this above variable will be used in middleware
                    req.session.valid_usr = user_matched.name
                    // this above variable will be used in dashboard_get 

                    res.redirect("dashboard")
                    // res.send("User is Validated Login Successfull !!!")
                }
                else {
                    req.session.usr_valid_email = form_data.email
                    req.session.wrg_pwd_msg = "Please Enter a valid Password"
                    // use this variables in login_get page
                    res.redirect("login")

                }
            }
        }
        catch (err) {
            console.log(`Can not Verify User Details due to the error below\n ${err}`)
        }
    }

    static dashboard_get = async (req, res) => {
        // req.session.valid_usr = user_matched.name
        const valid_usr = req. session.valid_usr
        delete req.session.valid_usr

        res.render("dashboard.ejs" , {valid_usr})
    }
}



export default Controller