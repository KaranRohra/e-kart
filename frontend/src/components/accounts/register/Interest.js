import React from "react";
import { FloatingLabel, Form, Badge, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import BaseForm from "../BaseForm";
import { colors } from "../../home/constants";

function Interest() {
    const history = useHistory();
    const [selectedInterests, setSelectedInterests] = React.useState([]);
    const constInterest = [
        // TODO: get from backend
        "Studying",
        "Reading",
        "Watching TV",
        "Watching Movies",
        "Playing Games",
        "Cooking",
        "Singing",
        "Dancing",
        "Photography",
        "Drawing",
        "Painting",
        "Writing",
        "Playing Music",
        "Playing Instruments",
    ];

    const removeInterest = (index) => {
        selectedInterests.splice(index, 1);
        setSelectedInterests([...selectedInterests]);
    };

    const selectInterest = (event) => {
        const interest = event.target.value;
        if (interest !== "Choose...") {
            selectedInterests.push(interest);
            setSelectedInterests([...new Set(selectedInterests)]);
        }
    };

    return (
        <BaseForm hideEmailField hidePasswordField>
            <FloatingLabel label="Select your Interest">
                <Form.Select onChange={selectInterest}>
                    <option>Choose...</option>
                    {constInterest.map((item, index) => (
                        <option key={index}>{item}</option>
                    ))}
                </Form.Select>
            </FloatingLabel>
            <Container className="mt-2 border border-primary" style={{ height: 200 }}>
                {selectedInterests.map((interest, index) => (
                    <Badge pill bg={colors[index % colors.length]} key={index} className="m-1 p-1">
                        {interest}
                        <Icon.XLg
                            onClick={() => removeInterest(index)}
                            className="ms-1"
                            style={{ cursor: "pointer" }}
                        />
                    </Badge>
                ))}
            </Container>
            <div>
                <Button
                    variant="secondary"
                    className="m-2"
                    style={{ width: "45%" }}
                    onClick={() => history.push("/account-details")}
                >
                    Back
                </Button>
                <Button variant="primary" className="m-2" style={{ width: "45%" }} onClick={() => history.push("/")}>
                    Save
                </Button>
            </div>
        </BaseForm>
    );
}

export default Interest;
