import React from "react";
import "./Procedures.css";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const Procedures = () => {
	
	const [procedures, setProcedures] = useState([]);
	useEffect(() => {
	
		axios
			.get("http://localhost:8000/feeDescriptions")
			.then((response) => {
				return response.data.queryResults;
			})
            .then((data) => {
				setProcedures(data);
                console.log(data);
			})
			.catch((err) => {
				alert(err);
				console.log(err);
			});
	}, []);

	return (
		<div className='Procedures'>
			<div className='grid'>
				<div className='container'>
					{procedures.length !== 0
						? procedures.map((procedures) => (
								<Card
									style={{ height: "10rem" }}
									className='box'
									key={procedures.feeDesc}>
									<Card.Body>
										<Card.Title>{"Procedure: "}</Card.Title>
										<Card.Text>
											{procedures.feeDesc}
										</Card.Text>
									</Card.Body>
								</Card>
						  ))
						: "Loading"}
				</div>
			</div>
		</div>
	);
};

export default Procedures;
