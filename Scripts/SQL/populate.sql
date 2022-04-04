-- insertions for User
INSERT INTO User (first, middle, last, email, password, housenumber, street, city, province, role, dateOfBirth, age, ssn) VALUES
    ("Jeff", "Mary", "Yi", "yi@gmail.com", "pass12", 13, "Wallace", "Toronto", "Ontario", "employee", '1984-07-15', 37, 516547887),
    ("Tim", "Steve", "Thomas", "thomas@gmail.com", "timsteve", 222, "Robin", "Toronto", "Ontario", "employee", '1980-05-07', 41, 155235968),
    ("Ted", "John", "Oniel", "oniel@gmail.com", "461973458", 15233, "First", "Toronto", "Ontario", "employee", '1967-10-27', 54, 461973458),
    ("Amy", "Todd", "Dahl", "dahl@gmail.com", "againaround", 12, "Queen", "Toronto", "Ontario", "employee", '1976-04-23', 45, 516643785),
    ("Ray", "Matt", "Brown", "brown@gmail.com", "11123ns*", 33, "King", "Ottawa", "Ontario", "employee", '1981-09-15', 40, 991913546),
    ("Pete", "Humble", "Hound", "hound@gmail.com", "kind", 2, "Orleans", "Toronto", "Ontario", "patient", '1943-10-30', 78, 444141256),
    ("Harris", "Jerry", "Jelly", "jelly@gmail.com", "gssds", 222, "Vancouver", "Toronto", "Ontario", "patient", '1943-06-27', 78, 558454625),
    ("Robin", "Mort", "Hang", "hang@gmail.com", "addse33", 1355, "Main", "Toronto", "Ontario", "patient", '1994-06-21', 27, 336352245),
    ("Evan", "Finn", "Bruce", "bruce@gmail.com", "123iiii", 6, "Main", "Toronto", "Ontario", "patient", '1986-08-07', 35, 512158642),
    ("Steve", "John", "Thomas", "steve@gmail.com", "dentist", 32, "Main", "Toronto", "Ontario", "patient", '2009-05-19', 12, 155223468);

-- insertions for PhoneNumber
INSERT INTO PhoneNumber(userID, phoneNumber) VALUES 
    (1, 6138556588),
    (2, 7745665654),
    (4, 4224256884);

-- insertions for Patient
INSERT INTO Patient VALUES
    (6, "Dejardin"),
    (7, "Gold"),
    (8, "Waystar"),
    (9, "Gold"),
    (10, NULL);

-- insertions for Branch
INSERT INTO Branch (branchID, houseNumber, street, city, province) VALUES
	(1, 123, "Street", "Ottawa", "Ontario"),
    (2, 456, "Road", "Gatineau", "Quebec");

-- insertions for Review
INSERT INTO Review (professionalism, cleanliness, value, communication, userID, branchID, date) VALUES
    (5, 5, 5 ,5 ,6, 2, "2022-02-18"),
    (4, 4, 4 ,4 ,7, 2, "2022-02-24"),
    (5, 5, 5 ,5 ,8, 2, "2022-02-24"),
    (5, 5, 5 ,5 ,7, 2, "2022-02-25"),
    (5, 5, 5 ,5 ,9, 2, "2022-02-28");

-- insertions for Employee
INSERT INTO Employee VALUES 
    (1, 120000, "manager", 2),
    (2, 150000, "dentist", 2),
    (3, 80000, "receptionist", 2),
    (4, 95000, "hygienist", 2),
    (5, 130000, "manager", 1);

-- insertions for ResponsibleFor
INSERT INTO ResponsibleFor VALUES
    (10, 2);

-- insertions for PatientChart
INSERT INTO PatientChart(patientID) VALUES
	(6),
    (7),
    (8),
    (9),
    (10);

-- insertions for Authored
INSERT INTO Authored(employeeID, chartID) VALUES
	(1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

-- insertions for Invoice
INSERT INTO Invoice (discount, patientCharge, totalFeeCharge, insuranceCharge, penalty, fulfillerID) VALUES
    (0.0, 20.00, 80.00, 60.00, 0.00, 6),
    (0.0, 14.00, 14.00, 0.00, 14.00, 8),
    (0.0, 0.00, 75.00, 75.00, 0.00, 9),
    (0.0, 100.00, 400.00, 300.00, 0.00, 2);
    
-- insertions for PaymentType
INSERT INTO PaymentType (invoiceID, paymentType) VALUES
	(00001, "Amex"),
    (00002, "VISA"),
    (00003, "Cash"),
    (00004, "Mastercard");

-- insertions for Appointment
INSERT INTO Appointment VALUES
    (00000001, 6, 2, null, "2022-02-17", "11:30:00", "12:00:00", "General exam", null),
    (00000002, 7, 2, null, "2022-02-17", "13:30:00", "14:00:00", "Root Canal", null),
    (00000003, 8, 2, null, "2022-02-22", "11:30:00", "12:00:00", "Filling", null),
    (00000004, 9, 2, null, "2022-02-23", "11:30:00", "12:00:00", "Cleaning", null),
    (00000005, 10, 2, null, "2022-02-27", "11:30:00", "12:00:00", "Implant", null);

-- insertions for FeeCharge
INSERT INTO FeeCharge (feeCode, charge, feeDesc) VALUES
    (94303, 14.00, "No Show/Late Cancel"),
    (94304, 200.00, "Composite"),
    (94305, 80.00, "General Exam"),
    (94306, 300.00, "Tooth Removal"),
    (94307, 150.00, "Cleaning"),
    (94308, 75.00, "Fluoride"),
    (94309, 75.00, "Scaling");

-- insertions for AppointmentProcedure
INSERT INTO AppointmentProcedure(procedureType, amountOfProcedure, employeeID, appointmentID, feeCode) VALUES
    ("Scaling", 1, 2, 1, 94309),
    ("Composite", 1, 2, 2, 94304),
    (null, 3, 2, 3, 94303),
    ("Fluoride", 2, 2, 4, 94308),
    ("Tooth Removal", 4, 2, 5, 94306);

-- insertions for PatientPayment
INSERT INTO PatientPayment(paymentDate, patientAmount, insuranceAmount, invoiceID, procedureID) VALUES
    ("2022-02-17",150,150,null,1),
    ("2022-02-17", 50, 0, null, 2),
    ("2022-02-22",600,0,null,3),
    ("2022-02-23", 300, 275, null, 4),
    ("2022-02-27", 240, 0, null, 5);

-- insertions for InsuranceClaim
INSERT INTO InsuranceClaim (claimAmount, patientPaymentID) VALUES 
    (150 , 1),
    (275 , 4);

-- insertions for Treatment
INSERT INTO Treatment VALUES
     (1, 2, "Tooth 2 needs to be reviewed next exam", 1),
     (2, 5, "Root canal procedure completed + med", 2),
     (3, 2, "Filling of tooth 6 completed", 3),
     (4, 2, "Need to floss more", 4),
     (5, 2, "Need direct supervision on the implant", 5);
     
-- insertions for Symptom
INSERT INTO Symptom (procedureID, symptomDescription) VALUES
	(1, "Dark spot on tooth 2"),
    (2, "Sore teeth, might need root canal."),
    (3, "Cavity in tooth 6."),
    (4, "Weak gums, bleeds when flossing."),
    (5, "Implant faulty, need supervision.");

-- insertions for Medication
INSERT INTO Medication VALUES
     (1, "Local Anesthesia"),
     (2, "General Anesthesia"),
     (3, "Nitrous Oxide"),
     (4, "Intravenous Sedation"),
     (5, "Chlorhexidine");

