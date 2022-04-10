-- User
CREATE TABLE User (
    userID INTEGER NOT NULL AUTO_INCREMENT,
    first VARCHAR(30) NOT NULL,
    middle VARCHAR(30),
    last VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    houseNumber INTEGER NOT NULL,
    street VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    province VARCHAR(30) NOT NULL,
    dateOfBirth DATE NOT NULL,
    age INTEGER NOT NULL,
    ssn INTEGER UNIQUE,
    role VARCHAR(20),
    PRIMARY KEY (userID)
);

-- Calculate age
DELIMITER $$
CREATE TRIGGER calculate_user_age
    BEFORE INSERT 
    ON User
    FOR EACH ROW
    BEGIN
    DECLARE today INTEGER;
	DECLARE userAge INTEGER;
    SELECT CURDATE() INTO today;
	SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.dateOfBirth, today);
    END$$
DELIMITER ;

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
CHECK (province in ("Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", 
"Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"));

-- PhoneNumber
CREATE TABLE PhoneNumber (
    userID INTEGER NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
    PRIMARY KEY (userID, phoneNumber),
    FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE
);

-- Checking for valid phoneNumber
ALTER TABLE PhoneNumber
ADD CONSTRAINT valid_phoneNumber
CHECK (CHAR_LENGTH(phoneNumber) = 10);
-- Patient
CREATE TABLE Patient (
    patientID INTEGER NOT NULL,
    insuranceProvider VARCHAR(30),
    PRIMARY KEY (patientID),
    FOREIGN KEY (patientID) REFERENCES User(userID)
    ON DELETE CASCADE
);

-- Branch
CREATE TABLE Branch (
	branchID INTEGER NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (branchID),
    houseNumber INTEGER NOT NULL,
    street VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    province VARCHAR(30) NOT NULL
);

-- Checking for valid province
ALTER TABLE Branch 
ADD CONSTRAINT valid_branch_province
CHECK (province in ("Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", 
"Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"));

-- Checking that valid street number
ALTER TABLE Branch 
ADD CONSTRAINT check_valid_houseNumber 
CHECK (houseNumber > 0);

-- Review
CREATE TABLE Review (
    reviewID INTEGER NOT NULL AUTO_INCREMENT,
    professionalism INTEGER,
    cleanliness INTEGER,
    value INTEGER,
    communication INTEGER,
    userID INTEGER,
    FOREIGN KEY (userID) REFERENCES User(userID)  ON DELETE CASCADE,
    branchID INTEGER,
    FOREIGN KEY (branchID) REFERENCES Branch(branchID)  ON DELETE CASCADE,
    date DATE,
    PRIMARY KEY (reviewID)
);

-- Checking for valid professionalism
ALTER TABLE Review
ADD CONSTRAINT valid_professionalism
CHECK (professionalism BETWEEN 1 AND 5);

-- Checking for valid cleanliness
ALTER TABLE Review
ADD CONSTRAINT valid_cleanliness
CHECK (cleanliness BETWEEN 1 AND 5);

-- Checking for valid value
ALTER TABLE Review
ADD CONSTRAINT valid_value
CHECK (value BETWEEN 1 AND 5);

-- Checking for valid communication
ALTER TABLE Review
ADD CONSTRAINT valid_communication
CHECK (communication BETWEEN 1 AND 5);

-- Employee
CREATE TABLE Employee (
    employeeID INTEGER NOT NULL,
    salary INTEGER NOT NULL,
    position VARCHAR(30) NOT NULL,
    branchID INTEGER NOT NULL,
    PRIMARY KEY (employeeID),
    FOREIGN KEY (employeeID) REFERENCES User(userID)  ON DELETE CASCADE,
    FOREIGN KEY (branchID) REFERENCES Branch(branchID)  ON DELETE CASCADE
);

-- Checking for valid position
ALTER TABLE Employee 
ADD CONSTRAINT valid_position
CHECK (position in ("manager", "dentist", "hygienist", "receptionist"));

-- Limit number of managers per branch to 1
DELIMITER $$
CREATE TRIGGER check_manager
    BEFORE INSERT 
    ON Employee
    FOR EACH ROW
    BEGIN
    DECLARE manager_count INTEGER;
    SELECT count(employeeID) FROM employee  WHERE position="manager" and branchID = NEW.branchID INTO manager_count;
    IF NEW.position = "manager" and manager_count >= 1 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'There can only be one manager per branch';
    END IF;
    END$$
