<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Login / Signup</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Inter, -apple-system, BlinkMacSystemFont,
                "Segoe UI", Roboto, Arial, sans-serif;

            min-height: 100vh;

            display: flex;
            align-items: center;
            justify-content: center;

            background:
                radial-gradient(circle at top left, #dbeafe, transparent 35%),
                radial-gradient(circle at bottom right, #ede9fe, transparent 35%),
                #f8fafc;

            color: #0f172a;
        }

        .auth-container {
            width: 100%;
            max-width: 430px;
            padding: 20px;
        }

        .auth-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);

            border: 1px solid rgba(255, 255, 255, 0.8);

            border-radius: 24px;

            padding: 40px;

            box-shadow:
                0 20px 50px rgba(15, 23, 42, 0.08);
        }

        .logo {
            width: 52px;
            height: 52px;

            display: flex;
            align-items: center;
            justify-content: center;

            margin: 0 auto 24px;

            border-radius: 14px;

            background: #2563eb;
            color: white;

            font-size: 22px;
            font-weight: 700;
        }

        .header {
            text-align: center;
            margin-bottom: 32px;
        }

        .header h1 {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
        }

        .header p {
            color: #64748b;
            font-size: 14px;
            line-height: 1.5;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;

            margin-bottom: 8px;

            font-size: 13px;
            font-weight: 600;

            color: #334155;
        }

        .phone-input {
            display: flex;

            height: 52px;

            border: 1px solid #cbd5e1;
            border-radius: 12px;

            background: white;

            overflow: hidden;

            transition: 0.2s;
        }

        .phone-input:focus-within {
            border-color: #2563eb;

            box-shadow:
                0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .country-code {
            width: 75px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #f8fafc;

            border-right: 1px solid #e2e8f0;

            font-size: 14px;
            font-weight: 600;

            color: #334155;
        }

        .phone-input input {
            flex: 1;

            min-width: 0;

            border: none;
            outline: none;

            padding: 0 16px;

            font-size: 15px;

            color: #0f172a;
        }

        .phone-input input::placeholder {
            color: #94a3b8;
        }

        .primary-btn {
            width: 100%;
            height: 52px;

            border: none;
            border-radius: 12px;

            background: #2563eb;
            color: white;

            font-size: 15px;
            font-weight: 600;

            cursor: pointer;

            transition: 0.2s;
        }

        .primary-btn:hover {
            background: #1d4ed8;

            transform: translateY(-1px);

            box-shadow:
                0 8px 20px rgba(37, 99, 235, 0.2);
        }

        .primary-btn:active {
            transform: translateY(0);
        }

        .terms {
            margin-top: 20px;

            text-align: center;

            font-size: 12px;
            line-height: 1.6;

            color: #94a3b8;
        }

        .terms a {
            color: #2563eb;
            text-decoration: none;
        }

        .switch-auth {
            margin-top: 28px;

            text-align: center;

            font-size: 14px;

            color: #64748b;
        }

        .switch-auth button {
            border: none;
            background: none;

            color: #2563eb;

            font-weight: 600;

            cursor: pointer;
        }

        /* OTP SCREEN */

        .otp-screen {
            display: none;
        }

        .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;

            border: none;
            background: none;

            color: #64748b;

            font-size: 13px;
            font-weight: 600;

            cursor: pointer;

            margin-bottom: 24px;
        }

        .otp-info {
            text-align: center;

            color: #64748b;

            font-size: 14px;

            line-height: 1.6;

            margin-bottom: 24px;
        }

        .otp-info strong {
            color: #0f172a;
        }

        .otp-inputs {
            display: flex;

            justify-content: center;

            gap: 10px;

            margin-bottom: 24px;
        }

        .otp-inputs input {
            width: 48px;
            height: 54px;

            text-align: center;

            font-size: 20px;
            font-weight: 600;

            border: 1px solid #cbd5e1;

            border-radius: 10px;

            outline: none;

            background: white;

            transition: 0.2s;
        }

        .otp-inputs input:focus {
            border-color: #2563eb;

            box-shadow:
                0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .resend {
            text-align: center;

            font-size: 13px;

            color: #94a3b8;

            margin-top: 18px;
        }

        .resend button {
            border: none;
            background: none;

            color: #2563eb;

            font-weight: 600;

            cursor: pointer;
        }

        .resend button:disabled {
            color: #94a3b8;

            cursor: not-allowed;
        }

        /* SIGNUP */

        .signup-fields {
            display: none;
        }

        .text-input {
            width: 100%;
            height: 52px;

            padding: 0 16px;

            border: 1px solid #cbd5e1;

            border-radius: 12px;

            outline: none;

            font-size: 15px;

            transition: 0.2s;
        }

        .text-input:focus {
            border-color: #2563eb;

            box-shadow:
                0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        @media (max-width: 480px) {

            body {
                align-items: flex-start;
            }

            .auth-container {
                padding: 12px;
                margin-top: 20px;
            }

            .auth-card {
                padding: 28px 20px;
                border-radius: 20px;
            }

            .otp-inputs {
                gap: 7px;
            }

            .otp-inputs input {
                width: 44px;
                height: 50px;
            }

        }
    </style>
</head>

<body>

<div class="auth-container">

    <div class="auth-card">

        <!-- LOGIN / SIGNUP SCREEN -->

        <div id="authScreen">

            <div class="logo">
                A
            </div>

            <div class="header">

                <h1 id="authTitle">
                    Welcome back
                </h1>

                <p id="authSubtitle">
                    Enter your mobile number to continue
                </p>

            </div>


            <!-- SIGNUP ONLY FIELDS -->

            <div class="signup-fields" id="signupFields">

                <div class="form-group">

                    <label>
                        Full name
                    </label>

                    <input
                        type="text"
                        class="text-input"
                        placeholder="Enter your name"
                    >

                </div>

                <div class="form-group">

                    <label>
                        Email address
                    </label>

                    <input
                        type="email"
                        class="text-input"
                        placeholder="you@example.com"
                    >

                </div>

            </div>


            <!-- MOBILE NUMBER -->

            <div class="form-group">

                <label>
                    Mobile number
                </label>

                <div class="phone-input">

                    <div class="country-code">
                        🇮🇳 +91
                    </div>

                    <input
                        type="tel"
                        id="phoneNumber"
                        placeholder="Enter mobile number"
                        maxlength="10"
                    >

                </div>

            </div>


            <button
                class="primary-btn"
                onclick="sendOTP()"
            >
                Continue
            </button>


            <div class="terms">

                By continuing, you agree to our

                <a href="#">
                    Terms
                </a>

                and

                <a href="#">
                    Privacy Policy
                </a>

            </div>


            <div class="switch-auth">

                <span id="switchText">
                    Don't have an account?
                </span>

                <button onclick="toggleAuth()">

                    <span id="switchButton">
                        Sign up
                    </span>

                </button>

            </div>

        </div>


        <!-- OTP SCREEN -->

        <div class="otp-screen" id="otpScreen">

            <button
                class="back-btn"
                onclick="goBack()"
            >
                ← Change number
            </button>


            <div class="logo">
                A
            </div>


            <div class="header">

                <h1>
                    Verify your number
                </h1>

            </div>


            <div class="otp-info">

                We've sent a 6-digit verification code to

                <br>

                <strong id="displayPhone">
                    +91 XXXXX XXXXX
                </strong>

            </div>


            <div class="otp-inputs">

                <input maxlength="1" inputmode="numeric">
                <input maxlength="1" inputmode="numeric">
                <input maxlength="1" inputmode="numeric">
                <input maxlength="1" inputmode="numeric">
                <input maxlength="1" inputmode="numeric">
                <input maxlength="1" inputmode="numeric">

            </div>


            <button
                class="primary-btn"
                onclick="verifyOTP()"
            >
                Verify & Continue
            </button>


            <div class="resend">

                <span id="timer">
                    Resend code in 30s
                </span>

                <button
                    id="resendBtn"
                    onclick="resendOTP()"
                    disabled
                >
                    Resend OTP
                </button>

            </div>

        </div>

    </div>

</div>


<script>

    let isSignup = false;

    let countdown;

    let seconds = 30;


    /*
    --------------------------------
    TOGGLE LOGIN / SIGNUP
    --------------------------------
    */

    function toggleAuth() {

        isSignup = !isSignup;

        const title =
            document.getElementById("authTitle");

        const subtitle =
            document.getElementById("authSubtitle");

        const fields =
            document.getElementById("signupFields");

        const switchText =
            document.getElementById("switchText");

        const switchButton =
            document.getElementById("switchButton");


        if (isSignup) {

            title.textContent =
                "Create your account";

            subtitle.textContent =
                "Enter your details to get started";

            fields.style.display =
                "block";

            switchText.textContent =
                "Already have an account?";

            switchButton.textContent =
                "Log in";

        } else {

            title.textContent =
                "Welcome back";

            subtitle.textContent =
                "Enter your mobile number to continue";

            fields.style.display =
                "none";

            switchText.textContent =
                "Don't have an account?";

            switchButton.textContent =
                "Sign up";

        }

    }


    /*
    --------------------------------
    SEND OTP
    --------------------------------
    */

    function sendOTP() {

        const phone =
            document
                .getElementById("phoneNumber")
                .value
                .trim();


        if (phone.length !== 10) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            return;

        }


        /*
        IMPORTANT:

        In production, call your backend here.

        Example:

        fetch("/api/auth/send-otp", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                phone: phone
            })
        });

        */


        document
            .getElementById("displayPhone")
            .textContent =
            "+91 " + phone;


        document
            .getElementById("authScreen")
            .style.display =
            "none";


        document
            .getElementById("otpScreen")
            .style.display =
            "block";


        startTimer();


        document
            .querySelector(".otp-inputs input")
            .focus();

    }


    /*
    --------------------------------
    OTP INPUT AUTO MOVE
    --------------------------------
    */

    const otpInputs =
        document.querySelectorAll(
            ".otp-inputs input"
        );


    otpInputs.forEach(
        (input, index) => {

            input.addEventListener(
                "input",
                () => {

                    if (
                        input.value &&
                        index <
                        otpInputs.length - 1
                    ) {

                        otpInputs[
                            index + 1
                        ].focus();

                    }

                }
            );


            input.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Backspace" &&
                        !input.value &&
                        index > 0
                    ) {

                        otpInputs[
                            index - 1
                        ].focus();

                    }

                }
            );

        }
    );


    /*
    --------------------------------
    VERIFY OTP
    --------------------------------
    */

    function verifyOTP() {

        let otp = "";


        otpInputs.forEach(
            input => {

                otp += input.value;

            }
        );


        if (otp.length !== 6) {

            alert(
                "Please enter the complete OTP."
            );

            return;

        }


        /*
        IMPORTANT:

        Verify OTP through your backend.

        Example:

        fetch("/api/auth/verify-otp", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                phone: phone,
                otp: otp
            })
        });

        */


        window.location.href = "dashboard.php";

    }


    /*
    --------------------------------
    RESEND OTP TIMER
    --------------------------------
    */

    function startTimer() {

        seconds = 30;

        const timer =
            document.getElementById("timer");

        const resendBtn =
            document.getElementById("resendBtn");


        resendBtn.disabled =
            true;


        clearInterval(countdown);


        countdown =
            setInterval(
                () => {

                    seconds--;

                    timer.textContent =
                        `Resend code in ${seconds}s`;


                    if (seconds <= 0) {

                        clearInterval(
                            countdown
                        );

                        timer.textContent =
                            "Didn't receive the code?";

                        resendBtn.disabled =
                            false;

                    }

                },
                1000
            );

    }


    /*
    --------------------------------
    RESEND OTP
    --------------------------------
    */

    function resendOTP() {

        /*
        Call your backend
        to generate and send
        a new OTP.
        */


        alert(
            "A new OTP has been sent."
        );


        startTimer();

    }


    /*
    --------------------------------
    GO BACK
    --------------------------------
    */

    function goBack() {

        clearInterval(
            countdown
        );


        document
            .getElementById("otpScreen")
            .style.display =
            "none";


        document
            .getElementById("authScreen")
            .style.display =
            "block";

    }

</script>

</body>
</html>