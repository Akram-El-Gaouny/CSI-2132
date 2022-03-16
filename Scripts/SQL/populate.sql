-- insertions for User

INSERT INTO User VALUES
    (10001, "Jeff", "Mary", "Yi", "yi@gmail.com", "pass12", 13, "Wallace", "Toronto", "Ontario", "employee", '1984-07-15', 37, 516547887),
    (10002, "Tim", "Steve", "Thomas", "thomas@gmail.com", "timsteve", 222, "Robin", "Toronto", "Ontario", "employee", '1980-05-07', 41, 155235968),
    (10003, "Ted", "John", "Oniel", "oniel@gmail.com", "461973458", 15233, "First", "Toronto", "Ontario", "employee", '1967-10-27', 54, 461973458),
    (10004, "Amy", "Todd", "Dahl", "dahl@gmail.com", "againaround", 12, "Queen", "Toronto", "Ontario", "employee", '1976-04-23', 45, 516643785),
    (10005, "Ray", "Matt", "Brown", "brown@gmail.com", "11123ns*", 33, "King", "Ottawa", "Ontario", "employee", '1981-09-15', 40, 991913546),
    (10006, "Pete", "Humble", "Hound", "hound@gmail.com", "kind", 2, "Orleans", "Toronto", "Ontario", "patient", '1943-10-30', 78, 444141256),
    (10007, "Harris", "Jerry", "Jelly", "jelly@gmail.com", "gssds", 222, "Vancouver", "Toronto", "Ontario", "patient", '1943-06-27', 78, 558454625),
    (10008, "Robin", "Mort", "Hang", "hang@gmail.com", "addse33", 1355, "Main", "Toronto", "Ontario", "patient", '1994-06-21', 27, 336352245),
    (10009, "Evan", "Finn", "Bruce", "bruce@gmail.com", "123iiii", 6, "Main", "Toronto", "Ontario", "patient", '1986-08-07', 35, 512158642),
    (10010, "Steve", "John", "Thomas", "thomas@gmail.com", "dentist", 32, "Main", "Toronto", "Ontario", "patient", '2009-05-19', 12, 155223468);

-- insertions for PhoneNumber

INSERT INTO PhoneNumber VALUES 
    (10002, 6138556588),
    (10002, 7745665654),
    (10004, 4224256884);

-- insertions for Patient

INSERT INTO Patient VALUES
    (10006, "Dejardin"),
    (10007, "Gold"),
    (10008, "Waystar"),
    (10009, "Gold"),
    (10010, NULL);

-- insertions for Branch
-- insertions for Review
-- insertions for Employee

INSERT INTO Employee VALUES 
    (10001, 120000, "manager", 2),
    (10002, 150000, "dentist", 2),
    (10003, 80000, "receptionist", 2),
    (10004, 95000, "hygienist", 2),
    (10005, 130000, "manager", 1),

-- insertions for ResponsibleFor

INSERT INTO ResponsibleFor VALUES
    (10010, 10002);

-- insertions for PatientChart
-- insertions for Authored
-- insertions for Invoice
-- insertions for PaymentType
-- insertions for Appointment
-- insertions for FeeCharge
-- insertions for AppointmentProcedure
-- insertions for PatientPayment
-- insertions for InsuranceClaim
-- insertions for Treatment
-- insertions for Symptom
-- insertions for Medication

