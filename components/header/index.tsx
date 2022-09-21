import React, { useEffect, useRef, useState } from "react";
import { pluck, sortBy, prop } from 'ramda';
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";
import Router from 'next/router';
import VoiceSearch from "./voiceSearch";
import axios from "axios";
import { toastService } from "@lib/toast.service";
import { isMobile } from "react-device-detect";
import { textAbstract } from "@lib/helpers";

const Menu = ({ closeMenu, items, parentPath = '', pathArray = [], childMenus = [], showSubMenu = false }) => {
    const menu = useRef();
    const childMenuIds = pluck('id', childMenus);
    const [mmclick, setMmclick] = useState(null);
    const [mFlag, setMflag] = useState(true);
    const sortByPosition = sortBy(prop('position'));
    const orderItems = items ? sortByPosition(items) : [];

    const mmclickFn = (e) => {
        closeMenu()
        setMmclick(mmclick === e ? null : e);
    }

    useEffect(() => {
        if (showSubMenu) setMmclick(null)
    }, [showSubMenu])

    return (
        <>
            {orderItems?.map((item, index) =>
                (item.children?.length > 0) ? (
                    <li key={item.slug}>
                        <span className={mmclick === index ? styles.show : ''}>
                            {item.id === 4
                                ? <a className={pathArray.includes(item.slug) ? styles.active : null}>
                                    <span>{item.title}</span>
                                </a>
                                : <Link href={'/' + item.slug}>
                                    <a className={pathArray.includes(item.slug) ? styles.active : null}>{item.title}</a>
                                </Link>
                            }
                            <i onClick={() => mmclickFn(index)}></i>
                        </span>
                        <div className={`${styles.mOver} ${item.children?.length > 4 ? styles.large : styles.medium}`}>
                            <div className={styles.moWrap}>
                                <ul>
                                    <Menu
                                        closeMenu={closeMenu}
                                        parentPath={item.slug}
                                        items={item.children}
                                        pathArray={pathArray.slice(1)}
                                        childMenus={childMenus}
                                    />
                                </ul>
                            </div>
                        </div>
                    </li>
                ) : (
                    (childMenuIds.includes(item.id) ? <li key={item.slug}>
                        <a><span>{item.title}</span></a>
                        <ul>
                            <Menu
                                closeMenu={closeMenu}
                                parentPath={item.slug}
                                items={childMenus[0].children}
                                pathArray={pathArray.slice(1)}
                            />
                        </ul>
                    </li> : <li key={item.slug}>
                        <Link href={(parentPath ? `/${parentPath}/` : '/') + item.slug}>
                            <a className={pathArray.includes(item.slug) ? styles.active : null}>
                                <span>{item.title}</span>
                            </a>
                        </Link>
                    </li>)
                )
            )}
        </>
    );
};

