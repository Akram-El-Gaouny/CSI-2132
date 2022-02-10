-- User
CREATE TABLE User (

);
-- PhoneNumber
CREATE TABLE PhoneNumber (

);
-- Patient
CREATE TABLE Patient (

);
-- Branch
CREATE TABLE Branch (

);
-- Review
CREATE TABLE Review (

);
-- Employee
CREATE TABLE Employee (

);
-- ResponsibleFor
CREATE TABLE ResponsibleFor (

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

);
-- FeeCharge
CREATE TABLE FeeCharge (

);
-- AppointmentProcedure
CREATE TABLE AppointmentProcedure (

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
ADD CONSTRAINT check_claimAmount CHECK (claimAmount >= 0)                   ;

-- Treatment
CREATE TABLE Treatment (

);
-- Symptom
CREATE TABLE Symptom (

);
-- Medication
CREATE TABLE Medication (

);
