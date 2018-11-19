import React, { useEffect, useState, useRef, useMemo } from "react";
import io from "socket.io-client";

const ChatBoxMessage = props => {
  return (
    <li className="chat_box_message">
      <div className="row chat_box_message__contents">
        <div className="chat_box_message__contents__user_image">
          <img src="./images/user.png" />
        </div>
        <div className="chat_box_message__contents__contents flex-fill">
          <span className="chat_box_message__contents__contents__user">
            {" "}
            {props.message.user}
          </span>
          <span className="chat_box_message__contents__contents__date text-muted">
            {" "}
            {props.message.time}
          </span>
          <p className="chat_box_message__contents__contents__text">
            {props.message.message}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .chat_box_message {
            border-bottom: 2px solid #373e45;
            color: #fff;
            padding: 2rem 1rem;
            margin-top: 0.2rem;
            text-align: left;
          }
          .chat_box_message__contents {
            padding: 0.4rem;
          }
          .chat_box_message__contents__user_image {
            flex: 0 0 50px;
            height: 50px;
            overflow: hidden;
          }
          .chat_box_message__contents__user_image > img {
            width: 100%;
            height: 100%;
          }
          .chat_box_message__contents__contents {
            padding: 0rem 1rem;
          }
          .chat_box_message__contents__contents__text {
            font-size: 1.5rem;
          }
          .chat_box_message__contents__contents__date {
            font-size: 1.2rem;
          }
          .chat_box_message__contents__contents__user {
            font-size: 1.5rem;
            padding-right: 1rem;
          }
        `}
      </style>
    </li>
  );
};

const Dialog = props => {
  return (
    <React.Fragment>
      <div
        className="backdrop"
        onClick={() => {
          props.onClose();
        }}
      />
      <div className="dialog">{props.children}</div>
      <style jsx>
        {`
          .dialog {
            position: absolute;
            width: 50%;
            top: 50%;
            left: 50%;
            height: 300px;
            background: #363537;
            overflow: auto;
            transform: translate(-50%, -50%);
            z-index: 20;
          }
          .backdrop {
            z-index: 5;
            position: absolute;
            width: 100%;
            height: 100%;
            min-height: 100%;
            min-width: 100%;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.4);
          }
        `}
      </style>
    </React.Fragment>
  );
};

const TopMenu = props => {
  let [isThumbtrackOpen, setIsThumbtrackOpen] = useState(false);
  let [isSettingsOpen, setIsSettingsOpen] = useState(false);
  let [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  return (
    <React.Fragment>
      <div className="top_menu">
        <h3 className="top_menu__channel_name text-white">
          # {props.channel && props.channel.name}
        </h3>
        <ul className="top_menu__icons">
          <li className="top_menu__icons__icon list-inline-item muted">
            <i
              className="fas fa-bell"
              onClick={() => {
                console.log("opening notifications");
                setIsNotificationsOpen(!isNotificationsOpen);
              }}
            />
          </li>
          <li className="top_menu__icons__icon list-inline-item muted">
            <i
              className="fas fa-thumbtack"
              onClick={() => setIsThumbtrackOpen(!isThumbtrackOpen)}
            />
          </li>
          <li className="top_menu__icons__icon list-inline-item">
            <i
              className="fas fa-user-cog"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            />
          </li>
        </ul>
        <style jsx>
          {`
            .top_menu__icons__icon {
              color: #fff;
            }
            .top_menu__icons__icon i {
              font-size: 1.8rem;
              padding: 0.3rem;
            }
            .top_menu {
              height: 50px;
              background: #2a3036;
              flex: 0 1 50px;
              padding: 0rem 1rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          `}
        </style>
      </div>
      {isNotificationsOpen && (
        <Dialog onClose={() => setIsNotificationsOpen(false)}>
          <p>Notifications</p>
        </Dialog>
      )}
      {isSettingsOpen && (
        <Dialog onClose={() => setIsSettingsOpen(false)}>
          <p>Notifications</p>
        </Dialog>
      )}
      {isThumbtrackOpen && (
        <Dialog onClose={() => setIsThumbtrackOpen(false)}>
          <p>Thumbtrack</p>
        </Dialog>
      )}
    </React.Fragment>
  );
};

const ChatBox = props => {
  let isLoading = props.messages === null ? true : false;
  let [socket, setSocket] = useState(null);
  let [currentSocketChannel, setCurrentSocketChannel] = useState(null);
  let [userMessage, setUserMessage] = useState("Enter message");
  let [chatMessages, setChatMessages] = useState(null);
  let messageBoxRef = useRef();
  let chatboxMessageArea = useRef();
  let [messageRecieved, setMessageRecieved] = useState(false);
  let prevChannel = useRef();
  let [hasClickedOk, setHasClickedOk] = useState(false);

  useEffect(
    () => {
      if (
        !isLoading &&
        (chatMessages === null ||
          (prevChannel.current &&
            prevChannel.current.name !== props.channel.name))
      ) {
        setChatMessages([...props.messages]);
      } else if (chatboxMessageArea.current) {
        chatboxMessageArea.current.scrollTop =
          chatboxMessageArea.current.scrollHeight;
      }
    },
    [
      isLoading,
      chatMessages,
      props.messages,
      props.channel && props.channel.name
    ]
  );

  useEffect(
    () => {
      if (messageRecieved) {
        chatboxMessageArea.current.scrollTop =
          chatboxMessageArea.current.scrollHeight;
        setMessageRecieved(false);
      }
    },
    [messageRecieved]
  );

  useEffect(
    () => {
      if (
        chatMessages &&
        props.channel &&
        props.channel.name &&
        (!!prevChannel.current ||
          prevChannel.current.name !== props.channel.name)
      ) {
        if (
          socket &&
          socket.connected &&
          currentSocketChannel !== props.channel.name
        ) {
          setSocket(null);
          setCurrentSocketChannel(null);
        } else if (socket === null) {
          setSocket(
            io(
              `http://localhost:3100?user=${"guest"}&room=${props.channel.name}`
            )
          );
          setCurrentSocketChannel(props.channel.name);
        } else {
          const newSocket = socket;
          newSocket.on("error", function(err) {});

          newSocket.on("new-message", function(data) {
            setChatMessages([...chatMessages, data]);
            setMessageRecieved(true);
          });

          newSocket.on("user-disconnect", function(data) {
            setChatMessages([...chatMessages], {
              user: "Bot",
              message: "A user has disconnected",
              time: new Date().toISOString()
            });
          });

          newSocket.on("connected", function() {
            console.log("Connected to room ", props.channel.name);
          });

          setSocket(newSocket);
        }
      }
    },
    [props.channel && props.channel.name, socket, chatMessages]
  );

  useEffect(
    () => {
      //Refresh has clicked ok
      setHasClickedOk(false);
    },
    [props.messages, props.channel && props.channel.name]
  );

  useEffect(() => {
    //Track the prev channel..
    prevChannel.current = props.channel;
  });

  return (
    <React.Fragment>
      {isLoading && "loading:"}
      {!isLoading &&
      props.messages.length === 0 &&
      !hasClickedOk && (
        <React.Fragment>
          <div className="channel_no_messages">
            <TopMenu channel={props.channel} />
            <div className="channel_no_messages__content">
              <h1>This channel has no messages, be the first!</h1>
              <hr style={{ background: "#fff" }} />
              <br />
              <h4> Here's some quick tips for using chat:</h4>
              <ul>
                <li>
                  <div className="row no-gutters justify-content-center align-items-center">
                    <div className="col-3">
                      <i className="fas fa-cogs" />
                    </div>
                    <div className="col-9">
                      <p>
                        Change your settings and modify your preferences to
                        choose when you will be notified to chat events.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row no-gutters justify-content-center align-items-center">
                    <div className="col-3">
                      <i className="fas fa-cogs" />
                    </div>
                    <div className="col-9">
                      <p>
                        Change your settings and modify your preferences to
                        choose when you will be notified to chat events.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row no-gutters justify-content-center align-items-center">
                    <div className="col-3">
                      <i className="fas fa-cogs" />
                    </div>
                    <div className="col-9">
                      <p>
                        Change your settings and modify your preferences to
                        choose when you will be notified to chat events.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row no-gutters justify-content-center align-items-center">
                    <div className="col-3">
                      <i className="fas fa-cogs" />
                    </div>
                    <div className="col-9">
                      <p>
                        Change your settings and modify your preferences to
                        choose when you will be notified to chat events.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>

              <button onClick={() => setHasClickedOk(true)}>Ok, got it</button>
            </div>
            <style jsx>
              {`
                .channel_no_messages {
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  background: #3e5c76;
                  text-align: center;
                  color: #fff;
                }
                .channel_no_messages__content {
                  flex: 1 1 auto;
                  padding: 2rem;
                  position: relative;
                }
                ul li {
                  margin-top: 2rem;
                }
                ul li p {
                  font-size: 1.5rem;
                  vertical-align: top;
                  text-align: left;
                }

                ul li i {
                  font-size: 6rem;
                  vertical-align: top;
                  border-right: 2px solid white;
                  padding: 0rem 2rem;
                }
                button {
                  font-size: 1.8rem;
                  padding: 0.6rem 3rem;
                  outline: 0;
                  background: rgba(255, 255, 255, 0.3);
                  color: #fff;
                  min-width: 200px;
                  margin-top: 1rem;
                  border: 0;
                }
                button:hover {
                  transform: scale(1.1, 1.1);
                  cursor: pointer;
                }
              `}
            </style>
          </div>
        </React.Fragment>
      )}
      {!isLoading &&
      props.messages &&
      (props.messages.length > 0 || hasClickedOk) && (
        <React.Fragment>
          <div className="chatbox">
            <TopMenu channel={props.channel} />
            <ul ref={chatboxMessageArea} className="chatbox__message_area">
              {chatMessages &&
                chatMessages.map((message, indx) => {
                  return <ChatBoxMessage key={indx} message={message} />;
                })}
            </ul>
            <div className="chatbox__input_area">
              <div className="chatbox__input_area__row row align-items-center p-2 justify-content-center">
                <div className="flex-auto chatbox__input_area__add">
                  <i className="fas fa-plus-circle" />
                </div>

                <div
                  onBlur={e => {
                    if (e.currentTarget.innerText.length === 0)
                      setUserMessage("Enter message");
                  }}
                  onClick={e => {
                    if (e.currentTarget.innerText === "Enter message")
                      setUserMessage("");
                  }}
                  className="flex-fill chatbox__input_area__message"
                  contentEditable
                  style={{ whiteSpace: "pre" }}
                  ref={messageBoxRef}
                  dangerouslySetInnerHTML={{ __html: userMessage }}
                />
                <div className="flex-auto chatbox__input_area__emoticon">
                  <button
                    onClick={() => {
                      socket.emit("new-message-entered", {
                        message: messageBoxRef.current.innerText
                      });
                      messageBoxRef.current.innerText = "";
                      setUserMessage("");
                    }}
                    style={{
                      height: "100%",
                      display: "block",
                      padding: "0.5rem 2rem",
                      fontSize: "1.5rem",
                      outline: 0,
                      border: 0,
                      color: "lightgrey",
                      textTransform: "uppcase",
                      fontWeight: "900",
                      background: "rgba(255,255,255,0.1)"
                    }}
                  >
                    send
                  </button>
                </div>
              </div>
            </div>

            <style jsx>{`
              .chatbox {
                height: 100%;
                display: flex;
                flex-direction: column;
                background: #424b54;
                width: 100%;
              }
              .muted i {
                color: #6c6c6d;
              }
              .chatbox .chatbox__message_area {
                flex: 1;
                list-style-type: none;
                overflow: auto;
                overflow-x: hidden;
                padding: 0rem 1rem;
              }
              /* chatbox input message area */
              .chatbox .chatbox__input_area {
                background: #373e45;
                flex: 0 0 60px;
                width: 100%;
                padding: 1rem 2rem;
              }

              .chatbox .chatbox__input_area__add {
                border-right: 1px solid #f3f3f3;
                padding: 0rem 0.8rem;
              }
              .chatbox .chatbox__input_area__add i {
                font-size: 1.8rem;
                color: #f3f3f3;
              }
              .chatbox__input_area__row {
                background: #424b54;
              }
              .chatbox__input_area__message {
                text-indent: 1rem;
                outline: 0;
                color: #fff;
                max-height: 50px;
                overflow: auto;
                padding: 0.3rem;
                font-size: 1.4rem;
              }
            `}</style>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChatBox;
