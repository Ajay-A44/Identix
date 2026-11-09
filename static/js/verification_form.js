document.addEventListener(
    "DOMContentLoaded",
    function () {

        const scholarship =
            document.getElementById(
                "scholarship-fields"
            );

        const admission =
            document.getElementById(
                "admission-fields"
            );

        const selectedPurpose =
            document.getElementById(
                "selected-purpose"
            );

        const form =
            document.getElementById(
                "verification-form"
            );

        const submitButton =
            document.getElementById(
                "submit-button"
            );

        const messageBox =
            document.getElementById(
                "form-message"
            );

        const scholarshipRadio =
            document.getElementById(
                "purpose-scholarship"
            );

        const admissionRadio =
            document.getElementById(
                "purpose-admission"
            );


        /*
         * Enable / disable fields.
         *
         * This keeps Scholarship and Admission
         * data completely separate.
         */
        function setFieldsEnabled(
            section,
            enabled
        ) {

            if (!section) {
                return;
            }

            const fields =
                section.querySelectorAll(
                    "input, select, textarea"
                );

            fields.forEach(
                function (field) {

                    field.disabled =
                        !enabled;

                }
            );
        }


        /*
         * Hide both sections.
         */
        function hideAll() {

            scholarship.style.display =
                "none";

            admission.style.display =
                "none";

            setFieldsEnabled(
                scholarship,
                false
            );

            setFieldsEnabled(
                admission,
                false
            );

            submitButton.disabled =
                true;
        }


        /*
         * Show selected service.
         */
        function showPurpose(
            purpose
        ) {

            hideAll();

            selectedPurpose.value =
                purpose;


            if (
                purpose ===
                "SCHOLARSHIP"
            ) {

                scholarship.style.display =
                    "block";

                setFieldsEnabled(
                    scholarship,
                    true
                );

                scholarshipRadio.checked =
                    true;

                submitButton.disabled =
                    false;

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                return;
            }


            if (
                purpose ===
                "HIGHER_SEMESTER_ADMISSION"
            ) {

                admission.style.display =
                    "block";

                setFieldsEnabled(
                    admission,
                    true
                );

                admissionRadio.checked =
                    true;

                submitButton.disabled =
                    false;

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }


        /*
         * Purpose radio buttons.
         */
        scholarshipRadio.addEventListener(
            "change",
            function () {

                if (this.checked) {

                    showPurpose(
                        "SCHOLARSHIP"
                    );

                }

            }
        );


        admissionRadio.addEventListener(
            "change",
            function () {

                if (this.checked) {

                    showPurpose(
                        "HIGHER_SEMESTER_ADMISSION"
                    );

                }

            }
        );


        /*
         * Read purpose from URL.
         *
         * Example:
         *
         * ?purpose=SCHOLARSHIP
         *
         * ?purpose=HIGHER_SEMESTER_ADMISSION
         */
        const urlParams =
            new URLSearchParams(
                window.location.search
            );

        const urlPurpose =
            urlParams.get(
                "purpose"
            );


        /*
         * Automatically open the correct
         * section when coming from dashboard.
         */
        if (
            urlPurpose ===
            "SCHOLARSHIP"
        ) {

            showPurpose(
                "SCHOLARSHIP"
            );

        }
        else if (
            urlPurpose ===
            "HIGHER_SEMESTER_ADMISSION"
        ) {

            showPurpose(
                "HIGHER_SEMESTER_ADMISSION"
            );

        }
        else {

            hideAll();

        }


        /*
         * Form submit.
         */
        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const purpose =
                    selectedPurpose.value;


                if (!purpose) {

                    showMessage(
                        "Please select a verification purpose first.",
                        "error"
                    );

                    return;
                }


                /*
                 * Scholarship validation.
                 */
                if (
                    purpose ===
                    "SCHOLARSHIP"
                ) {

                    const ssp =
                        document.getElementById(
                            "ssp_id"
                        );

                    const mobile =
                        document.getElementById(
                            "scholarship-mobile"
                        );

                    const otr =
                        document.getElementById(
                            "nsp_otr"
                        );


                    if (
                        !ssp.value.trim()
                    ) {

                        showMessage(
                            "Please enter the SSP ID.",
                            "error"
                        );

                        ssp.focus();

                        return;
                    }


                    if (
                        !/^\d{10}$/.test(
                            mobile.value.trim()
                        )
                    ) {

                        showMessage(
                            "Please enter a valid 10-digit mobile number.",
                            "error"
                        );

                        mobile.focus();

                        return;
                    }


                    if (
                        !otr.value.trim()
                    ) {

                        showMessage(
                            "Please enter the NSP OTR number.",
                            "error"
                        );

                        otr.focus();

                        return;
                    }

                }


                /*
                 * Admission validation.
                 */
                if (
                    purpose ===
                    "HIGHER_SEMESTER_ADMISSION"
                ) {

                    const parent =
                        document.getElementById(
                            "parent_name"
                        );

                    const course =
                        document.getElementById(
                            "course"
                        );

                    const branch =
                        document.getElementById(
                            "branch"
                        );

                    const semester =
                        document.getElementById(
                            "semester"
                        );

                    const category =
                        document.getElementById(
                            "seat_category"
                        );

                    const address =
                        document.getElementById(
                            "address"
                        );

                    const mobile =
                        document.getElementById(
                            "admission-mobile"
                        );

                    const marks =
                        document.getElementById(
                            "marks_cards"
                        );

                    const idCard =
                        document.getElementById(
                            "id_card"
                        );


                    if (
                        !parent.value.trim()
                    ) {

                        showMessage(
                            "Please enter the Father/Mother name.",
                            "error"
                        );

                        parent.focus();

                        return;
                    }


                    if (
                        !course.value.trim()
                    ) {

                        showMessage(
                            "Please enter the course.",
                            "error"
                        );

                        course.focus();

                        return;
                    }


                    if (
                        !branch.value.trim()
                    ) {

                        showMessage(
                            "Please enter the branch.",
                            "error"
                        );

                        branch.focus();

                        return;
                    }


                    if (
                        !semester.value
                    ) {

                        showMessage(
                            "Please select the semester.",
                            "error"
                        );

                        semester.focus();

                        return;
                    }


                    if (
                        !category.value
                    ) {

                        showMessage(
                            "Please select the seat allotment category.",
                            "error"
                        );

                        category.focus();

                        return;
                    }


                    if (
                        !address.value.trim()
                    ) {

                        showMessage(
                            "Please enter the address.",
                            "error"
                        );

                        address.focus();

                        return;
                    }


                    if (
                        !/^\d{10}$/.test(
                            mobile.value.trim()
                        )
                    ) {

                        showMessage(
                            "Please enter a valid 10-digit mobile number.",
                            "error"
                        );

                        mobile.focus();

                        return;
                    }


                    if (
                        marks.files.length === 0
                    ) {

                        showMessage(
                            "Please upload at least one marks card.",
                            "error"
                        );

                        marks.focus();

                        return;
                    }


                    if (
                        idCard.files.length === 0
                    ) {

                        showMessage(
                            "Please upload the student ID card.",
                            "error"
                        );

                        idCard.focus();

                        return;
                    }

                }


                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Submitting...";


                try {

                    const formData =
                        new FormData(form);


                    const response =
                        await fetch(
                            form.action,
                            {
                                method: "POST",
                                body: formData
                            }
                        );


                    const data =
                        await response.json();


                    if (
                        !response.ok ||
                        !data.success
                    ) {

                        throw new Error(
                            data.message ||
                            "Submission failed."
                        );

                    }


                    showMessage(
                        data.message,
                        "success"
                    );


                    setTimeout(
                        function () {

                            window.location.href =
                                data.redirect_url;

                        },
                        900
                    );


                }
                catch (error) {

                    console.error(
                        "Verification error:",
                        error
                    );


                    showMessage(
                        error.message ||
                        "Something went wrong.",
                        "error"
                    );


                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Submit for Review →";

                }

            }
        );


        function showMessage(
            message,
            type
        ) {

            messageBox.textContent =
                message;

            messageBox.style.display =
                "block";

            messageBox.className =
                "alert";

            messageBox.classList.add(
                type === "success"
                    ? "alert-success"
                    : "alert-error"
            );

            messageBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    }
);