import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} src={assets.menu_icons} className='menu' alt="menu icon" />
                <div onClick={newChat} className="new-chat">
                    <img src={assets.message_icons} alt="plus icon" />
                    {extended ? <p>Yeni Sohbet</p> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Geçmiş sohbet</p>
                        {prevPrompts.map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                <img src={assets.chat_icon} alt="message icon" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icons} alt="question icon" />
                    {extended ? <p>yardım?</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icons} alt="history icon" />
                    {extended ? <p>yeteneklerim</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icons} alt="settings icon" />
                    {extended ? <p>Ayarlar</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
