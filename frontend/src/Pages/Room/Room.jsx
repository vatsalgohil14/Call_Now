import React, { useState,useEffect } from "react";
import { useWebRtc } from "../../Hooks/useWebRtc";
import { useParams,useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Room.module.css";

import { getRoom } from "../../http/index"

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients, provideRef, handleMute } = useWebRtc(roomId, user);
  const history = useHistory();
  const [room, setRoom] = useState(null)
  const [isMute,setMute] = useState(true)

  useEffect(() => {
    handleMute(isMute,user.id)

  },[isMute])


  const handleManualLeave = () => {
    history.push("/rooms");
  
  }
    useEffect(() => {
      const fetchRoom = async () => {
        const { data } = await getRoom(roomId);
        setRoom((prev) => data);
      };

      fetchRoom();
    }, [roomId]);
  

    const handleMuteClick = (clietnId) => {
      if(clietnId !== user.id){
        return
      }
      setMute((prev) => !prev)

    };
  return (
    <div>
      <div className="container">
        <button onClick={handleManualLeave}className={styles.goBack}>
          <img className={styles.goBackImg} src="/images/arrow-left.png" alt="arrow-left" />
          <span>All voice rooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          {room && <h2 className={styles.topic}>{room.topic}</h2>}
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img className={styles.palmImg} src="/images/palm.png" alt="palm-icon" />
            </button>
            <button  className={styles.actionBtn}>
              <img  className={styles.winImg}src="/images/win.png" alt="win-icon" />
              <span className={styles.textColor}>Leave quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client) => {
            return (
              <div className={styles.client} key={client.id}>
                <div className={styles.userHead}>
                  <img
                    className={styles.userAvatar}
                    src={client.avatar}
                    alt=""
                  />
                  <audio
                    autoPlay
                    muted={client.muted} ///you added
                    playsInline
                    ref={(instance) => {
                      provideRef(instance, client.id);
                    }}
                  />
                  <button
                    onClick={() => handleMuteClick(client.id)}
                    className={styles.micBtn}
                  >
                    {client.muted ? (
                      <img
                        className={styles.mic}
                        src="/images/mic-mute.png"
                        alt="mic"
                      />
                    ) : (
                      <img
                        className={styles.micImg}
                        src="/images/mic.png"
                        alt="mic"
                      />
                    )}
                  </button>
                </div>
                <h4>{client.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