DELIMITER ;

-- Limit number of receptionists per branch to 2
DELIMITER $$
CREATE TRIGGER check_receptionist
    BEFORE INSERT 
    ON Employee
    FOR EACH ROW
    BEGIN
    DECLARE receptionist_count INTEGER;
    SELECT count(employeeID) FROM employee WHERE position="receptionist" and branchID = NEW.branchID INTO receptionist_count;
    IF NEW.position = "receptionist" and receptionist_count >= 2 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'There can only be two receptionists per branch';
    END IF;
    END$$
DELIMITER ;

-- ResponsibleFor
CREATE TABLE ResponsibleFor (
    patientID INTEGER,
    responsiblePartyID INTEGER,
    PRIMARY KEY (patientID, responsiblePartyID),
    FOREIGN KEY (patientID) REFERENCES Patient(patientID)  ON DELETE CASCADE,
    FOREIGN KEY (responsiblePartyID) REFERENCES User(userID)  ON DELETE CASCADE
);

-- PatientChart
CREATE TABLE PatientChart (
	recordID INTEGER NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (recordID),
    patientID INTEGER,
    FOREIGN KEY (patientID) REFERENCES Patient(patientID)  ON DELETE CASCADE
);

-- Authored
CREATE TABLE Authored (
	employeeID INTEGER NOT NULL,
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID)  ON DELETE CASCADE,
	chartID INTEGER NOT NULL,
    FOREIGN KEY (chartID) REFERENCES PatientChart(recordID)  ON DELETE CASCADE
);

-- Invoice
CREATE TABLE Invoice (
    invoiceID INTEGER NOT NULL AUTO_INCREMENT,
    discount DECIMAL(2,2),
    patientCharge DECIMAL(10,2) NOT NULL,
    totalFeeCharge DECIMAL(10,2) NOT NULL,
    insuranceCharge DECIMAL(10,2) NOT NULL,
    penalty DECIMAL(10,2),
    PRIMARY KEY  (invoiceID),
    fulfillerID INTEGER,
    FOREIGN KEY (fulfillerID) REFERENCES User(userID) ON DELETE CASCADE
);

-- Checking for valid discount
ALTER TABLE Invoice
ADD CONSTRAINT valid_discount
CHECK (discount BETWEEN 0.0 AND 1.0);

-- Checking for valid totalFeeCharge
ALTER TABLE Invoice
ADD CONSTRAINT valid_totalFeeCharge
CHECK (totalFeeCharge >= 0.0);

-- Checking for valid insuranceCharge
ALTER TABLE Invoice
ADD CONSTRAINT valid_insuranceCharge
CHECK (insuranceCharge >= 0.0);

-- Checking for valid patientCharge
ALTER TABLE Invoice
ADD CONSTRAINT valid_patientCharge
CHECK (patientCharge >= 0.0);

-- Checking for valid penalty
ALTER TABLE Invoice
ADD CONSTRAINT valid_penalty
CHECK (penalty >= 0.0);

-- PaymentType
CREATE TABLE PaymentType (
	invoiceID INTEGER NOT NULL,
    FOREIGN KEY (invoiceID) REFERENCES Invoice(invoiceID)  ON DELETE CASCADE,
    paymentType VARCHAR(30)
);

-- Checking for valid payment type
ALTER TABLE PaymentType 
ADD CONSTRAINT valid_PaymentType
CHECK (paymentType in ("cash", "visa", "cheque", "mastercard", "amex", "paypal", "debit"));

-- Appointment
CREATE TABLE Appointment (
    appointmentID INTEGER NOT NULL AUTO_INCREMENT ,
    patientID INTEGER NOT NULL,
    employeeID INTEGER NOT NULL,
    invoiceID INTEGER,
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    appointmentType VARCHAR(30) NOT NULL,
    status VARCHAR(30),
    PRIMARY KEY (appointmentID),
    FOREIGN KEY (patientID) REFERENCES Patient(patientID)  ON DELETE CASCADE,
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID)  ON DELETE CASCADE,
    FOREIGN KEY (invoiceID) REFERENCES Invoice(InvoiceID)  ON DELETE CASCADE
);

