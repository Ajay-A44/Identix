import pytesseract
from PIL import Image
import re

# -----------------------------
# USER ENTERED INFORMATION
# -----------------------------

entered_name = "Rahul Sharma"
entered_dob = "14-08-2004"


# -----------------------------
# READ DOCUMENT
# -----------------------------

image = Image.open("sample_id.png")

text = pytesseract.image_to_string(image)

print("OCR RESULT:")
print(text)


# -----------------------------
# EXTRACT NAME
# -----------------------------

name_match = re.search(
    r"Name\s*:\s*(.+)",
    text,
    re.IGNORECASE
)

if name_match:
    extracted_name = name_match.group(1).strip()
else:
    extracted_name = None


# -----------------------------
# EXTRACT DOB
# -----------------------------

dob_match = re.search(
    r"DOB\s*:\s*(\d{2}-\d{2}-\d{4})",
    text,
    re.IGNORECASE
)

if dob_match:
    extracted_dob = dob_match.group(1).strip()
else:
    extracted_dob = None


# -----------------------------
# COMPARE INFORMATION
# -----------------------------

name_match_result = (
    entered_name.lower() == extracted_name.lower()
    if extracted_name
    else False
)

dob_match_result = (
    entered_dob == extracted_dob
    if extracted_dob
    else False
)


# -----------------------------
# DISPLAY RESULTS
# -----------------------------

print("\nVERIFICATION RESULT")
print("-------------------------")

print("Entered Name   :", entered_name)
print("Document Name  :", extracted_name)

if name_match_result:
    print("Name Status    : MATCH ✓")
else:
    print("Name Status    : MISMATCH ✗")


print()

print("Entered DOB    :", entered_dob)
print("Document DOB   :", extracted_dob)

if dob_match_result:
    print("DOB Status     : MATCH ✓")
else:
    print("DOB Status     : MISMATCH ✗")


# -----------------------------
# FINAL DECISION
# -----------------------------

if name_match_result and dob_match_result:
    print("\nFINAL RESULT   : VERIFIED ✓")
else:
    print("\nFINAL RESULT   : MANUAL REVIEW REQUIRED")