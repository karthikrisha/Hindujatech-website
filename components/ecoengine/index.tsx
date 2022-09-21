import React, { useEffect, useState } from 'react';
import styles from "./style.module.scss";

export default function ecoengine() {
    let rangeValue = 0;
    let hibernateModeValue = false;

    if (typeof (Storage) !== "undefined") {
        rangeValue = localStorage.getItem('rangeValue') ? parseFloat(localStorage.getItem('rangeValue')) : 0;
        //@ts-ignore
        hibernateModeValue = localStorage.getItem('hibernateModeValue') == true ? true : false;
    }

    const [block, setBlock] = useState('pin');
    const [range, setRange] = useState(rangeValue);
    const [overlayBlock, setOverlayBlock] = useState(rangeValue > 0);
    const [hibernateMode, setHibernateMode] = useState(hibernateModeValue);
    const [hibernateModeStart, setHibernateModeStart] = useState(false);

    const [signoutTime, setSignoutTime] = useState(5 * 60 * 1000);

    let logoutTimeout;
    const logout = () => {
        setHibernateModeStart(true)
    }

    const setTimeouts = () => {
        logoutTimeout = setTimeout(logout, signoutTime);
    };

    const clearTimeouts = () => {
        setHibernateModeStart(false)
        if (logoutTimeout) clearTimeout(logoutTimeout);
    };

    useEffect(() => {
        //@ts-ignore
        localStorage.setItem('rangeValue', range)
        setOverlayBlock(range > 0)
        //@ts-ignore
        localStorage.setItem('hibernateModeValue', hibernateMode)

        if (hibernateMode) {
            const events = [
                'load',
                'mousemove',
                'mousedown',
                'click',
                'scroll',
                'keypress'
            ];

            const resetTimeout = () => {
                clearTimeouts();
                setTimeouts();
            };

            for (let i in events) {
                window.addEventListener(events[i], resetTimeout);
            }

            setTimeouts();
            return () => {
                for (let i in events) {
                    window.removeEventListener(events[i], resetTimeout);
                    clearTimeouts();
                }
            }
        }
        else {
            clearTimeouts();
        }
    }, [hibernateMode, range]);

    return (
        <div className={styles.ecoengine}>
            <div className={`${styles.overlayEco}`} style={{ opacity: `${range}` }}></div>
            {hibernateModeStart && <div className={`${styles.overlayBlackEco}`}></div>}

            {block === 'pin' && <div className={`${styles.sdwd1} ${styles.fxcss}`}>
                {/* <div className={styles.esIcon} onClick={() => setBlock('pop')}>
                    <img src="../img/ESave_Icon.svg" alt='' />
                </div>
                <div className={styles.esDes}>Let us show the Nature we care by reducing the Carbon Footprint while also being kind to our eyes!</div> */}
                <div className={styles.ecoenginebar} onClick={() => setBlock('pop')}>
                    <div className={styles.iconWrap}>
                        <div className={`${styles.ecoicons} ${styles.ecoicon4}`}>
                            <i className='icon-noun-night-1'></i>
                            <div className={styles.message}>
                                <div className={styles.messagein}>
                                    <h4>Dark Mode</h4>
                                    <p>Like a lightning in the dark sky, our website shines bright even on a dark night.</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.ecoicons} ${styles.ecoicon5}`}>
                            <i className='icon-Brightness'></i>
                            <div className={styles.message}>
                                <div className={styles.messagein}>
                                    <h4>Brightness Control</h4>
                                    <p>Bright or Dark, the control is yours, Listen to your eyes, for it tires a lot.</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.ecoicons} ${styles.ecoicon3}`}>
                            <i className='icon-Hibernate'></i>
                            <div className={styles.message}>
                                <div className={styles.messagein}>
                                    <h4>Hibernate Mode</h4>
                                    <p>Worry not of the energy consumed, when the Polar Bear mode is all for you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ecobutton}></div>
                </div>
            </div>}


            {block === 'pop' && <div className={styles.ecoengineBox}>
                <figure><img src="/static/eco/bg.jpg" alt="" /></figure>
                <div className={styles.scrollPage}>
                    <div className={styles.wrap}>
                        <div className={styles.content}>
                            <i className="icon-close-2" onClick={() => setBlock('pin')}></i>
                            <h3 className="title">E-Save</h3>
                            <p>Let us show the Nature we care by reducing the Carbon Footprint while also being kind to our eyes! </p>
                            <h4 className={styles.pt2}>We have done our part</h4>
                            <div className={styles.box}>
                                <p className={styles.icon}><img src="/static/eco/noun-night-1.svg" alt="" /> <span>Dark Mode</span>
                                    Like a lightning in the dark sky,<br />our website shines bright even on a dark night.</p>
                            </div>
                            <h4 className={styles.pt3}>Now it is your turn</h4>
                            <div className={styles.box}>
                                <p className={styles.icon}><img src="/static/eco/Brightness.svg" alt="" /> <span>Brightness Control</span>
                                    Bright or Dark, the control is yours,<br />Listen to your eyes, for it tires a lot.</p>
                                <div className={styles.rangeslider}>
                                    <img src="/static/eco/Brightness-2.svg" alt="" /><input className={styles.rangesliderrange} type="range" value={range} onChange={(e) => setRange(parseFloat(e.target.value))} max="0.8" min="0" step="0.08" /><img src="/static/eco/noun-night-2.svg" alt="" />
                                </div>

                                <p className={styles.icon}><img src="/static/eco/Hibernate.svg" alt="" /><span>Hibernate Mode</span>
                                    Worry not of the energy consumed,<br />when the Polar Bear mode is all for you.</p>
                                <div className={styles.checkenergy}>
                                    <input id="chkHibMod" type="checkbox" checked={hibernateMode} onChange={() => setHibernateMode(!hibernateMode)} />
                                    <div className={styles.slide}><span>ON</span><span>OFF</span><label htmlFor="chkHibMod"></label></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    );
}
