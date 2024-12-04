import React, { useRef, useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
    const {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    } = useContext(Context);

    // Dosya input referansı oluştur
    const fileInputRef = useRef(null);

    // Resme tıklandığında dosya input'unu tetikleyen fonksiyon
    const handleImageClick = () => {
        fileInputRef.current.click(); // Dosya seçici penceresini aç
    };

    // Dosya seçildiğinde tetiklenen fonksiyon
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Seçilen dosya
        console.log('Seçilen dosya:', file); // Dosya bilgilerini konsola yazdır
    };

    const handleSubmit = () => {
        if (input.trim()) {
            onSent(input); // Girilen input değerini gönderiyoruz
            setInput(''); // Input alanını temizliyoruz
        }
    };

    // Enter tuşuna basıldığında metni gönderen fonksiyon
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(); // Enter'a basıldığında metni gönder
        }
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>AI</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {
                    !showResult ? (
                        <>
                            <div className="greet">
                                <p><span>Merhaba Kullanıcı :))</span></p>
                                <p>Günün Nasıl Geçiyor ?</p>
                            </div>

                            <div className="cards">
                                {['Yapay zeka Tanrı modu aktif hizmetinideyim'].map((text, index) => (
                                    <div className="card" key={index}>
                                        <p>{text}</p>
                                        <img
                                            src="https://previews.123rf.com/images/deskcube/deskcube1705/deskcube170500031/78474362-ampul-i%C5%9F%C4%B1k-v%C3%BCcudundaki-fikirler-logo.jpg"
                                            alt="" />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='result'>
                            <div className="result-title">
                                <img src={assets.user_icon} alt="" />
                            </div>
                            <div className='result-data'>
                                <img src={assets.star_icon} alt="" />
                                {loading ? (
                                    <div className="loader"><hr /><hr /><hr /></div>
                                ) : (
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                )}
                            </div>
                        </div>
                    )
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)} // Kullanıcının input'a yazdığı değeri kaydediyoruz
                            value={input} // Input değeri burada gösteriliyor
                            type="text"
                            placeholder='Merhaba Ben Gemini AI Sana Nasıl Yardımcı olabilirim'
                            onKeyDown={handleKeyDown} // Enter tuşuna basıldığında handleKeyDown fonksiyonunu çağır
                        />
                        <div>
                            {/* Galeri ikonu tıklanıldığında dosya seçici açılır */}
                            <img
                                src={assets.gallery_icon}
                                alt="Gallery Icon"
                                onClick={handleImageClick} // Resme tıklandığında dosya inputunu tetikle
                                style={{ cursor: 'pointer' }}
                            />
                            <img src={assets.microphone} alt="" />
                            <img
                                src={assets.submit_icon}
                                onClick={handleSubmit} // Gönder butonu
                                alt="Send"
                            />
                        </div>

                        {/* Gizli dosya input elementi */}
                        <input
                            type="file"
                            ref={fileInputRef} // Dosya input referansı
                            onChange={handleFileChange} // Dosya değiştiğinde
                            style={{ display: 'none' }} // Gizli input
                        />
                    </div>
                    <div className="bottom-info">
                        Nebi Aytiş Tarafından yapılmış google yapay zekası Gemini AI kullanılarak web tabanlı react teknolojisiyle yapılmış bir prototiptir. Proje amaçlıdır &copy; Tüm Hakları Saklıdır
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
