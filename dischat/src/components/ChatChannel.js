import React, { useCallback, useEffect, useState, useMemo } from "react";
import Proptypes from "prop-types";

let ChannelMenu = React.memo(props => {
  let [isOpen,setIsOpen] = useState(true);

  return (
    <React.Fragment>
      <li className="channel_item">
        <span className="chanel_item__name text-muted display-5" onClick={()=>setIsOpen(!isOpen)}>
          {" "}
          <i className="fas fa-caret-down chat_channel__top_menu__dropdown"/>{" "}
          {props.channelMenuName}{" "}
        </span>
        {isOpen && 
        ( <ul className="chanel_item__items">
          {props.channels.map((channel,indx) => {
            return (
              <li
                key={indx}
                className="chanel_item__items__item"
                onClick={() => props.onClick(channel)}
              >
              <div className="row justify-content-between no-gutters">
                <span className="chanel_item__items__item__channel_name">
                  <span>#</span>
                  {channel.name}
                </span>
                {channel.unreadMessages > 0 && (
                  <span className="chanel_item__items__item__unread_messages badge badge-danger text-center mr-3">
                    {channel.unreadMessages}
                  </span>
                )}
              </div>
              </li>
            );
          })}
        </ul> ) }
        <style jsx>
          {`
            .channel_item {
              background: #2a3036;
              text-align: left;
              padding: 0rem 0.4rem;
              font-size: 1rem;
            }
            .chanel_item__items__item__channel_name > span {
              color: lightgrey !important;
              font-size: 1.7rem !important;
              padding: 0.4rem;
            }
            .channel_item:not(:first-of-type) {
              margin-top: 1rem;
            }
            .chanel_item__name {
              font-weight: bold;
              font-size: 1.4rem;
            }
            .chanel_item__name::selection,.chanel_item__items::selection,.chanel_item__items > *::selection{
              background-color:transparent;
            }
            .chanel_item__name:hover{
              cursor:pointer;
            }
            .chanel_item__items__item {
              padding: 0.4rem 0.1rem;
            }
            .chanel_item__items__item:hover {
              cursor: pointer;
              background:#363537;
            }
            .chanel_item__items__item__channel_name {
              font-weight: 900;
              font-size: 1.5rem;
            }
            .chanel_item__items__item__unread_messages {
              text-indent: 0rem;
              font-size:1rem;
              line-height:2.3rem;
              padding:0rem 0.8rem;
              border-radius:5px;
            }
            .channel_item ul {
              text-indent: 0.4rem;
            }
            .channel_item ul > li {
              color: #fff;
              text-align: left;
            }
            .channel_item > span {
              text-align: center;
              color: orange;
              text-transform: uppercase;
            }
          `}
        </style>
      </li>
    </React.Fragment>
  );
});

const ChatChannel = props => {
  let [currentlySelectedChannel, setCurrentlySelectedChannel] = useState(0);

  useEffect(() => {
    props.onChannelItemClicked(props.channels[0]);
  }, []);

  let channelCategories = useMemo(
    () => {
      return props.channels.reduce((obj, channel) => {
        let { category } = channel;
        obj[category] = obj[category] || [];
        obj[category].push(channel);
        return obj;
      }, {});
    },
    [props.channels]
  );

  return (
    <React.Fragment>
      <div className="chat_channel">
        <div className="chat_channel__top_menu">
          <span className="chat_channel__top_menu__title text-white">
            Reactiflux
          </span>
          <i className="fas fa-caret-down chat_channel__top_menu__dropdown" />
        </div>
        <ul className="chat_channel__menus">
          {Object.keys(channelCategories).map((channelName, indx) => {
            return (
              <ChannelMenu
                className={indx === currentlySelectedChannel ? "active" : null}
                channelMenuName={channelName}
                channels={channelCategories[channelName]}
                key={indx}
                onClick={props.onChannelItemClicked}
              />
            );
          })}
        </ul>
        <style jsx>
          {`
            .chat_channel {
              display: flex;
              flex-direction: column;
              height: 100%;
              max-height: 100%;
              overflow-x:hidden;
              width:100%;
            }
            .chat_channel::-webkit-scrollbar {
                width: 0 !important;
                display:none;
            }
            .chat_channel__top_menu {
              flex: 0 0 50px;
              background: #24292e;
              display: flex;
              align-items: center;
              padding: 0rem 1rem;
              justify-content: space-between;
              position: sticky;
              top: 0px;
            }
            .chat_channel__top_menu__title {
              font-wieght: 900;
              font-size: 2rem;
            }
            .chat_channel__top_menu__dropdown {
              display: block;
              color: #fff;
              font-size: 1.5rem;
            }
            .chat_channel__menus {
              background: #2a3036;
              height: 100%;
              padding-top: 2rem;
              flex: 1;
            }
          `}
        </style>
      </div>
    </React.Fragment>
  );
};

let channelShape = Proptypes.shape({
  id: Proptypes.number.isRequired,
  name: Proptypes.string.isRequired,
  unreadMessages: Proptypes.number
});

ChatChannel.propTypes = {
  onChannelItemClicked: Proptypes.func.isRequired,
  channels: Proptypes.arrayOf(channelShape).isRequired
};

ChannelMenu.proptypes = {
  onClick: Proptypes.func.isRequired,
  channel: Proptypes.shape(channelShape).isRequired
};

export default ChatChannel;
