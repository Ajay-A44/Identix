import os
import sqlite3
from werkzeug.security import generate_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "secureverify.db")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")


def create_database():

    # Remove old database and SQLite temporary files
    for path in [
        DB_PATH,
        DB_PATH + "-wal",
        DB_PATH + "-shm"
    ]:
        if os.path.exists(path):
            os.remove(path)

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    conn = sqlite3.connect(DB_PATH)

    conn.execute("PRAGMA foreign_keys = ON")

    # =========================================================
    # STUDENTS
    # =========================================================

    conn.execute("""
        CREATE TABLE students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usn TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            dob TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            course TEXT NOT NULL,
            branch TEXT NOT NULL,
            year TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'ACTIVE'
        )
    """)

    # =========================================================
    # ADMINS
    # =========================================================

    conn.execute("""
        CREATE TABLE admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            admin_id TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL
        )
    """)

    # =========================================================
    # VERIFICATIONS
    # =========================================================

    conn.execute("""
        CREATE TABLE verifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            verification_id TEXT NOT NULL,
            purpose TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'UNDER_REVIEW',
            admin_message TEXT,
            ocr_name TEXT,
            ocr_usn TEXT,
            match_status TEXT,
            submitted_at TEXT NOT NULL,
            reviewed_at TEXT,
            reviewed_by INTEGER,
            updated_at TEXT NOT NULL,

            FOREIGN KEY(student_id)
                REFERENCES students(id)
                ON DELETE CASCADE,

            FOREIGN KEY(reviewed_by)
                REFERENCES admins(id)
                ON DELETE SET NULL
        )
    """)

    # =========================================================
    # SCHOLARSHIP DETAILS
    # =========================================================

    conn.execute("""
        CREATE TABLE scholarship_details (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            verification_id INTEGER NOT NULL UNIQUE,
            name TEXT NOT NULL,
            usn TEXT NOT NULL,
            ssp_id TEXT NOT NULL,
            mobile TEXT NOT NULL,
            nsp_otr TEXT NOT NULL,

            FOREIGN KEY(verification_id)
                REFERENCES verifications(id)
                ON DELETE CASCADE
        )
    """)

    # =========================================================
    # ADMISSION DETAILS
    # =========================================================

    conn.execute("""
        CREATE TABLE admission_details (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            verification_id INTEGER NOT NULL UNIQUE,
            name TEXT NOT NULL,
            usn TEXT NOT NULL,
            parent_name TEXT NOT NULL,
            course TEXT NOT NULL,
            branch TEXT NOT NULL,
            semester TEXT NOT NULL,
            seat_category TEXT NOT NULL,
            address TEXT NOT NULL,
            mobile TEXT NOT NULL,

            FOREIGN KEY(verification_id)
                REFERENCES verifications(id)
                ON DELETE CASCADE
        )
    """)

    # =========================================================
    # DOCUMENTS
    # =========================================================

    conn.execute("""
        CREATE TABLE documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            verification_id INTEGER NOT NULL,
            doc_type TEXT NOT NULL,
            filename TEXT NOT NULL,
            original_name TEXT NOT NULL,

            FOREIGN KEY(verification_id)
                REFERENCES verifications(id)
                ON DELETE CASCADE
        )
    """)

    # =========================================================
    # AUDIT LOGS
    # =========================================================

    conn.execute("""
        CREATE TABLE audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            verification_id INTEGER NOT NULL,
            action TEXT NOT NULL,
            details TEXT,
            created_at TEXT NOT NULL,

            FOREIGN KEY(verification_id)
                REFERENCES verifications(id)
                ON DELETE CASCADE
        )
    """)

    # =========================================================
    # DEMO STUDENTS
    # =========================================================

    students = [
        (
            "3BR25CS401",
            "Adil Basha",
            "2005-04-11",
            "adilbashably@gmail.com",
            "8746965346",
            "B.E.",
            "Computer Science and Engineering",
            "3rd Year",
            generate_password_hash("student123")
        ),
        (
            "3BR25CS402",
            "Ajay",
            "2006-05-29",
            "ajay44@gmail.com",
            "9916659001",
            "B.E.",
            "Computer Science and Engineering",
            "3rd Year",
            generate_password_hash("student123")
        ),
        (
            "3BR24CS171",
            "Vaishnavi",
            "2006-01-01",
            "vaishu01@gmail.com",
            "8217600211",
            "B.E.",
            "Computer Science and Engineering",
            "3rd Year",
            generate_password_hash("student123")
        ),
        (
            "3BR24CS149",
            "Sanjana",
            "2006-02-02",
            "sanjana@gmail.com",
            "9876543212",
            "B.E.",
            "Computer Science and Engineering",
            "3rd Year",
            generate_password_hash("student123")
        )
    ]

    conn.executemany("""
        INSERT INTO students (
            usn,
            name,
            dob,
            email,
            phone,
            course,
            branch,
            year,
            password_hash
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, students)

    # =========================================================
    # DEMO ADMIN
    # =========================================================

    conn.execute("""
        INSERT INTO admins (
            admin_id,
            password_hash
        )
        VALUES (?, ?)
    """, (
        "ADMIN001",
        generate_password_hash("admin123")
    ))

    conn.commit()
    conn.close()

    print("==============================================")
    print("SecureVerify database created successfully.")
    print("==============================================")


if __name__ == "__main__":
    create_database()