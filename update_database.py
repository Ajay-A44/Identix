import sqlite3


conn = sqlite3.connect(
    "verification.db"
)


# --------------------------------
# REQUIRED COLUMNS
# --------------------------------

columns = {

    "verification_id": "TEXT",

    "application_id": "TEXT",

    "email": "TEXT",

    "phone": "TEXT",

    "purpose": "TEXT",

    "document_type": "TEXT",

    "document_number": "TEXT",

    "extracted_id": "TEXT",

    "id_match": "INTEGER",

    "created_at": "TEXT"

}


# --------------------------------
# CHECK EXISTING COLUMNS
# --------------------------------

existing_columns = [

    row[1]

    for row in conn.execute(
        "PRAGMA table_info(verification_records)"
    )

]


# --------------------------------
# ADD MISSING COLUMNS
# --------------------------------

for column, data_type in columns.items():

    if column not in existing_columns:

        conn.execute(
            f"""
            ALTER TABLE verification_records
            ADD COLUMN {column} {data_type}
            """
        )

        print(
            f"Added column: {column}"
        )

    else:

        print(
            f"Already exists: {column}"
        )


conn.commit()

conn.close()


print()
print(
    "Database update completed successfully."
)