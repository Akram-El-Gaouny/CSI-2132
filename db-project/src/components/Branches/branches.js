import React from "react";
import "./Box.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const Branches = () => {
	const [branches, setBranches] = useState([]);
	const [dentistsPerBranch, setDentists] = useState([]);
	const [doneSearch, setDoneSearch] = useState(false);
	useEffect(() => {
		let tmp = [];
		axios
			.get(`http://localhost:8000/branches`)
			.then((response) => {
				return response.data;
			})
			.then((data) => {
				setBranches(data);

				data.forEach((br) => {
					axios
						.get(
							`http://localhost:8000/dentistsInBranch?branchid=${br.branchID}`
						)
						.then((response) => {
							return response.data.queryResults;
						})
						.then((data) => {
							tmp.push({ branchID: br.branchID, dentists: data });
							setDentists([...tmp]);
						});
				});

				setDoneSearch(true);
			})
			.catch((error) => {
				if (error.message === "Request failed with status code 400") {
					alert("Invalid Uid");
				} else {
					alert(error.message);
				}
			});
	}, []);

	let component = (branch) => {
		 let object = dentistsPerBranch.filter((d) => d.branchID === branch);
console.log(object, object.length === 1);
		 if (object.length === 1) {
			 let a = "Here's a list of doctors: \n"
			 object[0].dentists.forEach((d) => {
				 
				 a += d.first + " " + d.last + "\n"
			 })
			 
			 alert(a)
			 return
		 }

		 alert("No Doctors In this branch")

	};

	return (
		<div className='Branches'>
			<div className='grid'>
				<div className='container'>
					{branches.length !== 0 && dentistsPerBranch.length !== 0
						? branches.map((branch) => (
								<Card
									style={{ height: "10rem" }}
									className='box'
									key={branch.branchID}>
									<Card.Body>
										<Card.Title>{"Branch " + branch.branchID}</Card.Title>
										<Card.Text>
											{branch.houseNumber +
												" " +
												branch.street +
												", " +
												branch.city +
												", " +
												branch.province}
										</Card.Text>
										<Button variant="primary" onClick= {() => component(branch.branchID)}>View Doctors</Button>
										
									</Card.Body>
								</Card>
						  ))
						: "Loading"}
				</div>
			</div>
		</div>
	);
};

export default Branches;
