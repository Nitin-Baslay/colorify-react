import { ChromePicker } from "react-color";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
  let history = useHistory();
  const [color, setColor] = useState("#fff");
  const [getColor, setGetColor] = useState([]);
  let Id = localStorage.getItem("userid");
  const colorChangeHandler = (event) => {
    setColor(event.hex);
  };
  const addColorHandler = () => {
    let colorObj = {
      color: color,
    };
    axios.post(
      `https://colorify-nitin-default-rtdb.firebaseio.com/name/${Id}.json`,
      colorObj
    );
  };
  axios
    .get(`https://colorify-nitin-default-rtdb.firebaseio.com/name/${Id}.json`)
    .then((response) => {
      let Colors = [];
      for (let key in response.data) {
        let objColor = {
          color: response.data[key].color,
          key: key,
        };
        Colors.push(objColor);
      }
      setGetColor(Colors);
    })
    .catch((error) => {
      console.log(error);
    });
  const editHandler = (key) => {
    let updatedcolorObj = {
      color: color,
    };
    axios.put(
      `https://colorify-nitin-default-rtdb.firebaseio.com/name/${Id}/${key}.json`,
      updatedcolorObj
    );
  };
  const deleteHandler = (key) => {
    axios.delete(
      `https://colorify-nitin-default-rtdb.firebaseio.com/name/${Id}/${key}.json`
    );
  };
  const logoutHandler = () => {
    history.replace("/");
  };
  return (
    <div>
      <h1 className="head">Welcome User</h1>
      <button className="logout" onClick={logoutHandler}>
        Logout
      </button>
      <div className="main">
        <div className="colorMaster">
          {getColor.map((ele) => {
            return (
              <div key={ele.key}>
                <div
                  style={{ background: `${ele.color}` }}
                  className="colorbox"
                >
                  <button
                    className="bttns"
                    onClick={() => {
                      editHandler(ele.key);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bttns"
                    onClick={() => {
                      deleteHandler(ele.key);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <ChromePicker
          color={color}
          onChange={colorChangeHandler}
          className="colorPicker"
        />
        <button onClick={addColorHandler} className="addbttn">
          Add Color
        </button>
      </div>
    </div>
  );
};
export default Home;
