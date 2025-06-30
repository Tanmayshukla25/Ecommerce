import { useEffect, useState } from "react";
import { GrFormCalendar } from "react-icons/gr";
import Header from "./Header";
function Contact() {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    Phonenumber: "",
    textarea: ""
  });

  const [save, setSavedData] = useState([]);

  function handel(e) {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSavedData([...save, formdata]);
  
    setformdata({
      name: "",
      email: "",
      Phonenumber: "",
      textarea: ""
    });
  }

  useEffect(() => {
    if (save.length > 0) {
      // console.log(save)
      localStorage.setItem("save", JSON.stringify(save));
    }
  }, [save]);

  return (
    <>
       
      <div className="map">
        <div className="setmap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.241553841478!2d75.78974481125746!3d26.864065576578838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3f27d3dad07%3A0xb2641415d32e0c18!2sFull%20Stack%20Learning!5e0!3m2!1sen!2sin!4v1748846291965!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: "2px solid black", borderRadius: "8px" }}
            loading="lazy"
          ></iframe>
        </div>
        <div className="form">
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name"
                  value={formdata.name}
                  onChange={handel}
                />
              </div>

              <label htmlFor="email">Email</label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your E-mail"
                  value={formdata.email}
                  onChange={handel}
                />
              </div>

              <label htmlFor="phonenumber">Phone Number</label>
              <div>
                <input
                  type="text"
                  name="Phonenumber"
                  id="phonenumber"
                  placeholder="Enter Your Number"
                  value={formdata.Phonenumber}
                  onChange={handel}
                />
              </div>

              <div>
                <textarea
                  name="textarea"
                  value={formdata.textarea}
                  onChange={handel}
                  placeholder="Enter Your Text Message"
                  rows={5}
                  cols={5}
                ></textarea>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
