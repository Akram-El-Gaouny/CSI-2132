import React from "react";
import "./Box.css";
import { Card } from "react-bootstrap";

const branches = () => {
  const cardInfo = [
    {
      title: "Branch 1",
      address: "123 Address",
    },
    {
      title: "Branch 2",
      address: "456 Address",
    },
    {
        title: "Branch 3",
        address: "789 Address",
    },
    {
        title: "Branch 4",
        address: "101 Address",
    },
   
  ];

  const renderCard = (card, index) => {
    return (
        <div className="container">
        <a href="/CSI-2132/homepage">
      <Card style={{ height: "10rem" }} key={index} className="box">
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.address}</Card.Text>
        </Card.Body>
      </Card>
      </a>
      </div>
    );
  };

  return <div className="grid">{cardInfo.map(renderCard)}</div>;
};

export default branches;