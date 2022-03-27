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

INSERT INTO PhoneNumber VALUES 
    (2, 6138556588),
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
-- insertions for Review
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
-- insertions for Authored
-- insertions for Invoice
-- insertions for PaymentType
-- insertions for Appointment
-- insertions for FeeCharge
-- insertions for AppointmentProcedure

-- insertions for PatientPayment
INSERT INTO PatientPayment(paymentDate, patientAmount, insuranceAmount, invoiceID, procedureID)
    ("2022-02-17",150,150,null,1),
    ("2022-02-17", 50, 0, null, 2),
    ("2022-02-22",600,0,null,3),
    ("2022-02-23", 300, 275, null, 4),
    ("2022-02-27", 240, 0, null, 5);

-- insertions for InsuranceClaim
INSERT INTO(claimAmount, paymentId)
    (150 , 1),
    (275 , 4);

-- insertions for Treatment
-- insertions for Symptom
-- insertions for Medication

