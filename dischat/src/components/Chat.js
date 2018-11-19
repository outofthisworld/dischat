import React, { useState, useCallback } from "react";
import ChatChannel from "./ChatChannel";
import ChatBox from "./Chatbox";
import ActiveUsers from "./ActiveUsers";
import ServerSidebar from "./ServerSidebar";

export default props => {
  let [chatChannels, setChatchannels] = useState([
    {
      id: 0,
      name: "welcome",
      unreadMessages: 0,
      category: "General"
    },
    {
      id: 1,
      name: "general",
      unreadMessages: 2,
      category: "General"
    },
    {
      id: 1,
      name: "need-help",
      unreadMessages: 2,
      category: "General"
    },
    {
      id: 1,
      name: "introductions",
      unreadMessages: 2,
      category: "General"
    },
    {
      id: 1,
      name: "news and links",
      unreadMessages: 2,
      category: "General"
    },
    {
      id: 1,
      name: "i made this",
      unreadMessages: 2,
      category: "General"
    },
    {
      id: 1,
      name: "jobs",
      unreadMessages: 2,
      category: "General"
    },
    {
      id: 2,
      name: "q-and-a",
      unreadMessages: 0,
      category: "Community"
    },
    {
      id: 2,
      name: "jobs advice",
      unreadMessages: 0,
      category: "Community"
    },
    {
      id: 2,
      name: "conferences",
      unreadMessages: 0,
      category: "Community"
    },
    {
      id: 2,
      name: "code review",
      unreadMessages: 0,
      category: "Community"
    },
    {
      id: 2,
      name: "random",
      unreadMessages: 0,
      category: "Community"
    },
    {
      id: 2,
      name: "react internals",
      unreadMessages: 0,
      category: "Community"
    },
    {
      id: 2,
      name: "functional programming",
      unreadMessages: 0,
      category: "Community"
    },
    {
      id: 2,
      name: "internationalization",
      unreadMessages: 0,
      category: "Community"
    },
    {
      id: 2,
      name: "accessbility",
      unreadMessages: 0,
      category: "Community"
    },
    {
      id: 2,
      name: "survivejs",
      unreadMessages: 0,
      category: "Community"
    },
    {
      id: 2,
      name: "gaming",
      unreadMessages: 0,
      category: "Community"
    }
  ]);

  let [chatBoxMessages, setChatboxMessages] = useState({
    0: [
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      }
    ],
    1: [
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      },
      {
        user: "Dale",
        time: new Date().toISOString(),
        message: "welcome to chat app"
      }
    ],
    2: []
  });

  let [currentlySelectedChannel, setCurrentlySelectedChannel] = useState(null);
  let onChannelItemClickCb = useCallback(channel => {
    setCurrentlySelectedChannel(channel);
  });

  let onChatboxMessage = useCallback((message, { channelId }) => {
    let newChatboxMessages = { ...chatBoxMessages };
    let channelMessages = chatBoxMessages[channelId];
    let newChannelMessages = [...channelMessages, message];
    newChatboxMessages[channelId] = newChannelMessages;
    setChatboxMessages(channelId);
  });

  return (
    <div className="row no-gutters h-100">
      <div className="server_sidebar flex-auto h-100">
        <ServerSidebar />
      </div>
      <div className="chat_channel col-2 h-100">
        <ChatChannel
          onChannelItemClicked={onChannelItemClickCb}
          channels={chatChannels}
        />
      </div>
      <div className="chat_box h-100">
        <ChatBox
          messages={
            (currentlySelectedChannel &&
              chatBoxMessages[currentlySelectedChannel.id]) ||
            currentlySelectedChannel
          }
          onMessage={onChatboxMessage}
          channel={currentlySelectedChannel}
        />
      </div>
      <div className="active_users col-2 h-100">
        <ActiveUsers />
      </div>

      <style jsx>
        {`
          .chat_box {
            flex: 1;
          }


          @media (max-width: 1000px) {
            .chat_channel {
              display: none;
            }
            .server_sidebar {
              display: none;
            }
            .active_users {
              min-width: 200px;
            }
          }

          @media (max-width: 700px) {
            .active_users {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};
