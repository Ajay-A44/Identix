document.addEventListener(
    "DOMContentLoaded",
    function () {


        /*
         * =====================================================
         * STATUS DISPLAY
         * =====================================================
         */

        function getStatusInfo(status) {

            switch (status) {

                case "UNDER_REVIEW":

                    return {
                        text: "Under Review",
                        className:
                            "status-badge status-review"
                    };


                case "VERIFIED":

                    return {
                        text: "Approved",
                        className:
                            "status-badge status-approved"
                    };


                case "REJECTED":

                    return {
                        text: "Rejected",
                        className:
                            "status-badge status-rejected"
                    };


                case "CORRECTION_REQUIRED":

                    return {
                        text:
                            "Correction Required",

                        className:
                            "status-badge status-correction"
                    };


                default:

                    return {
                        text: "Not Submitted",
                        className:
                            "status-badge status-pending"
                    };
            }
        }


        function updateStatus(
            element,
            status
        ) {

            if (!element) {
                return;
            }


            const info =
                getStatusInfo(status);


            const changed =
                element.textContent.trim()
                !== info.text;


            element.textContent =
                info.text;

            element.className =
                info.className;


            if (changed) {

                element.classList.add(
                    "status-updated"
                );


                setTimeout(
                    function () {

                        element.classList.remove(
                            "status-updated"
                        );

                    },
                    600
                );

            }
        }


        function updateMessage(
            element,
            message
        ) {

            if (!element) {
                return;
            }


            if (message) {

                element.textContent =
                    message;

                element.style.display =
                    "block";

            } else {

                element.textContent =
                    "";

                element.style.display =
                    "none";

            }

        }


        function updateValue(
            element,
            value,
            fallback = "—"
        ) {

            if (!element) {
                return;
            }


            element.textContent =
                value || fallback;
        }


        /*
         * =====================================================
         * DASHBOARD
         * =====================================================
         */

        function handleDashboardStatus(
            data
        ) {

            const scholarshipStatus =
                document.getElementById(
                    "scholarship-status"
                );

            const scholarshipId =
                document.getElementById(
                    "scholarship-verification-id"
                );

            const scholarshipMessage =
                document.getElementById(
                    "scholarship-message"
                );


            const admissionStatus =
                document.getElementById(
                    "admission-status"
                );

            const admissionId =
                document.getElementById(
                    "admission-verification-id"
                );

            const admissionMessage =
                document.getElementById(
                    "admission-message"
                );


            if (
                data.purpose ===
                "SCHOLARSHIP"
            ) {

                updateStatus(
                    scholarshipStatus,
                    data.status
                );


                updateValue(
                    scholarshipId,
                    data.verification_id,
                    "Not submitted"
                );


                updateMessage(
                    scholarshipMessage,
                    data.admin_message
                );

            }


            if (
                data.purpose ===
                "HIGHER_SEMESTER_ADMISSION"
            ) {

                updateStatus(
                    admissionStatus,
                    data.status
                );


                updateValue(
                    admissionId,
                    data.verification_id,
                    "Not submitted"
                );


                updateMessage(
                    admissionMessage,
                    data.admin_message
                );

            }

        }


        /*
         * =====================================================
         * STATUS OVERVIEW PAGE
         * =====================================================
         */

        function handleOverviewStatus(
            data
        ) {

            if (
                data.purpose ===
                "SCHOLARSHIP"
            ) {

                updateStatus(
                    document.getElementById(
                        "page-scholarship-status"
                    ),
                    data.status
                );


                updateValue(
                    document.getElementById(
                        "status-scholarship-id"
                    ),
                    data.verification_id,
                    "Not submitted"
                );


                updateValue(
                    document.getElementById(
                        "status-scholarship-submitted"
                    ),
                    data.submitted_at
                );


                updateValue(
                    document.getElementById(
                        "status-scholarship-reviewed"
                    ),
                    data.reviewed_at
                );


                updateValue(
                    document.getElementById(
                        "status-scholarship-updated"
                    ),
                    data.updated_at
                );


                updateMessage(
                    document.getElementById(
                        "page-scholarship-message"
                    ),
                    data.admin_message
                );

            }


            if (
                data.purpose ===
                "HIGHER_SEMESTER_ADMISSION"
            ) {

                updateStatus(
                    document.getElementById(
                        "page-admission-status"
                    ),
                    data.status
                );


                updateValue(
                    document.getElementById(
                        "status-admission-id"
                    ),
                    data.verification_id,
                    "Not submitted"
                );


                updateValue(
                    document.getElementById(
                        "status-admission-submitted"
                    ),
                    data.submitted_at
                );


                updateValue(
                    document.getElementById(
                        "status-admission-reviewed"
                    ),
                    data.reviewed_at
                );


                updateValue(
                    document.getElementById(
                        "status-admission-updated"
                    ),
                    data.updated_at
                );


                updateMessage(
                    document.getElementById(
                        "page-admission-message"
                    ),
                    data.admin_message
                );

            }

        }


        /*
         * =====================================================
         * PARTICULAR APPLICATION PAGE
         * =====================================================
         */

        function handleDetailStatus(
            data
        ) {

            updateStatus(
                document.getElementById(
                    "detail-status"
                ),
                data.status
            );


            updateValue(
                document.getElementById(
                    "detail-verification-id"
                ),
                data.verification_id
            );


            updateValue(
                document.getElementById(
                    "detail-submitted"
                ),
                data.submitted_at
            );


            updateValue(
                document.getElementById(
                    "detail-reviewed"
                ),
                data.reviewed_at
            );


            updateMessage(
                document.getElementById(
                    "detail-message"
                ),
                data.admin_message
            );

        }


        /*
         * =====================================================
         * ROUTE DATA TO CORRECT PAGE
         * =====================================================
         */

        function handleStatus(
            data
        ) {

            if (!data) {
                return;
            }


            handleDashboardStatus(
                data
            );


            handleOverviewStatus(
                data
            );


            handleDetailStatus(
                data
            );

        }


        /*
         * =====================================================
         * OPEN LIVE STREAM
         * =====================================================
         */

        function connectToApplication(
            applicationId
        ) {

            if (!applicationId) {
                return;
            }


            if (
                window._secureVerifyStreams
                &&
                window._secureVerifyStreams[
                    applicationId
                ]
            ) {

                return;
            }


            if (!window._secureVerifyStreams) {

                window._secureVerifyStreams = {};

            }


            const streamUrl =
                "/student/status/stream/"
                + applicationId;


            const source =
                new EventSource(
                    streamUrl
                );


            window._secureVerifyStreams[
                applicationId
            ] = source;


            source.addEventListener(
                "status_update",
                function (event) {

                    try {

                        const data =
                            JSON.parse(
                                event.data
                            );


                        handleStatus(
                            data
                        );


                    }
                    catch (error) {

                        console.error(
                            "Invalid status event:",
                            error
                        );

                    }

                }
            );


            source.onerror =
                function () {

                    /*
                     * EventSource automatically attempts
                     * to reconnect.
                     */

                    console.log(
                        "Live status connection reconnecting..."
                    );

                };

        }


        /*
         * =====================================================
         * FIND APPLICATIONS ON CURRENT PAGE
         * =====================================================
         */

        const applicationCards =
            document.querySelectorAll(
                "[data-application-id]"
            );


        applicationCards.forEach(
            function (card) {

                const applicationId =
                    String(
                        card
                        .dataset
                        .applicationId
                    ).trim();


                if (applicationId) {

                    connectToApplication(
                        applicationId
                    );

                }

            }
        );

    }
);