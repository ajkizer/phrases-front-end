import React from 'react'

const AddExperience = () => {
 
    const AddExperience = async () => {
        const [show, setShow] = useState(false);
        const [formData, setFormData] = useState({
            nativeLanguage: "",
            targetLanguage: ""
        })



        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const { nativeLanguage, targetLanguage } = formData;





        const createExperience = async (e) => {
            e.preventDefault();
            try {
                const res = await axios.post(`${devMain}/experiences`, formData)
                setExperiences([...experiences, res.data.data])
                handleClose();
            } catch (error) {
                console.log(error);
            }
        }




        const changeHandler = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }

        return (
            <div className="experiences__add-experiencew">
                <Button onClick={handleShow}>Add Experience</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={createExperience}>
                            <Form.Group><Form.Label>Native Language</Form.Label><Form.Control onChange={changeHandler} value={nativeLanguage} name="nativeLanguage" type="text" placeholder="" /></Form.Group>
                            <Form.Group><Form.Label>Target Language</Form.Label><Form.Control value={targetLanguage} onChange={changeHandler} name="targetLanguage" type="text" placeholder="" /></Form.Group>
                            <Button type="submit">Submit</Button>
                        </Form>

                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}

export default AddExperience
