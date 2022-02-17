-- User
CREATE TABLE User (
    userID INTEGER,
    first VARCHAR(30),
    middle VARCHAR(30),
    last VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(30),
    houseNumber INTEGER(),
    street VARCHAR(30),
    city VARCHAR(30),
    province VARCHAR(30),
    role VARCHAR(30),
    datOfBirth DATE,
    age INTEGER GENERATED ALWAYS AS (TIMESTAMPDIFF(YEAR, dateOfBirth, CURDATE())),
    ssn INTEGER,
    PRIMARY KEY (userID)
);
-- Checking for valid ssn
ALTER TABLE User 
ADD CONSTRAINT valid_ssn
CHECK (ssn BETWEEN 0 AND 999999999);

-- Checking for valid role
ALTER TABLE User 
ADD CONSTRAINT valid_role
CHECK (role in ("admin", "user", "employee", "patient"));

-- Checking for valid province
ALTER TABLE User 
ADD CONSTRAINT valid_province
CHECK (province in ("Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"));

-- PhoneNumber
CREATE TABLE PhoneNumber (
    userID INTEGER,
    phoneNumber INTEGER,
    PRIMARY KEY (userID, phoneNumber),
    FOREIGN KEY (userID) REFERENCES User(UserID)
);
-- Checking for valid phoneNumber
ALTER TABLE PhoneNumber
ADD CONSTRAINT valid_phoneNumber
CHECK (phoneNumber BETWEEN 0 AND 999999999);

-- Patient
CREATE TABLE Patient (
    patientID INTEGER,
    insuranceProvider VARCHAR(30),
    PRIMARY KEY (patientID),
    FOREIGN KEY (patientID) REFERENCES User(userID)
);
-- Branch
CREATE TABLE Branch (

);
-- Review
CREATE TABLE Review (

);
-- Employee
CREATE TABLE Employee (
    employeeID INTEGER,
    salary INTEGER,
    position VARCHAR(30),
    branchID INTEGER,
    PRIMARY KEY (employeeID),
    FOREIGN KEY (employeeID) REFERENCES User(userID),
    FOREIGN KEY (branchID) REFERENCES Branch(branchID)
);
-- Checking for valid position
ALTER TABLE User 
ADD CONSTRAINT valid_position
CHECK (position in ("manager", "dentist", "hygienist", "receptionist"));

-- Limit number of managers per branch to 1
DELIMITER $$
CREATE TRIGGER check_test
    BEFORE INSERT 
    ON Employee
    FOR EACH ROW
    BEGIN
    DECLARE manager_count INTEGER;
    SELECT count(*) INTO manager_count WHERE role="manager";
    
    IF NEW.role = "manager" and manager_count >= 1 THEN
        SIGNAL SQLSTATE '1'
            SET MESSAGE_TEXT = 'There can only be one manager per branch';
    END IF;
    END$$
DELIMITER ;

-- Limit number of receptionists per branch to 2
DELIMITER $$
CREATE TRIGGER check_test
    BEFORE INSERT 
    ON Employee
    FOR EACH ROW
    BEGIN
    DECLARE receptionist_count INTEGER;
    SELECT count(*) INTO receptionist_count WHERE role="receptionist";
    
    IF NEW.role = "receptionist" and receptionist_count >= 2 THEN
        SIGNAL SQLSTATE '1'
            SET MESSAGE_TEXT = 'There can only be two receptionists per branch';
    END IF;
    END$$
DELIMITER ;

-- ResponsibleFor
CREATE TABLE ResponsibleFor (
    patientID INTEGER,
    responsiblePartyID INTEGER,
    PRIMARY KEY (patientID, responsiblePartyID),
    FOREIGN KEY (patientID) REFERENCES Patient(patientID),
    FOREIGN KEY (responsiblePartyID) REFERENCES User(userID)
);
-- PatientChart
CREATE TABLE PatientChart (

);
-- Authored
CREATE TABLE Authored (

);
-- Invoice
CREATE TABLE Invoice (

);
-- PaymentType
CREATE TABLE PaymentType (

);
-- Appointment
CREATE TABLE Appointment (
    appointmentID INTEGER,
    patientID INTEGER,
    employeeID INTEGER,
    invoiceID INTEGER,
    date DATE,
    startTime TIME,
    endTime TIME,
    appointmentType VARCHAR(30),
    status VARCHAR(30),
    PRIMARY KEY (appointmentID),
    FOREIGN KEY (patientID) REFERENCES Patient(patientID),
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID),
    FOREIGN KEY (invoiceID) REFERENCES Invoice(InvoiceID)

);
-- FeeCharge
CREATE TABLE FeeCharge (

);
-- AppointmentProcedure
CREATE TABLE AppointmentProcedure (
    procedureID INTEGER,
    procedureType VARCHAR(30),
    amountOfProcedure INTEGER,
    employeeID INTEGER,
    appointmentID INTEGER,
    feeID INTEGER,
    PRIMARY KEY (procedureID),
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID),
    FOREIGN KEY (appointmentID) REFERENCES Appointment(appointmentID),
    FOREIGN KEY (feeID) REFERENCES FeeCharge(feeID)

);

-- PatientPayment
CREATE TABLE PatientPayment (
    patientPaymentID INTEGER AUTO_INCREMENT,
    paymentDate DATE,
    patientAmount NUMERIC(8,2),
    insuranceAmount NUMERIC(8,2),
    invoiceID INTEGER,
    procedureID INTEGER,
    PRIMARY KEY (patientPaymentID),
    FOREIGN KEY (invoiceID) REFERENCES Invoice(InvoiceID),
    FOREIGN KEY (procedureID) REFERENCES AppointmentProcedure(procedureID)
);

-- Checking that patientAmount is positive or 0
ALTER TABLE PatientPayment 
ADD CONSTRAINT check_patient_amount 
CHECK (patientAmount >= 0);

-- Checking that insuranceAmount is positive or 0
ALTER TABLE PatientPayment 
ADD CONSTRAINT check_insurance_amount 
CHECK (insuranceAmount >= 0);

-- InsuranceClaim
CREATE TABLE InsuranceClaim (
    claimID INTEGER AUTO_INCREMENT,
    claimAmount NUMERIC(8,2),
    patientPaymentID INTEGER,
    PRIMARY KEY (claimID),
    FOREIGN KEY (patientPaymentID) REFERENCES PatientPayment(patientPaymentID)
);
ALTER TABLE InsuranceClaim 
ADD CONSTRAINT check_claimAmount 
CHECK (claimAmount >= 0);

-- Treatment
CREATE TABLE Treatment (
    procedureID INTEGER,
    tooth INTEGER,
    comment VARCHAR(20),
    recordID INTEGER,
    FOREIGN KEY (recordID) REFERENCES PatientChart(recordID),
    FOREIGN KEY (procedureID) REFERENCES AppointmentProcedure(procedureID)
    
);
-- Symptom
CREATE TABLE Symptom (
    procedureID INTEGER,
    symptomDescription VARCHAR(20),
    FOREIGN KEY (procedureID) REFERENCES AppointmentProcedure(procedureID)

);
-- Medication
CREATE TABLE Medication (
    procedureID INTEGER,
    medicationName VARCHAR(20),
    FOREIGN KEY (procedureID) REFERENCES AppointmentProcedure(procedureID)

);
