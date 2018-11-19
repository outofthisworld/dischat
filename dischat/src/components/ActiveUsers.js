import React from "react";

const ActiveUsers = props => {
  return (
    <div className="active_users">
      <div className="top_menu">
        <div className="top_menu__row align-items-center justify-content-between row no-gutters h-100">
          <div className="col-8 top_menu__row__search">
            <input
              type="text"
              className="top_menu__row__search__input"
              placeholder="Search"
            />
          </div>
          <div className="col-3 top_menu__row__links">
            <ul className="top_menu__row__links__menu">
              <li className="top_menu__row__links__menu__item list-inline-item">
                <i className="fas fa-at" />
              </li>
              <li className="top_menu__row__links__menu__item list-inline-item">
                <i className="fas fa-question" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul className="active_users__items">
        <li>
          <span className="title text-muted">Admin - 3</span>
          <ul className="active_users__items__sub__items">
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
          </ul>
        </li>
        <li>
          <span className="title text-muted">Moderator - 3</span>
          <ul className="active_users__items__sub__items">
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
          </ul>
        </li>
        <li>
          <span className="title text-muted">MVP - 3</span>
          <ul className="active_users__items__sub__items">
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
          </ul>
        </li>
        <li>
          <span className="title text-muted">Facebook - 1</span>
          <ul className="active_users__items__sub__items">
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
          </ul>
        </li>
        <li>
          <span className="title text-muted">Discord - 5</span>
          <ul className="active_users__items__sub__items">
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
            <li className="active_users__items__sub__items__item">
              <img src="./images/user.png" />
              <span className="active_users__items__sub__items__item__user">
                Dale
              </span>
            </li>
          </ul>
        </li>
      </ul>
      <style jsx>
        {`
        .active_users__items{
            height:100%
            min-height:100%;
            overflow:auto;
        }
          .active_users__items__sub__items__item {
            padding: 0.5rem 1.5rem;
          }
          .active_users__items__sub__items__item > img {
            max-height: 30px;
            margin-right: 0.4rem;
          }

          .top_menu__row__search__input{
              outline:0;
              border:0;
              font-size:1.4rem;
              padding:0.3rem;
              width:100%;
              background: #484749;
              color:#fff;
              height:100%:
              border-radius:1rem;
          }
           .top_menu__row__search__input::after{
               content:'\f002';
               font-family: "Font Awesome\ 5 Free";
               font-size:1.2rem;
               position:absolute;
               right:0px;
               color:#fff;
               font-weight: 900;
           }
          .top_menu__row__search__input::placeholder{
              color:lightgrey;
              font-weight:900;
              text-indent:5px;
          }
          .top_menu__row__links__menu__item i{
              font-size:1.6rem;
          }

          .active_users__items__sub__items__item__user {
            font-weight: 900;
            font-size: 1.4rem;
          }

          .active_users {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .top_menu {
            flex: 0 0 30px;
            background: #2D2C2E;
            max-height:50px;
            padding:0rem 0.4rem;
          }
          ul {
            background: #2a3036;
            flex: 1 0;
            text-align: center;
            padding: 2rem 0.4rem;
            text-align: left;
          }
          ul > li > ul {
            padding: 0;
            margin: 0;
          }
          ul > li > .title {
            font-size: 1.3rem;
            font-weight: 700;
            padding: 0rem 1.5rem;
            text-transform: uppercase;
          }
          ul > li {
            font-size: 1.2rem;
            color: lightgrey;
          }
        `}
      </style>
    </div>
  );
};

export default ActiveUsers;
