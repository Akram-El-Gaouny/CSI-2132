-- +++++++++++++++++++++++++++++++++++++++++++++++++
-- ADD NEW PATIENT
-- +++++++++++++++++++++++++++++++++++++++++++++++++

-- Required fields: fname, mname, lname, pemail, pass, hnum, str, cty, prov, dob, pssn
-- Optional fields (set to NULL otherwise): ins

INSERT INTO User(first, middle, last, email, password, houseNumber, street, city, province, role, dateOfBirth, age, ssn) VALUES (fname, mname, lname, pemail, pass, hnum, str, cty, prov, "patient", dob, TIMESTAMPDIFF(YEAR, dob, today), pssn);

INSERT INTO Patient VALUES (SELECT userID FROM User WHERE ssn = pssn LIMIT 1, ins);

-- If phone number, itterate for all pn

-- Required fields: pn

INSERT INTO PhoneNumber VALUES (SELECT userID FROM User WHERE ssn = pssn LIMIT 1, pn);

-- If minor, also

-- Required fields: pssn, rpssn

INSERT INTO ResponsibleFor VALUES (SELECT userID FROM User WHERE ssn = pssn LIMIT 1, SELECT LIMIT 1 userID FROM User WHERE ssn = rpssn);


-- +++++++++++++++++++++++++++++++++++++++++++++++++
-- EDIT PATIENT (needs uid)
-- +++++++++++++++++++++++++++++++++++++++++++++++++

-- fname
UPDATE User SET first=fname WHERE userID=uid;

-- mname
UPDATE User SET middle=mname WHERE userID=uid;

-- lname
UPDATE User SET last=lname WHERE userID=uid;

-- pemail
UPDATE User SET email=pemail WHERE userID=uid;

-- pass
UPDATE User SET password=pass WHERE userID=uid;

-- hnum
UPDATE User SET houseNumber=hnum WHERE userID=uid;

-- str
UPDATE User SET street=str WHERE userID=uid;

-- cty
UPDATE User SET city=cty WHERE userID=uid;

-- prov
UPDATE User SET province=prov WHERE userID=uid;

-- dob
UPDATE User SET dateOfBirth=dob, age=TIMESTAMPDIFF(YEAR, dob, today) WHERE userID=uid;

-- pssn
UPDATE User SET ssn=pssn WHERE userID=uid;

-- pn
INSERT INTO PhoneNumber VALUES (uid, pn);

-- ins
UPDATE Patient SET insuranceProvider=ins WHERE userID=uid;

-- +++++++++++++++++++++++++++++++++++++++++++++++++
-- DELETE PATIENT (needs uid)
-- +++++++++++++++++++++++++++++++++++++++++++++++++

DELETE FROM PhoneNumber WHERE userID=uid;
DELETE FROM Patient WHERE userID=uid;
DELETE FROM User WHERE userID=uid;

-- +++++++++++++++++++++++++++++++++++++++++++++++++
-- ADD NEW PATIENT
-- +++++++++++++++++++++++++++++++++++++++++++++++++

-- Required fields: fname, mname, lname, eemail, pass, hnum, str, cty, prov, dob, essn, sal, pos, bID

-- if ssn not in User:

INSERT INTO User(first, middle, last, email, password, houseNumber, street, city, province, role, dateOfBirth, age, ssn) VALUES (fname, mname, lname, eemail, pass, hnum, str, cty, prov, "employee", dob, TIMESTAMPDIFF(YEAR, dob, today), essn);

INSERT INTO Employee VALUES (SELECT userID FROM User WHERE ssn=essn LIMIT 1, sal, pos, bID);

-- If phone number, itterate for all pn

-- Required fields: pn

INSERT INTO PhoneNumber VALUES (SELECT userID FROM User WHERE ssn = pssn LIMIT 1, pn);