-- Checking for valid status
ALTER TABLE Appointment
ADD CONSTRAINT valid_status
CHECK ( status in ("completed", "no show", "late cancelation", "canceled") );

-- FeeCharge
CREATE TABLE FeeCharge (
    feeCode INTEGER NOT NULL,
    charge DECIMAL(10,2) NOT NULL,
    feeDesc VARCHAR(30) NOT NULL,
    PRIMARY KEY (feeCode)
);

-- Checking for valid fee code
ALTER TABLE FeeCharge
ADD CONSTRAINT valid_feeCode
CHECK (feeCode BETWEEN 90000 AND 99999);

-- Checking for valid fee code
ALTER TABLE FeeCharge
ADD CONSTRAINT valid_charge
CHECK (charge >= 0.00);

-- AppointmentProcedure
CREATE TABLE AppointmentProcedure (
    procedureID INTEGER NOT NULL AUTO_INCREMENT,
    procedureType VARCHAR(30),
    amountOfProcedure INTEGER NOT NULL,
    employeeID INTEGER NOT NULL,
    appointmentID INTEGER NOT NULL,
    feeCode INTEGER NOT NULL,
    PRIMARY KEY (procedureID),
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID) ON DELETE CASCADE,
    FOREIGN KEY (appointmentID) REFERENCES Appointment(appointmentID) ON DELETE CASCADE,
    FOREIGN KEY (feeCode) REFERENCES FeeCharge(feeCode) ON DELETE CASCADE
);

-- Checking that AppointmentProcedure is positive and not 0
ALTER TABLE AppointmentProcedure 
ADD CONSTRAINT check_amountOfProcedure
CHECK (amountOfProcedure > 0);

-- PatientPayment
CREATE TABLE PatientPayment (
    patientPaymentID INTEGER NOT NULL AUTO_INCREMENT,
    paymentDate DATE NOT NULL,
    patientAmount NUMERIC(8,2) NOT NULL,
    insuranceAmount NUMERIC(8,2) NOT NULL,
    invoiceID INTEGER,
    procedureID INTEGER NOT NULL,
    PRIMARY KEY (patientPaymentID),
    FOREIGN KEY (invoiceID) REFERENCES Invoice(InvoiceID) ON DELETE CASCADE,
    FOREIGN KEY (procedureID) REFERENCES AppointmentProcedure(procedureID) ON DELETE CASCADE
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
    claimID INTEGER NOT NULL AUTO_INCREMENT,
    claimAmount NUMERIC(8,2) NOT NULL,
    patientPaymentID INTEGER NOT NULL,
    PRIMARY KEY (claimID),
    FOREIGN KEY (patientPaymentID) REFERENCES PatientPayment(patientPaymentID) ON DELETE CASCADE
);

-- Checking that claim amount is valid
ALTER TABLE InsuranceClaim 
ADD CONSTRAINT check_claimAmount 
CHECK (claimAmount >= 0);

-- Treatment
CREATE TABLE Treatment (
    procedureID INTEGER NOT NULL,
    tooth INTEGER NOT NULL,
    comment VARCHAR(90),
    recordID INTEGER NOT NULL,
    FOREIGN KEY (recordID) REFERENCES PatientChart(recordID) ON DELETE CASCADE,
    FOREIGN KEY (procedureID) REFERENCES AppointmentProcedure(procedureID) ON DELETE CASCADE
);

-- Checking that tooth number is valid
ALTER TABLE Treatment 
ADD CONSTRAINT check_tooth 
CHECK (tooth >= 1 and tooth <= 32);

-- Symptom
CREATE TABLE Symptom (
    procedureID INTEGER NOT NULL,
    symptomDescription VARCHAR(90) NOT NULL,
    PRIMARY KEY (procedureID, symptomDescription),
    FOREIGN KEY (procedureID) REFERENCES AppointmentProcedure(procedureID) ON DELETE CASCADE
);

-- Medication
CREATE TABLE Medication (
    procedureID INTEGER NOT NULL,
    medicationName VARCHAR(40) NOT NULL,
    PRIMARY KEY (procedureID, medicationName),
    FOREIGN KEY (procedureID) REFERENCES AppointmentProcedure(procedureID) ON DELETE CASCADE
);
