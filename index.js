// ==UserScript==
// @name         Поиск по дате в яндекс
// @namespace    http://tampermonkey.net/
// @version      2024-02-11
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/search/*
// @match        https://ya.ru/search/*
// @icon         https://yastatic.net/s3/web4static/_/v2/AppFavicon-Icon_size64_ru.5f7303b2887f57.link.png
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
    'use strict';
  
    function createFilterButton(nameButton) {
      const button = document.createElement('a');
      button.innerText = nameButton;
      button.id = nameButton;
      return button;
    }
  
    function getDate(mlsc) {
      const date = new Date(new Date() - mlsc);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const year = date.getFullYear();
  
      return `${year}${month}${day}`;
    }
  
    function addEventChangeParamsUrl(elem, mlsc) {
      elem.onclick = () => {
        const text = document
          .querySelector(
            'header > form > div.HeaderForm-InputWrapper > div > input'
          )
          .getAttribute('value')
          .replace(/\s+date:.+/, '');
        const filter = `${getDate(mlsc)}..${getDate(0)}`;
        const url = window.location.href.replace(/\?.+/, '');
        const fullUrl = `${url}?text=${text} date:${filter}&lr=2`;
        window.location.replace(fullUrl);
      };
    }
  
    function GM_addStyle(css) {
      const style =
        document.getElementById('GM_addStyleBy8626') ||
        (function () {
          const style = document.createElement('style');
          style.type = 'text/css';
          style.id = 'GM_addStyleBy8626';
          document.head.appendChild(style);
          return style;
        })();
      const sheet = style.sheet;
      sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
    }
  
    setTimeout(() => {
      const container = document.createElement('div');
  
      const lastDay = createFilterButton('День');
      const lastMonth = createFilterButton('Месяц');
      const lastSixMonth = createFilterButton('Полгода');
      const lastYear = createFilterButton('Год');
      const last10Year = createFilterButton('10 лет');
  
      container.appendChild(lastDay);
      container.appendChild(lastMonth);
      container.appendChild(lastSixMonth);
      container.appendChild(lastYear);
      container.appendChild(last10Year);
  
      addEventChangeParamsUrl(lastDay, 86400000);
      addEventChangeParamsUrl(lastMonth, 2678400000);
      addEventChangeParamsUrl(lastSixMonth, 2678400000 * 6);
      addEventChangeParamsUrl(lastYear, 2678400000 * 12);
      addEventChangeParamsUrl(last10Year, 2678400000 * 12 * 10);
  
      container.style.padding = '5px';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.top = '100px';
      container.style.position = 'absolute';
  
      document.body.appendChild(container);
      container.id = 'script-search-for-date';
  
      GM_addStyle(
        `#script-search-for-date > a {
  width: 80px;
  height: 25px;
  text-decoration: none;
  padding-top: 9px;
  color: #a675b3;
  text-align: center;
  line-height: 20px;
  display: block;
  margin: 10px auto;
  font: normal 17px arial;}`
      );
  
      GM_addStyle(
        `#script-search-for-date > a:not(.active) {
  box-shadow: inset 0 1px 1px rgba(111, 55, 125, 0.8), inset 0 -1px 0px rgba(63, 59, 113, 0.2), 0 9px 16px 0 rgba(0, 0, 0, 0.3), 0 4px 3px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px #150a1e;
  background-image: linear-gradient(#3b2751, #271739);
  text-shadow: 0 0 21px rgba(223, 206, 228, 0.5), 0 -1px 0 #311d47;}`
      );
  
      GM_addStyle(`
  #script-search-for-date > a:not(.active):hover,
  #script-search-for-date > a:not(.active):focus {
  transition: color 200ms linear, text-shadow 500ms linear;
  color: #fff;
  text-shadow: 0 0 21px rgba(223, 206, 228, 0.5), 0 0 10px rgba(223, 206, 228, 0.4), 0 0 2px #2a153c;}`);
  
      GM_addStyle(`
  #script-search-for-date > a:not(:hover) {
  transition: 0.6s;}`);
    }, 2000);
  })();
  