export default function Header({ menuItems, hamburgermenu, searchKeywords, activeLink, pageData }) {
    const [scroll, setScroll] = useState(null);
    const [hmNav, setHmNav] = useState(false);
    const [search, setSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [dlang, setDlang] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(0);
    const [leftBar, setLeftBar] = useState([]);
    const headerMenu = menuItems?.filter(menu => menu.showInHeader && (!menu.parent));
    const childMenus = menuItems?.filter(menu => menu.showInHeader && (menu.parent && menu.children?.length > 0));
    const hamMenu = hamburgermenu?.mainmenu?.map(mmenu => {
        const { page: { title, slug, id } } = mmenu;
        let submenu = [];
        if (mmenu?.submenu?.length > 0) {
            const pages = mmenu?.submenu[0]?.pages;
            pages?.forEach(page => {
                submenu.push({ title: page.title, slug: page.slug })
            });
        }
        return { title, slug, id, submenu }
    });

    Router.events.on('routeChangeStart', () => {
        setSearch(false), setHmNav(false), setDlang(false);
    });

    const scrollWin = () => {
        window.scrollY > 10 ? setScroll(true) : setScroll(false);

        if (!isMobile) setHmNav(false);

        if (leftBar?.length > 0) {
            leftBar.forEach(b => {
                if (document.getElementById(b?.section) && isVisible(document.getElementById(b?.section))) {
                    if (document.getElementById(b?.section)?.classList) {
                        document.getElementById(b?.section).classList.add("active");
                        document.getElementById('lbm_' + b?.section).classList.add("active");
                    } else {
                        document.getElementById(b?.section).className = "active";
                        document.getElementById('lbm_' + b?.section).className = "mystyle";
                    }
                } else {
                    if( document.getElementById(b?.section)) {
                        if (document.getElementById(b?.section)?.classList) {
                            document.getElementById(b?.section).classList.remove("active");
                            document.getElementById('lbm_' + b?.section).classList.remove("active");
                        } else {
                            document.getElementById(b?.section).className = "";
                            document.getElementById('lbm_' + b?.section).className = "";
                        }
                    }
                }
            })
        }
    };

    const isVisible = (ele) => {
        const { top, bottom } = ele.getBoundingClientRect();
        const vHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (
            (top > 0 || bottom > 0) && top < (vHeight / 3) && bottom > (vHeight / 3)
        );
    }

    const langFn = (e) => {
        if (e) {
            setDlang(false);
        } else {
            setDlang(true);
        }
    }

    const wrapperRef = useRef(null);
    const wrapperLangRef = useRef(null);
    const wrapperSearchRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setHmNav(false);
            }
            if (wrapperLangRef.current && !wrapperLangRef.current.contains(event.target)) {
                setDlang(false);
            }
            if (wrapperSearchRef.current && !wrapperSearchRef.current.contains(event.target)) {
                setSearch(false);
            }
        }

        if ([2, 3].includes(pageData?.metadata?.id) || [2, 3].includes(pageData?.parent?.id)) {
            getLeftScrollMenu();
        } else {
            setLeftBar([]);
        }

        window.addEventListener("scroll", scrollWin);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", scrollWin);
        };

    }, [pageData?.id, pageData?.parent?.id, scroll]);

    const submitSearch = (e) => {
        e.preventDefault();

        if (!keyword) {
            toastService.error('Enter search value');
            return;
        }
        Router.push(`/search?keyword=${keyword}`);
    }

    const getLeftScrollMenu = async () => {
        const { content } = pageData;
        let items = [];
        await content.map((item, idx) => {
            const componentName = item.__component.split('.').pop();
            const key = item.title + item.id + idx || idx;
            if (item?.title || item?.boxtitle) {
                items.push({
                    component: componentName,
                    id: item.id,
                    title: item?.title || item?.boxtitle || `section ${item.id}`,
                    section: `${componentName}_${item.id}`
                })
            }
        });

        setLeftBar(items);
    }

    const scrollerFunc = (e, element) => {
        e.preventDefault();
        var scrollDiv = document.getElementById(element).offsetTop;
        window.scrollTo({ top: scrollDiv - 100, behavior: 'smooth' });
    }

    return (
        <>
            {leftBar?.length > 0 && <div className={styles.scrollTonav}>
                {leftBar?.map((bar) => (
                    <a id={`lbm_${bar?.section}`} key={bar?.section + bar?.id} href="" onClick={(e) => scrollerFunc(e, bar?.section)}>
                        <span><ReactMarkdown skipHtml={true}>{textAbstract(bar?.title, 40)}</ReactMarkdown></span>
                    </a>
                ))}
            </div>}
            <header className={`${styles.header} ${scroll ? styles.fixed : ""}`}>
                <div className="container">
                    <div className={styles.desktop}>
                        <Link href="/">
                            <a className={styles.logo}>
                                <img src="/img/logo.png" alt="logo" />
                            </a>
                        </Link>
                        <div className={styles.right}>
                            <ul className={styles.link}>
                                <Menu
                                    closeMenu={() => setShowSubmenu(null)}
                                    items={headerMenu}
                                    childMenus={childMenus}
                                    pathArray={[]}
                                    showSubMenu={!!showSubmenu}
                                />
                            </ul>
                            <div className={styles.serach} ref={wrapperSearchRef}>
                                <em
                                    title="Search"
                                    onClick={() => {
                                        setSearch(!search), setHmNav(false), setDlang(false);
                                    }}
                                >
                                    <img src="/static/search.svg" alt="search"/>
                                </em>
                                {search && (
                                    <div className={styles.searchBar}>
                                        <div
                                            className={styles.close}
                                            onClick={() => setSearch(false)}
                                        >
                                            <i className="icon-close-2" title="Search"></i>
                                        </div>
                                        <form>
                                            <div className={styles.field}>
                                                <input
                                                    type="text"
                                                    className={styles.input}
                                                    placeholder="Search"
                                                    value={keyword}
                                                    onChange={e => setKeyword(e.target.value)}
                                                />
                                                <div className={styles.action}>
                                                    <button onClick={submitSearch} className={styles.button}>
                                                        <i className="icon-search"></i>
                                                    </button>
                                                    <div className={styles.mic}>
                                                        <VoiceSearch keyword={setKeyword} />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        {searchKeywords?.keywords?.length > 0 && <div className={styles.trending}>
                                            <label>Suggestions </label>
                                            {searchKeywords?.keywords?.map((keword) => <Link href={`/search?keyword=${keword?.keyword}`} key={'sk' + keword?.id}>
                                                <a>{keword?.keyword}</a>
                                            </Link>)}
                                        </div>}
                                    </div>
                                )}
                            </div>
                            <div className={styles.lang} ref={wrapperLangRef}>
                                <em className="icon-earth" title="Language" onClick={() => { setDlang(!dlang), setHmNav(false), setSearch(false); }}></em>
                                <div className={`${styles.mOver}`} style={{ display: `${dlang ? 'block' : 'none'}` }}>
                                    <div className={styles.moWrap}>
                                        <a href="#" className="flag_link eng" data-lang="en" title="English"><img src="/img/flag/flag-400.png" /></a>
                                        <a href="#" className="flag_link taj" data-lang="fr" title="French"><img src="/img/flag/flag-400 (1).png" /></a>
                                        <a href="#" className="flag_link ger" data-lang="de" title="German"><img src="/img/flag/flag-400 (2).png" /></a>
                                        <a href="#" className="flag_link jap" data-lang="ja" title="Japanese"><img src="/img/flag/flag-400 (3).png" /></a>
                                        <a href="#" className="flag_link swe" data-lang="sv" title="Swedish"><img src="/img/flag/sweden-flag-icon.png" /></a>
                                        <a href="#" className="flag_link spa" data-lang="es" title="Spanish"><img src="/img/flag/flag-400 (4).png" /></a>
                                    </div>
                                </div>
                            </div>
                            <a href="/sitemap" className={styles.siteMap}>Sitemap</a>
                            <div className={styles.extramenu} ref={wrapperRef}>
                                <em onClick={() => { setHmNav(!hmNav), setSearch(false), setDlang(false); }} title="menu">
                                    <img src="/static/menu.svg" alt="menu"/>
                                </em>
                                {hmNav && (
                                    <div className={styles.hmMenu}>
                                        <div className={styles.close} onClick={() => setHmNav(false)}>
                                            Close <i className="icon-close-2"></i>
                                        </div>
                                        <div className={styles.hmWrap}>
                                            <img src="/img/logo.png" alt="" />
                                            <div className={styles.scrollMenu}>
                                                <ul className={styles.hmLink}>
                                                    {hamMenu?.map(menu => (<li key={`hmenu${menu.id}`}>
                                                        {menu.slug === 'careers'
                                                            ? <a className={styles.active} onClick={() => setShowSubmenu(showSubmenu === menu.id ? '' : menu.id)}><span>{menu.title}</span></a>
                                                            : <Link href={`/${menu.slug}`}>
                                                                <a className={styles.active}><span>{menu.title}</span></a>
                                                            </Link>
                                                        }
                                                        {menu?.submenu?.length > 0 && <i className={showSubmenu === menu.id ? styles.show : ''} onClick={() => setShowSubmenu(showSubmenu === menu.id ? '' : menu.id)}></i>}
                                                        {menu?.submenu?.length > 0 && <ul className={`${styles.linkSub}`}>
                                                            {menu?.submenu?.map(smenu => (<li key={`hmenu${smenu.slug}`}>
                                                                <Link href={`/${smenu.slug}`}>
                                                                    <a className={styles.active}><span>- {smenu.title}</span></a>
                                                                </Link>
                                                            </li>))}
                                                        </ul>}
                                                    </li>))}
                                                </ul>
                                                <ul className={styles.link2}>
                                                    <Menu
                                                        closeMenu={() => setShowSubmenu(null)}
                                                        items={headerMenu}
                                                        childMenus={childMenus}
                                                        pathArray={[]}
                                                        showSubMenu={!!showSubmenu}
                                                    />
                                                </ul>
                                                <div className={styles.share}>
                                                    {hamburgermenu?.socialicons?.map(icon => (<a href={icon.link} key={`hmenusi${icon.id}`} target="_blank" className={`icon-${icon.icon}`}></a>))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
