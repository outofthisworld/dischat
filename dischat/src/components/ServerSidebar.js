import React from "react";

export default props => {
  return (
    <div className="server_sidebar_container">
      <ul className="server_sidebar">
        <li>
          <img src="https://vignette.wikia.nocookie.net/logopedia/images/d/dd/Discord_Icon.svg/revision/latest?cb=20180110223234" />
        </li>
        <li>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png" />
        </li>
        <li>
          <div>
            <i className="fas fa-plus" />
          </div>
        </li>
        <li>
          <div>
            <i className="fas fa-arrow-down" />
          </div>
          <p>
            Download<br />apps
          </p>
        </li>
      </ul>
      <style jsx>
        {`
          .server_sidebar_container {
            background: black;
            height: 100%;
          }

          .server_sidebar {
            padding-top: 1rem;
            background: black;
          }

          .server_sidebar > li {
            height: 60px;
            width: 80px;
            color: #fff;
            position: relative;
          }
          .server_sidebar > li:first-of-type {
            margin-bottom: 1rem;
          }
          .server_sidebar > li:first-of-type::after {
            content: " ";
            border-bottom: 2px solid lightgrey;
            width: 40px;
            position: absolute;
            bottom: 0px;
            left: 20px;
          }
          .server_sidebar > li > img {
            height: 50px;
          }
          .server_sidebar > li i {
            font-size: 2.3rem;
            position: absolute;
            top: 50%;
            left: 50%;
            color: #484749;
            transform: translate(-50%, -50%);
          }
          .server_sidebar > li > div {
            border: 1px dashed #484749;
            border-radius: 50px;
            position: relative;
            height: 43px;
            width: 43px;
            display: inline-block;
            margin: 0 auto;
            transition: all 0.2s linear;
          }
          .server_sidebar > li > div:hover {
            cursor: pointer;
            transform: scale(1.1, 1.1) rotate(360deg);
          }
          li > p {
            font-size: 0.9rem;
            text-transform: uppercase;
            color: #484749;
            padding: 0.2rem;
            font-weight: 900;
          }
        `}
      </style>
    </div>
  );
};
