import React from "react";

export default props => {
  return (
    <ul className="server_sidebar">
      <li>
        <img src="https://vignette.wikia.nocookie.net/logopedia/images/d/dd/Discord_Icon.svg/revision/latest?cb=20180110223234" />
      </li>
      <li>
        <img src="https://vignette.wikia.nocookie.net/logopedia/images/d/dd/Discord_Icon.svg/revision/latest?cb=20180110223234" />
      </li>
      <li>
        <img src="https://vignette.wikia.nocookie.net/logopedia/images/d/dd/Discord_Icon.svg/revision/latest?cb=20180110223234" />
      </li>
      <li>
        <img src="https://vignette.wikia.nocookie.net/logopedia/images/d/dd/Discord_Icon.svg/revision/latest?cb=20180110223234" />
      </li>
      <style jsx>
        {`
          .server_sidebar {
            background: black;
            height: 100%;
            padding: 0.3rem;
          }

          .server_sidebar > li {
            height: 80px;
            width: 80px;
            color: #fff;

            margin-top: 0.2rem;
          }
          .server_sidebar > li > img {
            height: 50px;
          }
        `}
      </style>
    </ul>
  );
};
