document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById(
                "decision-form"
            );

        if (!form) {
            return;
        }


        const decision =
            document.getElementById(
                "decision"
            );

        const message =
            document.getElementById(
                "admin_message"
            );

        const submitButton =
            document.getElementById(
                "decision-submit"
            );

        const messageBox =
            document.getElementById(
                "decision-message"
            );


        function showMessage(
            text,
            type
        ) {

            if (!messageBox) {

                alert(text);

                return;
            }


            messageBox.textContent =
                text;

            messageBox.style.display =
                "block";

            messageBox.className =
                "alert";


            if (type === "success") {

                messageBox.classList.add(
                    "alert-success"
                );

            } else {

                messageBox.classList.add(
                    "alert-error"
                );
            }

        }


        /*
         * Require a message for rejection/correction.
         */
        function validateDecision() {

            if (!decision.value) {

                showMessage(
                    "Please select a decision.",
                    "error"
                );

                decision.focus();

                return false;
            }


            const selected =
                decision.value;


            const text =
                message.value.trim();


            if (
                (
                    selected === "REJECTED"
                    ||
                    selected === "CORRECTION_REQUIRED"
                )
                &&
                !text
            ) {

                showMessage(
                    "Please enter a message for the student.",
                    "error"
                );

                message.focus();

                return false;
            }


            return true;
        }


        /*
         * Visual hint depending on decision.
         */
        function updateMessageRequirement() {

            if (!message) {
                return;
            }


            if (
                decision.value ===
                "VERIFIED"
            ) {

                message.placeholder =
                    "Optional note. Approval message will be generated automatically.";

            } else {

                message.placeholder =
                    "Explain what needs attention or why the request was rejected.";

            }

        }


        decision.addEventListener(
            "change",
            updateMessageRequirement
        );


        updateMessageRequirement();


        /*
         * AJAX enhancement.
         *
         * The normal POST still works if this JS fails.
         */
        form.addEventListener(
            "submit",
            async function (event) {

                if (!validateDecision()) {

                    event.preventDefault();

                    return;
                }


                event.preventDefault();


                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Saving...";


                const formData =
                    new FormData(form);


                const payload = {

                    decision:
                        formData.get(
                            "decision"
                        ),

                    admin_message:
                        String(
                            formData.get(
                                "admin_message"
                            ) || ""
                        ).trim()

                };


                try {

                    const response =
                        await fetch(
                            form.action,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json",

                                    "X-Requested-With":
                                        "XMLHttpRequest"
                                },

                                cache: "no-store",

                                body:
                                    JSON.stringify(
                                        payload
                                    )
                            }
                        );


                    const contentType =
                        response.headers.get(
                            "content-type"
                        ) || "";


                    if (
                        !contentType.includes(
                            "application/json"
                        )
                    ) {

                        /*
                         * Server returned an ordinary
                         * redirect/page.
                         *
                         * Follow it.
                         */
                        window.location.href =
                            response.url;

                        return;
                    }


                    const result =
                        await response.json();


                    if (
                        !response.ok
                        ||
                        !result.success
                    ) {

                        throw new Error(
                            result.message
                            ||
                            "Unable to save decision."
                        );
                    }


                    showMessage(
                        result.message,
                        "success"
                    );


                    /*
                     * Give the admin a clear success state.
                     */
                    submitButton.textContent =
                        "Decision Saved ✓";


                    /*
                     * Then return to the correct queue.
                     */
                    setTimeout(
                        function () {

                            window.location.href =
                                result.redirect_url;

                        },
                        900
                    );


                } catch (error) {

                    console.error(
                        "Admin decision error:",
                        error
                    );


                    showMessage(
                        error.message
                        ||
                        "Decision could not be saved.",
                        "error"
                    );


                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Save Decision →";

                }

            }
        );

    }
);