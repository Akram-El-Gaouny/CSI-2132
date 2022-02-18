-- User
CREATE TABLE User (
    userID INTEGER NOT NULL AUTO_INCREMENT,
    first VARCHAR(30) NOT NULL,
    middle VARCHAR(30) NOT NULL,
    last VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    houseNumber INTEGER NOT NULL,
    street VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    province VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,
    dateOfBirth DATE NOT NULL,
    age INTEGER NOT NULL,
    ssn INTEGER,
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
    phoneNumber INTEGER NOT NULL,
    PRIMARY KEY (userID, phoneNumber),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

-- Checking for valid phoneNumber
ALTER TABLE PhoneNumber
ADD CONSTRAINT valid_phoneNumber
CHECK (phoneNumber BETWEEN 0 AND 999999999);

-- Patient
CREATE TABLE Patient (
    patientID INTEGER NOT NULL,
    insuranceProvider VARCHAR(30),
    PRIMARY KEY (patientID),
    FOREIGN KEY (patientID) REFERENCES User(userID)
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
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (branchID) REFERENCES Branch(branchID),
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
    FOREIGN KEY (employeeID) REFERENCES User(userID),
    FOREIGN KEY (branchID) REFERENCES Branch(branchID)
);

-- Checking for valid position
ALTER TABLE User 
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
    SELECT count(*) INTO manager_count WHERE role="manager" and branchID = New.branchID;
    IF NEW.role = "manager" and manager_count >= 1 THEN
        SIGNAL SQLSTATE '1'
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
    SELECT count(*) INTO receptionist_count WHERE role="receptionist" and branchID = New.branchID;
    IF NEW.role = "receptionist" and receptionist_count >= 2 THEN
        SIGNAL SQLSTATE '2'
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
	recordID INTEGER NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (recordID),
    patientID INTEGER,
    FOREIGN KEY (patientID) REFERENCES Patient(patientID)
);

-- Authored
CREATE TABLE Authored (
	employeeID INTEGER NOT NULL,
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID),
	chartID INTEGER NOT NULL,
    FOREIGN KEY (chartID) REFERENCES PatientChart(recordID)
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
    FOREIGN KEY (fulfillerID) REFERENCES User(userID)
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
    FOREIGN KEY (invoiceID) REFERENCES Invoice(invoiceID),
    paymentType VARCHAR(30)
);

-- Checking for valid payment type
ALTER TABLE PaymentType 
ADD CONSTRAINT valid_PaymentType
CHECK (paymentType in ("cash", "visa", "cheque", "mastercard", "amex", "paypal", "debit"));

-- Appointment
CREATE TABLE Appointment (
    appointmentID INTEGER AUTO_INCREMENT,
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
    feeID INTEGER NOT NULL AUTO_INCREMENT,
    feeCode INTEGER NOT NULL,
    charge DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (feeID)
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
    procedureID INTEGER AUTO_INCREMENT,
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
